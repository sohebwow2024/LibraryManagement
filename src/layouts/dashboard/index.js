/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../dashboard/dashboard.css";
import { Card } from "react-bootstrap";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [books, setBooks] = useState([]);
  const { columns, rows } = authorsTableData();
  const location = useLocation();
  const [studentdata, setStudentdata] = useState([]);
  console.log("studentdata", studentdata);

  const [pendingCount, setPendingCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);

  console.log(
    "studentdata",
    studentdata.map((val) => {
      console.log("==========>", val.status);
    })
  );

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        // const res = await axios.get("http://localhost:8800/books")
        const res = await axios.get("https://library-management-s4mr.onrender.com/librarybooks");
        console.log(res.data, "librarybooks");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  // ---------------------------- Delete Funcation
  const handleDelete = async (id) => {
    console.log("deleteid", id);

    try {
      // await axios.delete("http://localhost:8800/books/" + id)
      await axios.delete("https://library-management-s4mr.onrender.com/librarybooks/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err, "delete error");
    }
  };
  // ---------------------------- Delete Funcation

  //   useEffect(() => {
  //     const fetchAllBooks = async () => {
  //       try {
  //         // const res = await axios.get("http://localhost:8800/books")
  //         const res = await axios.get("https://library-management-s4mr.onrender.com/studentdata");
  //         console.log(res.data, "studentdata in this log");
  //         setStudentdata(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     fetchAllBooks();
  //   }, [location.state?.updated]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://library-management-s4mr.onrender.com/studentdata");

        setStudentdata(res.data);

        // Count Pending
        const pending = res.data.filter((s) => s.status === "Pending").length;
        // Count Received
        const received = res.data.filter((s) => s.status === "Received").length;

        setPendingCount(pending);
        setReceivedCount(received);

        console.log("Pending:", pending);
        console.log("Received:", received);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, [location.state?.updated]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="Books"
                title="Books"
                count={books.length}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Received"
                count={receivedCount}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Pending"
                count={pendingCount}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>

        <div className="mt-4">
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Students List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </div>

        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <div className="main-dashboard">
                <div className="dashboard-books" >
                  {books.map((book) => (
                    <div className="dashboard-book-child" key={book.id}>
                      {book.cover && <img src={book.cover} alt='' />}
                      <h2>Book Name: {book.title}</h2>
                      <h4>Std: {book.standard}</h4>
                      <p>{book.description}</p>
                      <span>💸: {book.price}/-Rs</span>
                      <p style={{margin: "0 8px"}}> In library Avaiable: {book.quantity}</p>

                      <div className="dashboard-delup-btn">
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link to={`/billing/${book.id}`}>Update</Link></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dashboard-NewBook-button">
                  <button>
                    <Link to="/Addnewbook">Add New Book</Link>
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </MDBox> */}

        {/* Project Details Part */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
