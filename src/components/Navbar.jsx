// import React, { useEffect, useState } from "react";
// import { Navbar, Container, Nav, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function AppNavbar() {
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const savedRole = localStorage.getItem("userRole");
//     if (savedRole) setRole(savedRole);
//   }, []);

//   const handleHomeClick = () => {
//     if (role === "student") {
//       navigate("/student/dashboard");
//     } else if (role === "staff") {
//       navigate("/staff/dashboard");
//     } else if (role === "admin") {
//       navigate("/admin");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleLogoutClick = () => {
//     localStorage.removeItem("userRole");
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
//       <Container fluid>
//         <Navbar.Brand className="ms-3 fs-5 fw-semibold">
//           School Management System
//         </Navbar.Brand>

//         <Nav className="ms-auto me-3">

//           <Button
//             variant="outline-light"
//             onClick={handleLogoutClick}
//             className="fw-semibold px-4"
//           >
//             Logout
//           </Button>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// }

// export default AppNavbar;
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleHomeClick = () => {
    if (role === "student") {
      navigate("/student/dashboard");
    } else if (role === "staff") {
      navigate("/staff/dashboard");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const navLinks =
    role === "student"
      ? [
          { label: "Equipment Request", to: "/equipmentreq" },
          { label: "Track Requests", to: "/student/tracking" },
        ]
      : role === "staff"
      ? [{ label: "Staff Dashboard", to: "/staff/dashboard" }]
      : role === "admin"
      ? [
          { label: "Admin Dashboard", to: "/admin" },
          { label: "Manage Equipments", to: "/admin/manageequipment" },
          { label: "Manage Users", to: "/admin/manageusers" },
        ]
      : [];

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm" sticky="top">
      <Container fluid>
        <Navbar.Brand
          className="ms-3 fs-5 fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={handleHomeClick}
          tabIndex={0}
          aria-label="Go to Home"
        >
          School Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center me-3">
            {navLinks.map(({ label, to }) => (
              <Nav.Link
                key={label}
                onClick={() => navigate(to)}
                className="fw-semibold"
                role="button"
                tabIndex={0}
              >
                {label}
              </Nav.Link>
            ))}
            <Button
              variant="outline-light"
              onClick={handleLogoutClick}
              className="fw-semibold px-4 ms-2"
              aria-label="Logout"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
