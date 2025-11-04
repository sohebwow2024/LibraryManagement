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
import { useEffect } from "react";

function BulkUpload() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  console.log("Unsaved ");
  const UnSavedJob = async () => {
    try {
      await axios
        .get("https://library-management-s4mr.onrender.com/librarybooks")
        .then((resData) => {
          console.log("UnSaved job", resData);
        });
    } catch (e) {
      if (e.response && e.response.status === 404) {
        // toast.error(e.response.data.message);
        console.log("Unsaved ");
      } else {
        // toast.error(e.response.data.message);
      }
    }
  };
  useEffect(() => {
    UnSavedJob();
  }, []);
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
                    <div className="download-label ms-4">
                      <label htmlFor="">You can upload multiple books </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        // onChange={handleFileUpload}
                        style={{
                          marginTop: "15px",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      />
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

                  <div className="khojPrimaryBtn ms-3" style={{ height: "40px", width: "120px" }}>
                    {/* <a href="#/" onClick={uploadFile}
								className={`btn ${!formChangedBulk  ? "disabled" : "enabled"}`}
								style={{ pointerEvents: formChangedBulk ? "auto" : "none", border: "none" }}
							>
								<span>{isDownloading ? "Uploading" : "Upload"}</span>
								{isDownloading && <span className="loader"></span>}
							</a> */}
                  </div>
                </div>
              </div>
              <hr />

              <div className="d-flex justify-content-center align-items-baseline">
                <p className="text-center mb-2">Download reference file</p>
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
