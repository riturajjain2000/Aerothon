import Search from "./Search";
import Metrics from "./Metrics";
import SellForm from "./SellForm";

function Dashboard(props) {
  return (
    <div>
      <SellForm/>
      <Search userData={props.userData} />
      <Metrics />
    </div>
  );
}

export default Dashboard;