import axios from "axios";

const BACKEND_URL = "https://aerothon-f944e-default-rtdb.firebaseio.com";

export async function storeData(type, userId) {
  const response = await axios.post(BACKEND_URL + `/auth/${userId}.json`, type);

  return response;
}

export async function fetchData(userId) {
  const response = await axios.get(BACKEND_URL + `/auth/${userId}.json`);
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

export async function fetchAllUsers() {
  const response = await axios.get(BACKEND_URL + `/auth.json`);
  const keys = [];
  for (const key in response.data) {
    for (const k in response.data[key]) {
      // console.log(response.data[key][k].name);
      const udata = {
        key: key,
        name: response.data[key][k].name,
      };
      keys.push(udata);
    }
  }

  // console.log(keys);
  return keys;
}

export async function createSellOrder(orderData, userId, targetId) {
  const response = await axios.post(
    BACKEND_URL + `/auth/${userId}/sell.json`,
    orderData
  );
  const response2 = await axios.post(
    BACKEND_URL + `/auth/${targetId}/buy.json`,
    orderData
  );

  return response;
}

export async function fetchOrderData(userId) {
  const sellResponse = await axios.get(
    BACKEND_URL + `/auth/${userId}/sell.json`
  );
  const buyResponse = await axios.get(BACKEND_URL + `/auth/${userId}/buy.json`);

  const sellList = [];
  const buyList = [];

  for (const key in sellResponse.data) {
    const sellObj = {
      id: key,
      manufacturer: sellResponse.data[key].manufacturer,
      recycler: sellResponse.data[key].recycler,
      part: sellResponse.data[key].part,
      price: sellResponse.data[key].price,
      status: sellResponse.data[key].status,
    };
    sellList.push(sellObj);
  }

  for (const key in buyResponse.data) {
    const buyObj = {
      id: key,
      manufacturer: buyResponse.data[key].manufacturer,
      recycler: buyResponse.data[key].recycler,
      part: buyResponse.data[key].part,
      price: buyResponse.data[key].price,
      status: buyResponse.data[key].status,
    };
    buyList.push(buyObj);
  }

  return { sellList, buyList };
}
