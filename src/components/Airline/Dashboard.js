import React from "react";
import Search from "./Search";
import Metrics from "./Metrics";

function Dashboard(props) {
  return (
    <div>
      <Search props={props} />
      <Metrics />
    </div>
  );
}

export default Dashboard;
