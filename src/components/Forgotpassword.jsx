// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Card } from "react-bootstrap";

// function Forgotpassword() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");

//   const handleReset = (e) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Please enter your registered email address.");
//       return;
//     }

  
//     console.log("Password reset link sent to:", email);
//     alert("A password reset link has been sent to your email address.");
//     navigate("/"); 
//   };

//   const handleBackToLogin = () => {
//     navigate("/");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center bg-light"
//       style={{ minHeight: "calc(100vh - 120px)" }}
//     >
//       <Card style={{ width: "25rem" }} className="shadow-lg border-0">
//         <Card.Body>
//           <h3 className="text-center mb-4">Forgot Password</h3>
//           <Form onSubmit={handleReset}>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Registered Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-between align-items-center">
//               <Button variant="primary" type="submit" className="w-50 me-2">
//                 Reset Password
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 className="w-50"
//                 onClick={handleBackToLogin}
//               >
//                 Back to Login
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default Forgotpassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";

function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    // Here you would typically make an API request
    setLoading(true);
    try {
      // Simulate async API call
      await new Promise((r) => setTimeout(r, 1000));
      // If this were real:
      // const response = await fetch("/api/auth/forgot-password", { ... });
      // if (!response.ok) throw new Error("Error!");
      setSent(true);
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <Card style={{ width: "25rem" }} className="shadow-lg border-0" role="form" aria-label="Forgot Password Form">
        <Card.Body>
          <h3 className="text-center mb-4">Forgot Password</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {sent && (
            <Alert variant="success" className="text-center">
              A password reset link has been sent to your email.
            </Alert>
          )}
          {!sent && (
            <Form onSubmit={handleReset} autoComplete="off">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Registered Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  autoFocus
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary" type="submit" className="w-50 me-2" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" /> : "Reset Password"}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-50"
                  type="button"
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  Back to Login
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Forgotpassword;