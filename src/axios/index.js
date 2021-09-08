import axios from "axios";

const instance = axios.create({
  baseURL: "https://keep-clone-ba4d6-default-rtdb.firebaseio.com",
});

export default instance;
