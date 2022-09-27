const socketServer = "wss://ws.bitstamp.net";

type SocketApiParams = {
  onMessage: (e: MessageEvent<any>) => void;
};

export type OrderBookEntry = [string, string];

export function BitstampSocketClient(params: SocketApiParams) {
  const { onMessage } = params;

  const socket = new WebSocket(socketServer);
  socket.addEventListener("open", () => {
    socket.send(`{
        "event": "bts:subscribe",
        "data": {
            "channel": "order_book_ethusd"
        }
    }`);
  });

  socket.addEventListener("message", onMessage);

  return () => {
    socket.send(`{
      "event": "bts:unsubscribe",
      "data": {
          "channel": "order_book_ethusd"
      }
  }`);
  };
}
