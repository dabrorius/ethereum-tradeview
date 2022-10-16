import { useEffect, useMemo, useState } from "react";
import { BitstampHttpClient } from "../api/BitstampHttpClient";
import { BitstampSocketClient } from "../api/BitstampSocketClient";

export type TradeEntry = {
  amount: number;
  date: Date;
  price: number;
  tid: string;
  type: string;
};

export function useLiveTrades() {
  const [trades, setTrades] = useState<TradeEntry[]>([]);

  useEffect(() => {
    BitstampHttpClient.fetchTrades().then((response) => {
      const coercedData = response.data.map((d: any) => ({
        amount: parseFloat(d.amount),
        date: new Date(parseFloat(d.date) * 1000),
        price: parseFloat(d.price),
        tid: d.tid,
        type: d.type,
      }));
      setTrades(coercedData);
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
          const { amount, price, timestamp, type, id } = messageData.data;

          setTrades((oldTradesList) => [
            {
              amount,
              date: new Date(timestamp * 1000),
              price,
              tid: id,
              type: type.toString(),
            },
            ...oldTradesList,
          ]);
        }
      },
    });

    return socketClientCleanup;
  }, []);

  return trades;
}
