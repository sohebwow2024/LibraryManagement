
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import "./data/EmployeeTable.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../tables/tables.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";


function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [book, setBook] = useState({
    title: "",
    standard: "",
    desc: "",
    price: null,
    cover: "",
  });

  // ------------------------------------------------------------------
  const [tableBooks, setTableBooks] = useState([]);
  // all books from your API and store them in a local state.
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://library-management-s4mr.onrender.com/librarybooks");
        setTableBooks(res.data); // Assuming your API returns an array of books
      } catch (err) {
        console.log("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);
  // ----------------------- your API and store books ---------------------

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(book, "checkingvalue is coming");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8800/books", book)
      await axios.post("https://library-management-s4mr.onrender.com/librarybooks", book);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const [student, setStudent] = useState({
    studentName: "",
    rollNo: "",
    standard: "",
    divi: "",

    // Book slots
    bookName: "",
    quantity: 0,

    bookName2: "",
    quantity2: 0,

    bookName3: "",
    quantity3: 0,

    currentDate: "",
    lastDate: "",
    status: "",
  });

  // ---------------------------- Add Funcation
  const [studentdata, setStudentdata] = useState([]);
  console.log("studentdata", studentdata);


  const [studentPayload, setStudentPayload] = useState();
  const [bookPayload, setBookPayload] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!selectedBook) {
      alert("Please select a book first!");
      return;
    }
    if (takeQuantity > bookCount) {
      alert(`Only ${bookCount} books available!`);
      return;
    }


    const payload = {
      studentName: student.studentName,
      rollNo: student.rollNo,
      divi: student.divi,
      standard: student.standard,

      // 👍 ALL BOOK SLOTS
      bookName: student.bookName,
      quantity: Number(student.quantity),

      bookName2: student.bookName2,
      quantity2: Number(student.quantity2),

      bookName3: student.bookName3,
      quantity3: Number(student.quantity3),

      currentDate: student.currentDate,
      lastDate: student.lastDate,
      status: student.status || "Pending",
    };

    console.log("Sending student POST payload:", payload);

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "https://library-management-s4mr.onrender.com/studentdata",
        payload
      );
      console.log("POST response:", res.data);

      // If server returns the inserted row, append it to UI state
      if (res.data?.inserted) {
        setStudentdata((prev) => [...prev, res.data.inserted]);
      } else {
        // fallback: re-fetch the list
        const all = await axios.get("https://library-management-s4mr.onrender.com/studentdata");
        setStudentdata(all.data);
      }


      // 🟢 BOOK 1
      if (student.bookName && student.quantity > 0) {
        const book1 = tableBooks.find((b) => b.title === student.bookName);
        if (book1) {
          await axios.post(
            `https://library-management-s4mr.onrender.com/librarybooks/${book1.id}/decrement`,
            {
              quantity: Number(student.quantity),
            }
          );
        }
      }

      // 🟢 BOOK 2
      if (student.bookName2 && student.quantity2 > 0) {
        const book2 = tableBooks.find((b) => b.title === student.bookName2);
        if (book2) {
          await axios.post(
            `https://library-management-s4mr.onrender.com/librarybooks/${book2.id}/decrement`,
            {
              quantity: Number(student.quantity2),
            }
          );
        }
      }

      // 🟢 BOOK 3
      if (student.bookName3 && student.quantity3 > 0) {
        const book3 = tableBooks.find((b) => b.title === student.bookName3);
        if (book3) {
          await axios.post(
            `https://library-management-s4mr.onrender.com/librarybooks/${book3.id}/decrement`,
            {
              quantity: Number(student.quantity3),
            }
          );
        }
      }

      alert("✅ Student added successfully!");
      // window.location.reload()
    } catch (err) {
      console.error("Error adding student:", err);
      alert("❌ Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------- Add Funcation
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  const [takeQuantity, setTakeQuantity] = useState(1);

  const handlestudentdata = (e) => {
    const { name, value } = e.target;
    // setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 👇 When standard changes, filter books dynamically
    if (name === "standard") {
      const filtered = tableBooks.filter((book) => book.standard === value);
      setFilteredBooks(filtered);
      setStudent((prev) => ({ ...prev, standard: value, bookName: "" })); // reset bookName
      setSelectedBook(null);
      setBookCount(0);
      setTakeQuantity(1);
    }

    if (name === "bookName") {
      const foundBook = tableBooks.find((book) => book.title === value);
      if (foundBook) {
        setSelectedBook(foundBook);
        setBookCount(foundBook.quantity || 0);
        setTakeQuantity(1); // ✅ reset quantity when selecting new book
      } else {
        setSelectedBook(null);
        setBookCount(0);
        setTakeQuantity(1);
      }
    }
  };

  // ---------------------------- Get Data Funcation
  const location = useLocation();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        // const res = await axios.get("http://localhost:8800/books")
        const res = await axios.get("https://library-management-s4mr.onrender.com/studentdata");
        console.log(res.data, "studentdata in this log");
        setStudentdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, [location.state?.updated]);
  // ---------------------------- Get Data Funcation


  const handleDeletestudent = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This student data will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            "https://library-management-s4mr.onrender.com/studentdata/" + id
          );

          // Remove visually
          setStudentdata((prev) => prev.filter((s) => s.id !== id));

          // Success Alert
          Swal.fire("Deleted!", res.data.message, "success");
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // ---------------------------- Delete Funcation
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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

              <MDBox pt={3} px={2} pb={2}>
                <div className="container-fluid employee-table">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Student Name & Book</th>
                        <th>STD & DIV</th>
                        <th>RollNo</th>
                        <th>STATUS</th>
                        <th>Last Date</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>

                    <tbody>
                      {studentdata.length > 0 ? (
                        [...studentdata]
                          .sort((a, b) => {
                            if (a.status === "Pending" && b.status === "Received") return -1;
                            if (a.status === "Received" && b.status === "Pending") return 1;
                            return 0;
                          })
                          .map((emp) => (
                            <tr key={emp.id}>
                              <td>
                                <div className="d-flex align-items-center prof-img-name">
                                  <div>
                                    <div className="fw-bold">{emp.studentName}</div>

                                    <div className="text-muted small">
                                      {emp.bookName && `${emp.bookName} (Qty: ${emp.quantity})`}
                                      {emp.bookName2 && (
                                        <>
                                          <br />
                                          {`${emp.bookName2} (Qty: ${emp.quantity2})`}
                                        </>
                                      )}
                                      {emp.bookName3 && (
                                        <>
                                          <br />
                                          {`${emp.bookName3} (Qty: ${emp.quantity3})`}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="fw-semibold">{emp.standard}</div>
                                <div className="text-muted small func-small">{emp.divi}</div>
                              </td>

                              {/* Roll No */}
                              <td>{emp.rollNo}</td>

                              {/* Status */}
                              <td>
                                <div
                                  className="badge"
                                  style={{
                                    background:
                                      emp.status === "Pending"
                                        ? "linear-gradient(195deg, #fbc02d, #f9a825)" // yellow/orange
                                        : emp.status === "Received"
                                          ? "linear-gradient(195deg, #66bb6a, #43a047)" // green
                                          : "gray",
                                    color: "#fff",
                                  }}
                                >
                                  {emp.status}
                                </div>
                              </td>

                              {/* Last Date */}
                              <td>{emp.lastDate ? emp.lastDate.split("T")[0] : ""}</td>

                              {/* Actions */}
                              <td>
                                <div className="d-flex">
                                  <button className="btn btn-link text-decoration-none">
                                    <Link to={`/Updatestudent/${emp.id}`}>
                                      <EditIcon />
                                    </Link>
                                  </button>

                                  {emp.status === "Received" ? (
                                    <button
                                      className="btn btn-link text-decoration-none delButton"
                                      onClick={() => handleDeletestudent(emp.id)}
                                      style={{ color: "red" }}
                                    >
                                      <DeleteIcon />
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                {/* </div> */}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td className="text-center text-muted" colSpan="6">
                            No student data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
