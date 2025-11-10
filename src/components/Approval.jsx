// import React, { useEffect, useState } from "react";
// import { Container, Table, Button } from "react-bootstrap";

// function Approval() {
//   const [requests, setRequests] = useState([]);

//   const fetchRequests = () => {
//     fetch("http://127.0.0.1:8000/request/pending") // plural 'requests' for consistency
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to load requests");
//         return res.json();
//       })
//       .then(setRequests)
//       .catch(() => alert("Failed to load requests"));
//   };

//   useEffect(() => {
//     fetchRequests();
//     const interval = setInterval(fetchRequests, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAction = (id, action) => {
//     const endpoint = 
//       action === "Approved"
//         ? `http://127.0.0.1:8000/request/${id}/approve`
//         : `http://127.0.0.1:8000/request/${id}/reject`;

//     fetch(endpoint, { method: "PUT" })
//       .then((res) => {
//         if (!res.ok) throw new Error(`${action} failed`);
//         fetchRequests();
//       })
//       .catch(() => alert(`${action} failed`));
//   };

//   return (
//     <Container className="py-5">
//       <h3 className="text-center mb-4">Pending Equipment Requests</h3>

//       {requests.length === 0 ? (
//         <p className="text-center">No pending requests found.</p>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead className="table-primary">
//             <tr>
//               <th>#</th>
//               <th>Equipment Name</th>
//               <th>Requested By</th>
//               <th>Borrow Date</th>
//               <th>Return Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req, index) => (
//               <tr key={req.id}>
//                 <td>{index + 1}</td>
//                 <td>{req.equipmentName}</td>
//                 <td>{req.requestedBy}</td>
//                 <td>{req.borrowDate}</td>
//                 <td>{req.returnDate}</td>
//                 <td>{req.status}</td>
//                 <td className="text-center">
//                   {req.status === "Pending" ? (
//                     <>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleAction(req.id, "Approved")}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => handleAction(req.id, "Rejected")}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   ) : (
//                     <strong
//                       className={
//                         req.status === "Approved"
//                           ? "text-success"
//                           : "text-danger"
//                       }
//                     >
//                       {req.status}
//                     </strong>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }

// export default Approval;

import React, { useEffect, useState, useCallback } from "react";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";

function Approval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/request/pending");
      if (!res.ok) throw new Error("Failed to load requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 8000);
    return () => clearInterval(interval);
  }, [fetchRequests]);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    setError("");
    const endpoint =
      action === "Approved"
        ? `http://127.0.0.1:8000/request/${id}/approve`
        : `http://127.0.0.1:8000/request/${id}/reject`;

    try {
      const res = await fetch(endpoint, { method: "PUT" });
      if (!res.ok) throw new Error(`${action} failed`);
      await fetchRequests();
    } catch {
      setError(`Request ${action.toLowerCase()} failed.`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4">Pending Equipment Requests</h3>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center">No pending requests found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Equipment Name</th>
              <th>Requested By</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id}>
                <td>{index + 1}</td>
                <td>{req.equipmentName}</td>
                <td>{req.requestedBy}</td>
                <td>{req.borrowDate}</td>
                <td>{req.returnDate}</td>
                <td>
                  {req.status === "Approved" ? (
                    <span className="text-success fw-bold">{req.status}</span>
                  ) : req.status === "Rejected" ? (
                    <span className="text-danger fw-bold">{req.status}</span>
                  ) : (
                    req.status
                  )}
                </td>
                <td className="text-center">
                  {req.status === "Pending" ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleAction(req.id, "Approved")}
                        disabled={actionLoading === req.id + "Approved"}
                        aria-label={`Approve request for ${req.equipmentName}`}
                      >
                        {actionLoading === req.id + "Approved" ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Approve"
                        )}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleAction(req.id, "Rejected")}
                        disabled={actionLoading === req.id + "Rejected"}
                        aria-label={`Reject request for ${req.equipmentName}`}
                      >
                        {actionLoading === req.id + "Rejected" ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Reject"
                        )}
                      </Button>
                    </>
                  ) : (
                    <span aria-label={req.status}>{req.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Approval;
