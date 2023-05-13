import React, { useState } from "react";
import Search from "./Search";
import Metrics from "./Metrics";
import BuyList from "./BuyList";

import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
function Dashboard(props) {
  const [value, setValue] = useState(1);

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab label="Search Table" />
          <Tab label="Metrics" />

          <Tab label="Buy/Sell zone" />
        </Tabs>
        {value == 0 && <Search userData={props.userData} />}
        {value == 1 && <Metrics />}
        {/* {value == 2 && <BuyList />} */}
      </Paper>
    </div>
  );
}

export default Dashboard;
