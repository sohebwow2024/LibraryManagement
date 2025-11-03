import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";

// @mui icons
import Icon from "@mui/material/Icon";
import BulkUpload from "layouts/BulkUpload";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    // key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Student List",
    // key: "Student List",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Add Student",
    // key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "BULK Upload",
    // key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/bulkUpload",
    component: <BulkUpload />,
  },
  // {
  //   type: "collapse",
  //   name: "BULK Upload",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
];

export default routes;
