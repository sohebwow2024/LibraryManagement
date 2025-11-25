import "./Library.css";
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
import axios from "axios";

function AddStudent() {
  const [selected, setSelected] = useState("");
  const [bookSelected, setBookSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [filteredBooks, setFilteredBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  const [takeQuantity, setTakeQuantity] = useState(1);

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

  return (
    <div className="student-list">
      <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <MDBox mt={8}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="form tables-form">
                  <h3>Add Student</h3>
                  <Form>
                    <Row className="">
                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Student Name"
                          name="studentName"
                          value={student.studentName}
                          onChange={handlestudentdata}
                        />
                      </Form.Group>

                      {/* Roll No */}
                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Roll No</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Roll No"
                          name="rollNo"
                          value={student.rollNo}
                          onChange={handlestudentdata}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Division</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Div (A, B, C...)"
                            name="divi"
                            value={student.divi}
                            onChange={handlestudentdata}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Standard</Form.Label>
                        <InputGroup>
                          <Form.Select
                            name="standard"
                            value={student.standard}
                            onChange={handlestudentdata}
                          >
                            <option value="">Select Standard</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Book Name (1)</Form.Label>
                        <InputGroup>
                          <Form.Select
                            name="bookName"
                            value={student.bookName}
                            onChange={handlestudentdata}
                            disabled={!student.standard}
                          >
                            <option value="">Select Book</option>
                            {filteredBooks.map((b) => (
                              <option key={b.id} value={b.title}>
                                {b.title}
                              </option>
                            ))}
                          </Form.Select>
                        </InputGroup>

                        {student.bookName && (
                          <small className="text-muted">
                            Available:{" "}
                            {tableBooks.find((x) => x.title === student.bookName)?.quantity || 0}
                          </small>
                        )}

                        <Form.Control
                          type="number"
                          className="mt-2"
                          min="0"
                          max={tableBooks.find((x) => x.title === student.bookName)?.quantity || 1}
                          value={student.quantity}
                          onChange={(e) =>
                            setStudent((prev) => ({ ...prev, quantity: Number(e.target.value) }))
                          }
                          placeholder="Qty"
                          disabled={!student.bookName}
                        />
                      </Form.Group>

                      {/* ================ BOOK SLOT 2 ================ */}
                      {student.bookName && (
                        <Form.Group as={Col} md="6" className="mb-3">
                          <Form.Label>Book Name (2)</Form.Label>
                          <Form.Select
                            name="bookName2"
                            value={student.bookName2}
                            onChange={handlestudentdata}
                          >
                            <option value="">Select Book (2)</option>
                            {filteredBooks.map((b) => (
                              <option key={b.id} value={b.title}>
                                {b.title}
                              </option>
                            ))}
                          </Form.Select>

                          {student.bookName2 && (
                            <small className="text-muted">
                              Available:{" "}
                              {tableBooks.find((x) => x.title === student.bookName2)?.quantity || 0}
                            </small>
                          )}

                          <Form.Control
                            type="number"
                            className="mt-2"
                            min="0"
                            max={
                              tableBooks.find((x) => x.title === student.bookName2)?.quantity || 1
                            }
                            value={student.quantity2}
                            onChange={(e) =>
                              setStudent((prev) => ({
                                ...prev,
                                quantity2: Number(e.target.value),
                              }))
                            }
                            placeholder="Qty"
                            disabled={!student.bookName2}
                          />
                        </Form.Group>
                      )}

                      {/* ================ BOOK SLOT 3 ================ */}
                      {student.bookName2 && student.quantity2 > 0 && (
                        <Form.Group as={Col} md="6" className="mb-3">
                          <Form.Label>Book Name (3)</Form.Label>
                          <Form.Select
                            name="bookName3"
                            value={student.bookName3}
                            onChange={handlestudentdata}
                          >
                            <option value="">Select Book (3)</option>
                            {filteredBooks.map((b) => (
                              <option key={b.id} value={b.title}>
                                {b.title}
                              </option>
                            ))}
                          </Form.Select>

                          {student.bookName3 && (
                            <small className="text-muted">
                              Available:{" "}
                              {tableBooks.find((x) => x.title === student.bookName3)?.quantity || 0}
                            </small>
                          )}

                          <Form.Control
                            type="number"
                            className="mt-2"
                            min="0"
                            max={
                              tableBooks.find((x) => x.title === student.bookName3)?.quantity || 1
                            }
                            value={student.quantity3}
                            onChange={(e) =>
                              setStudent((prev) => ({
                                ...prev,
                                quantity3: Number(e.target.value),
                              }))
                            }
                            placeholder="Qty"
                            disabled={!student.bookName3}
                          />
                        </Form.Group>
                      )}

                      {/* Issue Date */}
                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="currentDate"
                          value={student.currentDate}
                          onChange={handlestudentdata}
                        />
                      </Form.Group>

                      {/* Return Date */}
                      <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="lastDate"
                          value={student.lastDate}
                          onChange={handlestudentdata}
                        />
                      </Form.Group>
                    </Row>
                    <div className="submit-button d-flex justify-content-center">
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    </div>
  );
}

export default AddStudent;
