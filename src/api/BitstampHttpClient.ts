import axios from "axios";

export const BitstampHttpClient = {
  fetchOrderBook: () =>
    axios.get(
      "https://h0hoyraq17.execute-api.us-east-1.amazonaws.com/default/BitStampOrderBook"
    ),
  fetchTicker: () =>
    axios.get(
      "https://h0hoyraq17.execute-api.us-east-1.amazonaws.com/default/BitStampTicker"
    ),
};
