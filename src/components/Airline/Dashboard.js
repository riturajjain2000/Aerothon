import React from "react";
import Search from "./Search";
import Metrics from "./Metrics";
import SellForm from "./SellForm";

function Dashboard(props) {
  return (
    <div>
      <SellForm/>
      <Search props={props} />
      <Metrics />
    </div>
  );
}

export default Dashboard;
