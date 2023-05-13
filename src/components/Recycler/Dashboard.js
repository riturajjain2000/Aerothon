import React from "react";
import Search from "./Search";
import Metrics from "./Metrics";
import BuyList from "./BuyList";

function Dashboard() {
  return (
    <div>
      <BuyList/>
      <Search />
      <Metrics />
    </div>
  );
}

export default Dashboard;
