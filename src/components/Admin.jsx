// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function AdminDashboard() {
//   const navigate = useNavigate();

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">Admin Dashboard</h2>

//       <Row className="g-4 justify-content-center">
//         {/* Manage Equipment */}
//         <Col md={4}>
//           <Card className="shadow-sm border-0 text-center">
//             <Card.Body>
//               <Card.Title>Manage Equipment</Card.Title>
//               <Card.Text>Add, edit, or remove lab equipment.</Card.Text>
//               <Button
//                 variant="primary"
//                 onClick={() => navigate("/admin/manageequipment")}
//               >
//                 Go to Equipment
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Manage Users */}
//         <Col md={4}>
//           <Card className="shadow-sm border-0 text-center">
//             <Card.Body>
//               <Card.Title>Manage Users</Card.Title>
//               <Card.Text>View, edit, or delete system users.</Card.Text>
//               <Button
//                 variant="success"
//                 onClick={() => navigate("/admin/manageusers")}
//               >
//                 Go to Users
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default AdminDashboard;
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DASHBOARD_CARDS = [
  {
    title: "Manage Equipment",
    text: "Add, edit, or remove lab equipment.",
    buttonLabel: "Go to Equipment",
    route: "/admin/manageequipment",
    variant: "primary",
  },
  {
    title: "Manage Users",
    text: "View, edit, or delete system users.",
    buttonLabel: "Go to Users",
    route: "/admin/manageusers",
    variant: "success",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container className="py-5" fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center fw-bold" tabIndex={0} aria-label="Admin Dashboard">
            Admin Dashboard
          </h2>
        </Col>
      </Row>
      <Row className="g-4 justify-content-center">
        {DASHBOARD_CARDS.map((card, idx) => (
          <Col key={idx} md={4}>
            <Card className="shadow-sm border-0 text-center h-100" role="region" aria-label={card.title}>
              <Card.Body>
                <Card.Title as="h3">{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button
                  variant={card.variant}
                  size="lg"
                  onClick={() => navigate(card.route)}
                  aria-label={card.buttonLabel}
                >
                  {card.buttonLabel}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;
