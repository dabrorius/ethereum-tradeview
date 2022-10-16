import axios from "axios";

const rootUrl =
  "https://h0hoyraq17.execute-api.us-east-1.amazonaws.com/default";

export const BitstampHttpClient = {
  fetchOrderBook: () => axios.get(`${rootUrl}/BitStampOrderBook`),
  fetchTicker: () => axios.get(`${rootUrl}/BitStampTicker`),
  fetchTrades: () => axios.get(`${rootUrl}/BitStampTransactions`),
};
