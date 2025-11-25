import "../../layouts/billing/Library.css";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
  const [selected, setSelected] = useState("");
  const [bookSelected, setBookSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [books, setBooks] = useState([]);

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

  return (
    <div className="student-list">
      <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <MDBox mt={8}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} className="d-flex justify-content-end">
                {/* <h1>Books page</h1> */}
                {/* <div className="add-book">
                  <Link to="/Addnewbook">+ Add book</Link>
                </div> */}
                <div className="uploadBtn ms-3">
                  <div className="submit-button d-flex justify-content-center">
                    <button type="submit" variant="primary" href="/Addnewbook">
                      Add Books
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <div className="main-dashboard">
                  <div className="dashboard-books">
                    {books.map((book) => (
                      <div className="dashboard-book-child" key={book.id}>
                        {book.cover && (
                          <div className="book-image-cont">
                            <img src={book.cover} alt="" />
                          </div>
                        )}
                        <div className="p-2 book-content">
                          <h2>{book.title}</h2>
                          <h4>Std: {book.standard}</h4>
                          <p>{book.description}</p>
                          <span>{book.price}/-Rs</span>
                          <p style={{ margin: "0 8px" }}> Avaiable: {book.quantity}</p>

                          <div className="dashboard-delup-btn d-flex justify-content-around">
                            <div>
                              <button className="delete" onClick={() => handleDelete(book.id)}>
                                Delete
                              </button>
                            </div>
                            <div>
                              <button className="update">
                                <Link to={`/UpdateBook/${book.id}`}>Update</Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="dashboard-NewBook-button">
                    <button>
                      <Link to="/Addnewbook">Add New Book</Link>
                    </button>
                  </div> */}
                </div>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    </div>
  );
}

export default Books;
