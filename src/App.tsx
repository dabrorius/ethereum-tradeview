import { useEffect } from "react";
import "./styles.css";

export default function App() {
  useEffect(() => {
    const socket = new WebSocket("wss://ws.bitstamp.net");
    socket.addEventListener("open", (event) => {
      socket.send(`{
        "event": "bts:subscribe",
        "data": {
            "channel": "order_book_ethusd"
        }
    }`);
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
