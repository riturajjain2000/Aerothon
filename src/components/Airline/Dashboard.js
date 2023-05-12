import React from "react";
import Search from "./Search";
import Metrics from "./Metrics";
import { Config } from "../../getConfig";


function Dashboard() {
  return (
    <div>
      <Search />
      <Metrics data={Config} />
    </div>
  );
}

export default Dashboard;
