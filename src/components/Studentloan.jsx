// import React, { useState, useEffect } from "react";
// import { Container, Table, Row, Col } from "react-bootstrap";

// function StudentDashboard() {
//   const [requests, setRequests] = useState([]);
//   const userIdString = localStorage.getItem("user_id");
//   const userId = userIdString ? parseInt(userIdString, 10) : null;

//   useEffect(() => {
//     if (!userId) {
//       alert("User ID not found");
//       return;
//     }

//     fetch(`http://127.0.0.1:8000/request/my_requests/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load requests");
//         return res.json();
//       })
//       .then(setRequests)
//       .catch((err) => alert(err.message));
//   }, [userId]);

//   return (
//     <Container className="py-5">
//       <h2 className="text-center mb-4">My Loan Requests</h2>

//       <Row className="justify-content-center">
//         <Col md={10}>
//           <Table striped bordered hover responsive className="shadow-sm">
//             <thead className="table-primary">
//               <tr>
//                 <th>Loan Detail</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.length > 0 ? (
//                 requests.map((req) => (
//                   <tr key={req.id}>
//                     <td>{req.loan_detail || req.equipment_name}</td>
//                     <td
//                       className={
//                         req.status === "Returned" || req.status === "Approved"
//                           ? "text-success"
//                           : "text-danger"
//                       }
//                     >
//                       {req.status}
//                     </td>
//                     <td>{/* Optional: Add action buttons here */}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center text-muted">
//                     No loan requests found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col, Alert, Spinner } from "react-bootstrap";

function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const userIdString = localStorage.getItem("user_id");
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  useEffect(() => {
    if (!userId) {
      setAlertMsg("User ID not found. Please login again.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/request/my_requests/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => setAlertMsg(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">My Loan Requests</h2>
      {alertMsg && <Alert className="text-center" variant="danger">{alertMsg}</Alert>}
      <Row className="justify-content-center">
        <Col md={10}>
          {loading ? (
            <div className="text-center my-5"><Spinner animation="border" /></div>
          ) : (
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>Equipment</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id || req.equipment_name+req.borrow_date}>
                      <td>{req.equipment_name || req.loan_detail}</td>
                      <td>{req.borrow_date || "—"}</td>
                      <td>{req.return_date || "—"}</td>
                      <td
                        className={
                          req.status === "Returned" || req.status === "Approved"
                            ? "text-success fw-semibold"
                            : "text-danger fw-semibold"
                        }
                      >
                        {req.status}
                      </td>
                      <td>
                        {/* Optionally add Cancel, Return, etc. buttons here */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No loan requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default StudentDashboard;
