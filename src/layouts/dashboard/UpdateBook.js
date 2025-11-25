import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../layouts/billing/Library.css";
import { Col, Row, Form } from "react-bootstrap";


const BASE_URL = "https://library-management-s4mr.onrender.com";

function Billing() {
  const [bookLibrary, setBookLibrary] = useState({
    title: "",
    standard: "",
    quantity: 0,
    description: "",
    price: "",
    cover: "",
  });

  const [newCoverFile, setNewCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  console.log(location.pathname.split("/")[2], "location logid");

  const handleChange = (e) => {
    setBookLibrary((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("checking Previous value", bookLibrary);

  // ---------------------------------------
  //  Fetch book details when component loads
  // useEffect(() => {
  //   const fetchBook = async () => {
  //     try {
  //       const res = await axios.get(`https://library-management-s4mr.onrender.com/librarybooks`);
  //       // find the specific book by ID
  //       const selectedBook = res.data.find((b) => b.id === parseInt(bookId));
  //       if (selectedBook) {
  //         setBookLibrary({
  //           title: selectedBook.title,
  //           standard: selectedBook.standard,
  //           quantity: selectedBook.quantity,
  //           description: selectedBook.description,
  //           price: selectedBook.price,
  //           cover: selectedBook.cover,
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Error fetching book details:", err);
  //     }
  //   };
  //   fetchBook();
  // }, [bookId]);

  // Fetch book details

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/librarybooks`);
        const selectedBook = res.data.find((b) => b.id === parseInt(bookId));
        if (selectedBook) {
          setBookLibrary({
            title: selectedBook.title,
            standard: selectedBook.standard,
            quantity: selectedBook.quantity,
            description: selectedBook.description,
            price: selectedBook.price,
            cover: selectedBook.cover,
          });
          // setPreviewUrl(`${BASE_URL}${selectedBook.cover}`);
          // setPreviewUrl(`${BASE_URL}${selectedBook.cover.startsWith("/") ? selectedBook.cover : "/" + selectedBook.cover}`);
          setPreviewUrl(selectedBook.cover);
        }
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [bookId]);

  //  Fetch book details when component loads
  // ---------------------------------------

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setNewCoverFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  // ------------Update API Condition
  // const handleClick = async e => {
  //   e.preventDefault()
  //   try {
  //     await axios.put(`https://library-management-s4mr.onrender.com/librarybooks/${bookId}`, bookLibrary)
  //     navigate("/dashboard")
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", bookLibrary.title);
  //   formData.append("standard", bookLibrary.standard);
  //   formData.append("description", bookLibrary.description);
  //   formData.append("price", bookLibrary.price);
  //   formData.append("quantity", bookLibrary.quantity);

  //   if (newCoverFile) {
  //     formData.append("cover", newCoverFile);
  //   } else {
  //     formData.append("cover", bookLibrary.cover); // keep old image
  //   }

  //   try {
  //     await axios.put(`${BASE_URL}/librarybooks/${bookId}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.error("Update error:", err);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookLibrary.title);
    formData.append("standard", bookLibrary.standard);
    formData.append("description", bookLibrary.description);
    formData.append("price", bookLibrary.price);
    formData.append("quantity", bookLibrary.quantity);

    // Only append file if user selected new one
    if (newCoverFile) {
      formData.append("cover", newCoverFile);
    }

    try {
      await axios.put(`${BASE_URL}/librarybooks/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className="form tables-form">
                <h3>Update The Book</h3>

                <form>
                  {/* ---------- Title + Standard ---------- */}
                  <Row>
                    <Form.Group as={Col} md="6" className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Book Title"
                        name="title"
                        value={bookLibrary.title}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" className="mb-3">
                      <Form.Label>Standard</Form.Label>
                      <Form.Select
                        name="standard"
                        value={bookLibrary.standard}
                        onChange={handleChange}
                      >
                        <option value="">Select Standard</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  {/* ---------- Quantity + Price ---------- */}
                  <Row>
                    <Form.Group as={Col} md="6" className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Quantity"
                        name="quantity"
                        min="0"
                        value={bookLibrary.quantity}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Price"
                        name="price"
                        value={bookLibrary.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  {/* ---------- Description ---------- */}
                  <Row>
                    <Form.Group as={Col} md="12" className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter Description"
                        name="description"
                        value={bookLibrary.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  {/* ---------- File Upload + Preview ---------- */}
                  <Row>
                    <Form.Group as={Col} md="12" className="mb-3">
                      <Form.Label>Book Cover Image</Form.Label>
                      <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Group>

                    {previewUrl && (
                      <Form.Group as={Col} md="12" className="mb-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                      </Form.Group>
                    )}
                  </Row>
                </form>

                {/* ---------- Button ---------- */}
                <div className="d-flex justify-content-center pe-3 pb-3">
                  <div className="add-class-submit-button d-flex justify-content-center">
                    <div className="uploadBtn ms-3">
                      <div className="submit-button d-flex justify-content-center">
                        <button type="submit" variant="primary" onClick={handleClick}>
                          Update Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
