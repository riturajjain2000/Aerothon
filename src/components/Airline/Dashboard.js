import React from "react";
import Search from "./Search";
import Metrics from "./Metrics";

function Dashboard(props) {
  return (
    <div>
      <Search userData={props.userData} />
      <Metrics />
    </div>
  );
}

export default Dashboard;
