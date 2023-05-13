import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
import styles from "./SellForm.module.css";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import {
  storeData,
  fetchData,
  fetchAllUsers,
  createSellOrder,
  fetchOrderData,
} from "../../util/http";

function SellForm(props) {
  const [orderData, setOrderData] = useState({
    manufacturer: "",
    recycler: "",
    part: "",
    price: "",
    status: "INCOMPLETE",
  });
  const columns = ["Manufacturer", "Recycler", "Part", "Price", "Status"];

  const [sellList, setSellList] = useState();
  const [buyList, setBuyList] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const data = await fetchOrderData(auth.currentUser.uid);
      console.log(data.sellList);
      console.log(data.buyList);
      setSellList(data.sellList);
      setBuyList(data.buyList);
    }
    fetchOrders();
  }, []);

  async function handleSubmission() {
    if (
      !orderData.recycler ||
      !orderData.part ||
      !orderData.price ||
      !orderData.status
    ) {
      setErrorMsg("All fields are required*");
      return;
    }

    setErrorMsg("");

    const userId = auth.currentUser.uid;
    console.log(userId);
    console.log(orderData);
    const data = await fetchAllUsers();
    var targetId = "";
    for (const key in data) {
      // console.log(data[key].key);
      // console.log(data[key].name);
      if (data[key].name == orderData.recycler) {
        targetId = data[key].key;
      }
    }
    console.log(targetId);

    const data2 = await createSellOrder(orderData, userId, targetId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sell A Part</h1>
        <InputControl
          label="Manufacturer Name"
          onChange={(event) =>
            setOrderData((prev) => ({
              ...prev,
              manufacturer: event.target.value,
            }))
          }
        />
        <InputControl
          label="Recycler Name"
          onChange={(event) =>
            setOrderData((prev) => ({ ...prev, recycler: event.target.value }))
          }
        />
        <InputControl
          label="Part Name"
          onChange={(event) =>
            setOrderData((prev) => ({ ...prev, part: event.target.value }))
          }
        />
        <InputControl
          label="Your Bid Price"
          type="number"
          onChange={(event) =>
            setOrderData((prev) => ({ ...prev, price: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Create Sell Request
          </button>
        </div>
      </div>
      <div className={styles.listBox}>
        <h4 className={styles.listHead}>Selling Order You Made</h4>
        <table className={styles.listContainer}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sellList &&
              sellList.map((item, index) => (
                <tr key={index}>
                  {
                    <>
                      <td key={1}>{item.manufacturer}</td>
                      <td key={2}>{item.Recycler}</td>
                      <td key={3}>{item.part}</td>
                      <td key={4}>{item.price}</td>
                      <td key={5}>{item.status}</td>
                    </>
                  }
                </tr>
              ))}
          </tbody>
        </table>

        <h4 className={styles.listHead}>Buying Requests that you have </h4>
        <table className={styles.listContainer}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buyList &&
              buyList.map((item, index) => (
                <tr key={index}>
                  {
                    <>
                      <td key={1}>{item.manufacturer}</td>
                      <td key={2}>{item.Recycler}</td>
                      <td key={3}>{item.part}</td>
                      <td key={4}>{item.price}</td>
                      <td key={5}>{item.status}</td>
                    </>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellForm;
