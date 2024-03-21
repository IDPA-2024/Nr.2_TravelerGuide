import Header from "./components/Header";
import Map from "./components/Map";
import OverviewDrawer from "./components/OverviewDrawer";

const page = () => {
  return (
    <div>
      <OverviewDrawer/>
      <Map />
      <Header/>
    </div>
  );
};

export default page;
