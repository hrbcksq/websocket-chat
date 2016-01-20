using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using ChatApplication.Middleware;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace ChatApplication.Hub
{
    // You may need to install the Microsoft.AspNet.Http.Abstractions package into your project
    public class ChatHub
    {
        private readonly RequestDelegate _next;

        public ChatHub(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext.WebSockets.IsWebSocketRequest)
            {
                var websocket = await httpContext.WebSockets.AcceptWebSocketAsync();
                if (websocket != null && websocket.State == WebSocketState.Open)
                {
                    if (SocketsSingleton.Instance.SocketsBag.TryAdd(websocket))
                    {
                        await HandleSocket(websocket);
                    }
                }
            }
            else
            {
                await _next(httpContext);
            }
        }

        private async Task HandleSocket(WebSocket socket)
        {
            var receiveBuffer = new byte[1024 * 4];
            try
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(receiveBuffer), CancellationToken.None);
                while (!socket.CloseStatus.HasValue)
                {
                    await Task.WhenAll(tasks: SocketsSingleton.Instance.SocketsBag.Where(x => x.State == WebSocketState.Open)
                        .Select(async x =>
                        {
                            await x.SendAsync(new ArraySegment<byte>(receiveBuffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
                        }));

                    SocketsSingleton.Instance.SocketsBag = new ConcurrentBag<WebSocket>(SocketsSingleton.Instance.SocketsBag.Where(x => x.State == WebSocketState.Open));
                    result = await socket.ReceiveAsync(new ArraySegment<byte>(receiveBuffer), CancellationToken.None);
                }
                await socket.CloseAsync(result.CloseStatus ?? WebSocketCloseStatus.EndpointUnavailable, result.CloseStatusDescription, CancellationToken.None);
            }
            catch (Exception exception)
            {
                Console.Write(exception);
            }
            finally
            {
                socket?.Dispose();
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ChatHubExtensions
    {
        public static IApplicationBuilder UseChatHub(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ChatHub>();
        }
    }
}
