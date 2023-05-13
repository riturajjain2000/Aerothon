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
    setOrderData((prev) => ({
      ...prev,
      manufacturer: auth.currentUser.displayName,
    }));
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
      {/* <div>
        <ul>
          {sellList &&
            sellList.map((myList) => {
              return <li>{myList}</li>;
            })}
        </ul>
      </div> */}
    </div>
  );
}

export default SellForm;
