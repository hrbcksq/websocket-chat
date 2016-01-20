using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace ChatApplication.Middleware
{
    public sealed class SocketsSingleton
    {
        private static SocketsSingleton _instance;
        private static readonly object syncRoot = new object();

        public static SocketsSingleton Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (syncRoot)
                    {
                        if (_instance == null)
                            _instance = new SocketsSingleton();
                    }
                }
                return _instance;
            }
        }

        public IProducerConsumerCollection<WebSocket> SocketsBag = new ConcurrentBag<WebSocket>();
        private SocketsSingleton() {}
    }
}
