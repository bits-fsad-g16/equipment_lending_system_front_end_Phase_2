// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function Staffdash() {
//   const navigate = useNavigate();

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">Staff Dashboard</h2>

//       <Row className="g-4 justify-content-center">
//         <Col md={4}>
//           <Card className="shadow-sm border-0">
//             <Card.Body className="text-center">
//               <Card.Title>Approve Equipment Requests</Card.Title>
//               <Card.Text>
//               Approve pending requests from students.
//               </Card.Text>
//               <Button
//                 variant="primary"
//                 onClick={() => navigate("/admin/approval")}
//               >
//                 Go to Approvals
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="shadow-sm border-0">
//             <Card.Body className="text-center">
//               <Card.Title>Track Requests</Card.Title>
//               <Card.Text>
//                 View all active and returned equipment requests.
//               </Card.Text>
//               <Button
//                 variant="warning"
//                 onClick={() => navigate("/student/tracking")}
//               >
//                 View Tracking
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Staffdash;
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DASHBOARD_CARDS = [
  {
    title: "Approve Equipment Requests",
    text: "Approve pending requests from students.",
    buttonLabel: "Go to Approvals",
    route: "/admin/approval",
    variant: "primary",
  },
  {
    title: "Track Requests",
    text: "View all active and returned equipment requests.",
    buttonLabel: "View Tracking",
    route: "/student/tracking",
    variant: "warning",
  },
];

function Staffdash() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Staff Dashboard</h2>
      <Row className="g-4 justify-content-center">
        {DASHBOARD_CARDS.map((card, idx) => (
          <Col md={4} key={idx}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <div>
                  <Card.Title as="h3">{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </div>
                <Button
                  variant={card.variant}
                  onClick={() => navigate(card.route)}
                  className="mt-3"
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

export default Staffdash;
