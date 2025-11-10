// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";
// import Forgotpassword from "./Forgotpassword";
// import Studentdash from "./Studentdash";
// import Studentloan from "./Studentloan";
// import Tracking from "./Tracking";
// import Admin from "./Admin";
// import Approval from "./Approval";
// import Equipmentreq from "./Equipmentreq";
// import Manageequipments from "./Manageequipments";
// import Manageusers from "./Manageusers";
// import RequestFrom from "./Requestfrom";
// import Staff from "./Staff";
// import Footer from "./Footer";
// import Navbar from "./Navbar";

// const MainRoutes = () => {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar />
//       <div className="flex-grow-1">
//         <Routes>
    
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgotpassword" element={<Forgotpassword />} />

//           <Route path="/student/dashboard" element={<Studentdash />} />
//           <Route path="/equipmentreq" element={<Equipmentreq />} />
//           <Route path="/studentloan" element={<Studentloan />} />
//           <Route path="/requestfrom" element={<RequestFrom />} />
//           <Route path="/student/tracking" element={<Tracking />} />

//           <Route path="/admin" element={<Admin />} />
//           <Route path="/admin/approval" element={<Approval />} />
//           <Route path="/admin/equipmentreq" element={<Equipmentreq />} />
//           <Route path="/admin/manageequipment" element={<Manageequipments />} />
//           <Route path="/admin/manageusers" element={<Manageusers />} />

//           <Route path="/staff" element={<Staff />} />
//            <Route path="/staff/dashboard" element={<Staff />} />
//            <Route path="/admin/approval" element={<Approval />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MainRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Forgotpassword from "./Forgotpassword";
import Studentdash from "./Studentdash";
import Studentloan from "./Studentloan";
import Tracking from "./Tracking";
import Admin from "./Admin";
import Approval from "./Approval";
import Equipmentreq from "./Equipmentreq";
import Manageequipments from "./Manageequipments";
import Manageusers from "./Manageusers";
import RequestFrom from "./Requestfrom";
import Staff from "./Staff";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainRoutes = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public/User Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<Studentdash />} />
          <Route path="/equipmentreq" element={<Equipmentreq />} />
          <Route path="/studentloan" element={<Studentloan />} />
          <Route path="/requestfrom" element={<RequestFrom />} />
          <Route path="/student/tracking" element={<Tracking />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/approval" element={<Approval />} />
          <Route path="/admin/equipmentreq" element={<Equipmentreq />} />
          <Route path="/admin/manageequipment" element={<Manageequipments />} />
          <Route path="/admin/manageusers" element={<Manageusers />} />

          {/* Staff Routes */}
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/dashboard" element={<Staff />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainRoutes;
