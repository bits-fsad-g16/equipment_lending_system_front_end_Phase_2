// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Card, Container } from "react-bootstrap";

// function RequestForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const equipmentName = location.state?.equipmentName || "Unknown Equipment";
//   const [borrowDate, setBorrowDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [studentName, setStudentName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!borrowDate || !returnDate || !studentName) {
//       alert("Please fill all fields!");
//       return;
//     }

//     // Prepare payload expected by your Flask API
//     const newRequest = {
//       "equipment_name": equipmentName,
//       "borrow_date": borrowDate,
//       "return_date": returnDate,
//       "requested_by": studentName
//       // status can be set as default on backend if needed
//     };
//     console.log(newRequest)
//     fetch("http://127.0.0.1:8000/request/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newRequest),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to submit request");
//         return res.json();
//       })
//       .then((data) => {
//         alert("Request submitted successfully!");
//         // Clear form
//         setStudentName("");
//         setBorrowDate("");
//         setReturnDate("");
//         // Navigate after success
//         navigate("/student/dashboard");
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Failed to submit request");
//       });
//   };

//   return (
//     <Container className="py-5 d-flex justify-content-center align-items-center">
//       <Card style={{ width: "30rem" }} className="shadow-sm border-0">
//         <Card.Body>
//           <h4 className="text-center mb-4">Equipment Request Form</h4>

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Student Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 value={studentName}
//                 onChange={(e) => setStudentName(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Equipment Name</Form.Label>
//               <Form.Control type="text" value={equipmentName} readOnly />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Borrow Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={borrowDate}
//                 onChange={(e) => setBorrowDate(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Return Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={returnDate}
//                 onChange={(e) => setReturnDate(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <div className="text-center mt-4">
//               <Button variant="primary" type="submit">
//                 Submit Request
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// export default RequestForm;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert, Spinner } from "react-bootstrap";

function RequestForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const equipmentName = location.state?.equipmentName || "Unknown Equipment";
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    setMsg({ type: "", text: "" });

    if (!borrowDate || !returnDate || !studentName) {
      setMsg({ type: "danger", text: "Please fill all fields!" });
      return;
    }
    if (borrowDate > returnDate) {
      setMsg({ type: "danger", text: "Return date must be on or after borrow date." });
      return;
    }

    const newRequest = {
      equipment_name: equipmentName,
      borrow_date: borrowDate,
      return_date: returnDate,
      requested_by: studentName,
    };

    setLoading(true);

    fetch("http://127.0.0.1:8000/request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit request");
        return res.json();
      })
      .then(() => {
        setMsg({ type: "success", text: "Request submitted successfully!" });
        setStudentName("");
        setBorrowDate("");
        setReturnDate("");
        setTimeout(() => navigate("/student/dashboard"), 1200);
      })
      .catch(() => {
        setMsg({ type: "danger", text: "Failed to submit request" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center">
      <Card style={{ width: "30rem" }} className="shadow-sm border-0">
        <Card.Body>
          <h4 className="text-center mb-4">Equipment Request Form</h4>

          {msg.text && (
            <Alert variant={msg.type} className="text-center">
              {msg.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                autoFocus
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Equipment Name</Form.Label>
              <Form.Control type="text" value={equipmentName} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Borrow Date</Form.Label>
              <Form.Control
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                required
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                aria-required="true"
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Submit Request"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RequestForm;
