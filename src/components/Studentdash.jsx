// import React, { useState, useEffect } from "react";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function StudentDashboard() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
    
//     const userIdString = localStorage.getItem("user_id");
//     const userId = userIdString ? parseInt(userIdString) : null;

//     console.log(userId)

//     fetch(`http://127.0.0.1:8000/user/me?user_id=${userId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" }
//     })
//       .then(res => {
//         console.log(res)
//         if (!res.ok) throw new Error("Failed to load profile");
//         return res.json();
//       })
//       .then(data => setProfile(data))
//       .catch(() => alert("Failed to load profile2"));
//   }, []);

//   const handleGoToEquipmentReq = () => {
//     navigate("/equipmentreq");
//   };

//   const handleGoToLoanDetails = () => {
//     navigate("/studentloan");
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">Student Dashboard</h2>
//       <Card className="shadow-sm mb-4">
//         <Card.Body>
//           <h4 className="mb-3">Student Profile</h4>
//           {profile ? (
//             <>
//               <p><strong>User:</strong> {profile.username}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <p><strong>Role:</strong> {profile.role}</p>
//             </>
//           ) : (
//             <p>Loading profile...</p>
//           )}
//         </Card.Body>
//       </Card>

//       <Row className="g-4">
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body className="text-center">
//               <h5>Equipment Request Details</h5>
//               <p>Borrow or request lab equipment easily.</p>
//               <Button variant="primary" onClick={handleGoToEquipmentReq}>
//                 Go
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body className="text-center">
//               <h5>Student Loan Details</h5>
//               <p>Check the status of borrowed equipment and loans.</p>
//               <Button variant="secondary" onClick={handleGoToLoanDetails}>
//                 View
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DASHBOARD_ACTIONS = [
  {
    title: "Equipment Request Details",
    text: "Borrow or request lab equipment easily.",
    buttonLabel: "Go",
    variant: "primary",
    onClick: (navigate) => navigate("/equipmentreq"),
  },
  {
    title: "Student Loan Details",
    text: "Check the status of borrowed equipment and loans.",
    buttonLabel: "View",
    variant: "secondary",
    onClick: (navigate) => navigate("/studentloan"),
  },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    const userIdString = localStorage.getItem("user_id");
    const userId = userIdString ? parseInt(userIdString) : null;
    if (!userId) {
      setAlertMsg("User not logged in. Please login again.");
      setLoading(false);
      return;
    }
    fetch(`http://127.0.0.1:8000/user/me?user_id=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setAlertMsg("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Student Dashboard</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h4 className="mb-3">Student Profile</h4>
          {loading ? (
            <div className="text-center py-3"><Spinner animation="border" /></div>
          ) : alertMsg ? (
            <Alert variant="danger" className="text-center mb-0">{alertMsg}</Alert>
          ) : profile ? (
            <>
              <p><strong>User:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
            </>
          ) : null}
        </Card.Body>
      </Card>

      <Row className="g-4">
        {DASHBOARD_ACTIONS.map((item, idx) => (
          <Col md={6} key={item.title}>
            <Card className="shadow-sm h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
                <Button
                  variant={item.variant}
                  onClick={() => item.onClick(navigate)}
                  className="mt-3"
                  aria-label={item.buttonLabel}
                >
                  {item.buttonLabel}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StudentDashboard;
