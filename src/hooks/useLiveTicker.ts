import { useMemo, useState, useEffect } from "react";
import { BitstampHttpClient } from "../api/BitstampHttpClient";
import { BitstampSocketClient } from "../api/BitstampSocketClient";

export function useLiveTicker() {
  const [initialPrice, setInitialPrice] = useState(0);
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);

  useEffect(() => {
    BitstampHttpClient.fetchTicker().then((d) => {
      setInitialPrice(d.data.last);
      setHighPrice(d.data.high);
      setLowPrice(d.data.low);
    });
  }, []);

  useMemo(() => {
    const socketClientCleanup = BitstampSocketClient({
      onMessage: (e) => {
        const messageData = JSON.parse(e.data);

        if (
          messageData.channel === "live_trades_ethusd" &&
          messageData.event === "trade"
        ) {
          setLastPrice(messageData.data.price);
        }
      },
    });

    return socketClientCleanup;
  }, []);

  return [lastPrice || initialPrice, highPrice, lowPrice];
}
