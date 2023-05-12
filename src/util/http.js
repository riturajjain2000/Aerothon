import axios from "axios";

const BACKEND_URL = "https://aerothon-f944e-default-rtdb.firebaseio.com";

export async function storeData(type, userId) {
  const response = await axios.post(BACKEND_URL + `/auth/${userId}.json`, type);

  return response;
  //   const id = response.data.name;
  //   return id;
}

export async function fetchData(userId) {
  const response = await axios.get(BACKEND_URL + `/auth/${userId}.json`);

  //   console.log(response.data);
  const keys = [];
  for (const key in response.data) {
    keys.push(key);
  }
  const expenseObj = {
    type: response.data[keys[0]].type,
  };

  console.log(expenseObj.type);
  return expenseObj.type;
}
