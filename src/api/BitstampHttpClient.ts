import axios from "axios";

export const BitstampHttpClient = {
  fetchOrderBook: () =>
    axios.get("https://www.bitstamp.net/api/v2/order_book/ethusd/?group=0"),
};
