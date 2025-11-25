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
import ReactSelect from "react-select";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import Swal from "sweetalert2";
import ExcelFile from "../../layouts/Librarybooks.xlsx";

function BulkUpload() {
 
	const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [isDownloading, setisDownloading] = useState(false);
  const [message, setMessage] = useState("");
  console.log("Unsaved ");

  const handleFile = (e) => {
   
    setFile(e.target.files[0]);
    if (file) {
			setFileName(file.name);
		}
  };

  const uploadExcel = async () => {
    setisDownloading(true);
    // if (!file) {
    //   alert("Please upload an Excel file");
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://library-management-s4mr.onrender.com/bulkupload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Swal.fire(res.data.message, "", "success");
      setisDownloading(false);
      console.log("message", res.data.message);

      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Bulk upload failed");
    }
  };

 

  const downloadDummyExcel = () => {
		const link = document.createElement("a");
		link.href = ExcelFile;
		link.download = fileName;
		link.click();
	};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div className=" col-md-12 post-job-details-form p-0 pt-3 PostCard"></div>
              <div className="row">
                <div className="col-md-6">
                  <div className="pt-3 ">
                    <div className="download-label ms-4 mb-3">
                      <label htmlFor="">You can upload multiple books </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <input type="file" accept=".xlsx,.xls" onChange={handleFile} />
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 duplicate-skip-cont d-flex align-items-end">
							<h6 className="f-700 me-2">Duplicate skip</h6>
							<span>
								<label class="switch mt-1">
									<input
										type="checkbox"
										// checked={duplicateSkip}
										// onChange={handleToggle}
									/>
									<span class="slider round"></span>
								</label>
							</span>

						</div> */}
              </div>

              <div className="d-flex justify-content-center pe-3 pb-3">
                <div className="add-class-submit-button d-flex justify-content-center">
                  {/* <Button variant="secondary"
            //  onClick={handleCloseBulkModal}
             >
							Close
							
						</Button> */}

                  <div className="uploadBtn ms-3">
                    <button href="#/" onClick={uploadExcel}>
                      <span>{isDownloading ? "Uploading" : "Upload"}</span>
                      {isDownloading && <span className="loader"></span>}
                    </button>

                    {/* <div className="uploadBtn mt-3 text-center">
                      <button onClick={uploadExcel}>Upload</button>
                    </div> */}
                  </div>
                </div>
              </div>
              <hr />

              <div className="d-flex justify-content-center align-items-baseline">
                <p className="downloadText text-center mb-2" onClick={downloadDummyExcel}>
                  Download reference file <DownloadIcon />
                </p>
                {/* <div className="col-md-3">
						<div className="khoDwnlodBtn ms-3">
							<p
               onClick={downloadExcel}
               >
								Download
							</p>
							</Tooltip>
						</div>
					</div> */}
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default BulkUpload;
