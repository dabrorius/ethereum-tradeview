import { useEffect, useState } from "react";
import { BitstampHttpClient } from "../api/BitstampHttpClient";

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

  return trades;
}
