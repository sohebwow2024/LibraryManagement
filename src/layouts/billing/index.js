
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
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Billing() {
	
  const [selected, setSelected] = useState(""); 
  const [bookSelected, setBookSelected] = useState(""); 
  const [categorySelected, setCategorySelected] = useState(""); 
  const [startDate, setStartDate] = useState(new Date());

  return (
	<div className="student-list">
 <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="usernameForm" className="mb-3">
                    <Form.Label>Student Name</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Enter Student Name" required />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="usernameForm">
                    <Form.Label>Roll No.</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Enter Roll No" required />
                    </InputGroup>
                  </Form.Group>
<div className="devision-lable col-md-6">
	<label htmlFor="" className="form-label">Devision</label>
 <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ width: "460px" }}
      >
        {selected}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "460px" }}>
        {["A", "B", "C", "D", "E"].map((item) => (
          <Dropdown.Item key={item} onClick={() => setSelected(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
</div>

<div className="devision-lable col-md-6">
	<label htmlFor="" className="form-label">Book name</label>
 <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ width: "460px" }}
      >
        {bookSelected}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "460px" }}>
        {["Science", "Maths", "Urdu", "English", "History", "Science II" , "Geography"].map((item) => (
          <Dropdown.Item key={item} onClick={() => setBookSelected(item)}> 
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
</div>

<div className="devision-lable col-md-6">
	<label htmlFor="" className="form-label">Book name</label>
 <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ width: "460px" }}
      >
        {bookSelected}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "460px" }}>
        {["Science", "Maths", "Urdu", "English", "History", "Science II" , "Geography"].map((item) => (
          <Dropdown.Item key={item} onClick={() => setBookSelected(item)}> 
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
</div>

<div className="devision-lable col-md-6">
	<label htmlFor="" className="form-label">Category</label>
 <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ width: "460px" }}
      >
        {categorySelected}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: "460px" }}>
        {["Science", "Maths", "Urdu", "English", "History", "Science II" , "Geography"].map((item) => (
          <Dropdown.Item key={item} onClick={() => setCategorySelected(item)} placeholder="Select category"> 
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
</div>

<div className="devision-lable col-md-6 mt-5">
	<div>

	<label htmlFor="" className="form-label mb-0">Issue Date</label>
	</div>
               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

</div>

<div className="devision-lable col-md-6 mt-5">
	<div>

	<label htmlFor="" className="form-label mb-0">Return Date</label>
	</div>
               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

</div>
                 
                </Row>
<div className="submit-button">
<Button type="submit" variant="primary">
                  Submit
                </Button>
</div>
                
              </Form>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
	</div>
   
  );
}

export default Billing;
