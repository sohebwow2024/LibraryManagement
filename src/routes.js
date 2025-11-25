import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import AddStudent from "layouts/billing";
import RTL from "layouts/rtl";

// @mui icons
import Icon from "@mui/material/Icon";
import BulkUpload from "layouts/BulkUpload";
import Books from "components/CustomeComponents/Books";
import SignIn from "components/CustomeComponents/SignIn";
import LibSignOut from "../src/layouts/profile/LibSignOut";
import Addnewbook from "components/CustomeComponents/AddBooks";
import UpdateStudent from "layouts/UpdateStudent";
import UpdateBook from "../src/layouts/dashboard/UpdateBook";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Log In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/SignIn",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Log Out",
  //   key: "sign-out",
  //   icon: <Icon fontSize="small">logout</Icon>,
  //   route: "/SignOut",
  //   component: <LibSignOut />,
  // },
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
    route: "/StudentList",
    component: <Tables />,
  },
  {
    route: "/Updatestudent/:id",
    component: <UpdateStudent />,
  },
  {
    route: "/UpdateBook/:id",
    component: <UpdateBook />,
  },
  {
    type: "collapse",
    name: "Add Student",
    // key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/AddStudent",
    component: <AddStudent />,
  },
  {
    type: "collapse",
    name: "Books",
    // key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/books",
    component: <Books />,
  },
  {
    type: "collapse",
    name: "Add Book",
    key: "Add New-Book",
    icon: <Icon fontSize="small">Add</Icon>,
    route: "/Addnewbook",
    component: <Addnewbook />,
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
