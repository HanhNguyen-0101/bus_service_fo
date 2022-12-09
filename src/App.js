import { Switch } from "react-router-dom";
import Loading from "./components/global/Loading/Loading";
import DrawerHOC from "./HOC/DrawerHOC";
import BusCompanyManagementPage from "./pages/admin/BusCompanyManagementPage";
import GlobalManagementPage from "./pages/admin/GlobalManagementPage";
import SeatManagementPage from "./pages/admin/SeatManagementPage";
import StationManagementPage from "./pages/admin/StationManagementPage";
import TicketManagementPage from "./pages/admin/TicketManagementPage";
import TripManagementPage from "./pages/admin/TripManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import VehicleManagementPage from "./pages/admin/VehicleManagementPage";
import ArticlePage from "./pages/client/ArticlePage";
import CheckoutPage from "./pages/client/CheckoutPage";
import CompanyPage from "./pages/client/CompanyPage";
import Homepage from "./pages/client/Homepage";
import ProfilePage from "./pages/client/ProfilePage";
import SearchPage from "./pages/client/SearchPage";
import LoginPage from "./pages/global/LoginPage";
import NotFoundPage from "./pages/global/NotFoundPage";
import RegisterPage from "./pages/global/RegisterPage";
import AdminTemplate from "./templates/admin/AdminTemplate";
import DashboardTemplate from "./templates/client/DashboardTemplate";
import NoneHeaderTemplate from "./templates/global/NoneHeaderTemplate";
import UserTemplate from "./templates/global/UserTemplate";

function App() {
  return (
    <>
      <Loading />
      <DrawerHOC />
      <Switch>
        <DashboardTemplate exact path="/home" Component={Homepage} />

        <DashboardTemplate exact path="/your-trip" Component={SearchPage} />
        <DashboardTemplate exact path="/your-trip/:content" Component={SearchPage} />
        <NoneHeaderTemplate exact path="/checkout" Component={CheckoutPage} />
        <DashboardTemplate exact path="/profile" Component={ProfilePage} />

        <DashboardTemplate exact path="/company" Component={CompanyPage} />
        <DashboardTemplate exact path="/company/:companyId/:companyTitle" Component={CompanyPage} />
        <DashboardTemplate exact path="/blog" Component={ArticlePage} />
        <DashboardTemplate exact path="/blog/:articleId/:articleTitle" Component={ArticlePage} />

        <UserTemplate exact path="/login" Component={LoginPage} />
        <UserTemplate exact path="/register" Component={RegisterPage} />

        <AdminTemplate exact path="/admin" Component={GlobalManagementPage} />
        <AdminTemplate
          exact
          path="/admin/users"
          Component={UserManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/station"
          Component={StationManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/trips"
          Component={TripManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/companies"
          Component={BusCompanyManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/vehicles"
          Component={VehicleManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/seats"
          Component={SeatManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/tickets"
          Component={TicketManagementPage}
        />
        <AdminTemplate
          exact
          path="/admin/global"
          Component={GlobalManagementPage}
        />

        <DashboardTemplate exact path="/" Component={Homepage} />
        <DashboardTemplate path="*" Component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
