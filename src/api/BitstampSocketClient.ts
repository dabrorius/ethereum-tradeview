const socketServer = "wss://ws.bitstamp.net";

type SocketApiParams = {
  onMessage: (e: MessageEvent<any>) => void;
};

export type OrderBookEntry = [string, string, string];

const channels = ["order_book_ethusd", "live_trades_ethusd"];

export function BitstampSocketClient(params: SocketApiParams) {
  const { onMessage } = params;

  const socket = new WebSocket(socketServer);
  socket.addEventListener("open", () => {
    channels.forEach((channel) => {
      socket.send(`{
        "event": "bts:subscribe",
        "data": {
            "channel": "${channel}"
        }
      }`);
    });
  });

  socket.addEventListener("message", onMessage);

  return () => {
    channels.forEach((channel) => {
      socket.send(`{
        "event": "bts:unsubscribe",
        "data": {
            "channel": "${channel}"
        }
      }`);
    });
  };
}
