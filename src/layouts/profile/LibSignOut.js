// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import MDBox from "components/MDBox";
// import Footer from "examples/Footer";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// function LogoutButton() {
//   useEffect(() => {
//     const handleLogout = async () => {
//       try {
//         // Backend logout API
//         const response = await axios.post(
//           "https://library-management-s4mr.onrender.com/signoutlibrary"
//         );

//         // Clear local data or tokens
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         // if (response.data.success) {
//         //   alert("👋 Logged out successfully!");
//         // } else {
//         //   alert("⚠️ Logout failed on server, but local session cleared!");
//         // }

//         // Redirect to sign-in page
//         window.location.href = "/SignIn";
//       } catch (error) {
//         console.error("Logout Error:", error);
//         alert("⚠️ Something went wrong during logout!");
//         window.location.href = "/SignIn";
//       }
//     };

//     handleLogout();
//   }, []);

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // Call backend API
//       const response = await axios.post(
//         "https://library-management-s4mr.onrender.com/signoutlibrary"
//       );

//       if (response.data.success) {
//         alert("👋 Logged out successfully!");
//         // Redirect to login page
//         navigate("/SignIn");
//       } else {
//         alert("⚠️ Logout failed!");
//       }
//     } catch (error) {
//       console.error("Logout Error:", error);
//       alert("⚠️ Something went wrong during logout!");
//     }
//   };

//   return (
//     <></>
//     // <DashboardLayout>
//     //   <MDBox pt={6} pb={3}>
//     //     <Grid container spacing={6}>
//     //       <Grid className="login-Section" item xs={12}>
//     //         <div className="login-container">
//     //           <h2>Library Log-Out</h2>
//     //           <button
//     //             onClick={handleLogout}
//     //             style={{
//     //               backgroundColor: "#d9534f",
//     //               color: "#fff",
//     //               border: "none",
//     //               padding: "10px 20px",
//     //               borderRadius: "6px",
//     //               cursor: "pointer",
//     //             }}
//     //           >
//     //             Logout
//     //           </button>
//     //           <div className="links">
//     //             <a href="/LibChangePassword">Forgot Password?</a>
//     //           </div>
//     //         </div>
//     //       </Grid>
//     //     </Grid>
//     //   </MDBox>
//     // </DashboardLayout>
//   );
// }

// export default LogoutButton;



import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const LibSignOut =()=> {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await axios.post(
          "https://library-management-s4mr.onrender.com/signoutlibrary"
        );

        // Clear session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (response.data.success) {
          navigate("/SignIn");
        } else {
        //   alert("⚠️ Logout failed on server, but local session cleared!");
        }

        
      } catch (error) {
        console.error("Logout Error:", error);
        alert("⚠️ Something went wrong during logout!");
        navigate("/SignIn");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div className="login-container">
              <h2>Logging out...</h2>
            </div>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default LibSignOut;
