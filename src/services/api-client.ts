import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "d741d65de7ce41afaedea083e6676d03",
  },
});
