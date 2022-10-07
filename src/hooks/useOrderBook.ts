import { useMemo, useState } from "react";
import {
  BitstampSocketClient,
  OrderBookEntry,
} from "../api/BitstampSocketClient";

export function useOrderBook() {
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);

  useMemo(() => {
    const socketClientCleanup = BitstampSocketClient({
      onMessage: (e) => {
        const messageData = JSON.parse(e.data);
        if (
          messageData.channel === "detail_order_book_ethusd" &&
          messageData.event === "data"
        ) {
          setBids(messageData.data.bids);
          setAsks(messageData.data.asks);
        }
      },
    });

    return socketClientCleanup;
  }, []);

  return [bids, asks];
}
