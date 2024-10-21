import useAuthGuard from "../../custom-hooks/useauthguard/useAuthGuard.jsx";
import MainContent
  from "../../components/general-components/maincontent/MainContent.jsx";
import OrdersOverview
  from "../../components/staff-dashboard-components/orders-overview/OrdersOverview.jsx";

function StaffDashboard() {

  useAuthGuard("/staff-dashboard", "ROLE_STAFF");

  return (
    <>
      <MainContent>
        <OrdersOverview/>
      </MainContent>
      {/*  the whole data arrat wil be reloaded with new data every 10 or 20 seconds*/}
      {/*  map over order card component*/}
      {/* Top part of card component - will include state: locationtype, locationNumber, time, timespenc(based on interval) , status  */}
      {/*  line menu item component*/}
      {/* ammount component*/}
      {/*text-item*/}
      {/*in initial state one button is showing based on the status "in queue*/}
      {/* button component  */}
      {/* button component  */}
    </>
  )
}

export default StaffDashboard;