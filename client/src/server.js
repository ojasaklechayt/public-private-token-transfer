import axios from "axios";

const server = axios.create({
  baseURL: "https://private-public-transfer-amount.onrender.com",
});

export default server;
