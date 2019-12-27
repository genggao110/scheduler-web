import { get } from "@/request/http.js";

const utils = {
  async isValidName(name, callback) {
    let response = await get("/user/validate", {
      name: name
    });
    console.log(response);
    if (response) {
      return callback(new Error("Username " + value + " is not available"));
    } else {
      return callback();
    }
  }
};

export default utils;
