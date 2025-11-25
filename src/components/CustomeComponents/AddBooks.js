import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// import { Form } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

function Addnewbook() {
  const [book, setBook] = useState({
    title: "",
    standard: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [coverFile, setCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDownloading, setisDownloading] = useState(false);

  // ---------------------- HANDLE CHANGE --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // convert numeric field
    if (name === "price" || name === "quantity") {
      setBook((prev) => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setCoverFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ---------------------- SUBMIT --------------------------
  const handleClick = async (e) => {
    e.preventDefault();
    setisDownloading(true);
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("standard", book.standard);
    formData.append("description", book.description);
    formData.append("price", book.price);
    formData.append("quantity", book.quantity);

    if (coverFile) formData.append("cover", coverFile);

    try {
      const res = await axios.post(
        "https://library-management-s4mr.onrender.com/librarybooks",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setisDownloading(false);
      alert("Book Added Successfully");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add book");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className="form tables-form">
              <h3>Add New Book</h3>

              {/* ------------------ TITLE ------------------ */}
              {/* <Form>
                <Row className="">
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Book Title"
                      name="title"
                      value={book.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
              </Form> */}

              {/* ------------------ OTHER INPUTS ------------------ */}
              <form>
                <Row className="">
                  {/* Title */}
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Book Title"
                      name="title"
                      value={book.title}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Standard */}
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Standard</Form.Label>
                    <Form.Select name="standard" value={book.standard} onChange={handleChange}>
                      <option value="">Select Standard</option>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="VI">VI</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row>
                  {/* Quantity */}
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Quantity"
                      name="quantity"
                      value={book.quantity}
                      min="0"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Price */}
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      name="price"
                      value={book.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md="12" className="mb-3">
                    <Form.Label className="dec-text">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Book Description"
                      name="description"
                      value={book.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  {/* Cover Image */}
                  <Form.Group as={Col} md="12" className="mb-3">
                    <Form.Label className="dec-text">Book Cover Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setCoverFile(file);
                        if (file) setPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                  </Form.Group>

                  {/* Preview */}
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

                {/* Submit Button */}
              </form>

              {/* <div className="tables-form-btn">
                <button className="formbutton" onClick={handleClick}>
                  Add Book
                </button>
              </div> */}

              <div className="d-flex justify-content-center pe-3 pb-3">
                <div className="add-class-submit-button d-flex justify-content-center">
                  {/* <Button variant="secondary"
            //  onClick={handleCloseBulkModal}
             >
							Close
							
						</Button> */}

                  <div className="uploadBtn ms-3">
                    <div className="submit-button d-flex justify-content-center">
                      <button type="submit" variant="primary" onClick={handleClick}>
                        {isDownloading ? "Adding Books" : " Add Book"}
                        {isDownloading && <span className="loader"></span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Addnewbook;
