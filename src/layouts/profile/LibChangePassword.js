import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import "../profile/LibChangePassword.css"; 

function LibChangePassword() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://library-management-s4mr.onrender.com/changepasswordlibrary",
        {
          username,
          oldPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        alert("✅ Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Password Change Error:", error);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid className="change-password-section" item xs={12}>
            <div className="change-password-container">
              <h2>Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit">Change Password</button>
              </form>
            </div>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default LibChangePassword;
