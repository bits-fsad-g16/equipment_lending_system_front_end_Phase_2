// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Card } from "react-bootstrap";

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const payload = {
//       email,
//       password,
//     };

//     console.log("Payload:", payload);

//     fetch("http://127.0.0.1:8000/user/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json().then((data) => {
//             // alert("Login successful");
//             localStorage.setItem("userRole", role);
//             console.log(data)
//             localStorage.setItem("accessToken", data.access_token);
//             localStorage.setItem("user_id", data.user_id)
//             console.log('acess token set')
//             if (role === "student") navigate("/student/dashboard");
//             else if (role === "staff") navigate("/staff/dashboard");
//             else if (role === "admin") navigate("/admin");
//           });
//         } else {
//           return res.json().then((errorData) => {
//             alert(errorData.detail || "Login failed!");
//           });
//         }
//       })
//       .catch((err) => {
//         alert("Could not connect to server!");
//       });
//   };


//   const handleForgotPassword = () => {
//     navigate("/forgotpassword");
//   };

//   const handleSignup = () => {
//     navigate("/signup");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center bg-light"
//       style={{ minHeight: "calc(100vh - 120px)" }}
//     >
//       <Card style={{ width: "24rem" }} className="shadow-lg border-0">
//         <Card.Body>
//           <h3 className="text-center mb-4">Login</h3>
//           <Form onSubmit={handleLogin}>
//             <Form.Group className="mb-3" controlId="username">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-4" controlId="role">
//               <Form.Label>Login As</Form.Label>
//               <Form.Select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="student">student</option>
//                 <option value="staff">staff</option>
//                 <option value="admin">admin</option>
//               </Form.Select>
//             </Form.Group>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <Button variant="primary" type="submit" className="w-50 me-2">
//                 Login
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 onClick={handleSignup}
//                 className="w-50"
//               >
//                 Sign Up
//               </Button>
//             </div>

//             <div className="text-center">
//               <Button
//                 variant="link"
//                 className="text-decoration-none"
//                 onClick={handleForgotPassword}
//               >
//                 Forgot Password?
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const payload = { email, password };

    fetch("http://127.0.0.1:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            localStorage.setItem("userRole", role);
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            if (role === "student") navigate("/student/dashboard");
            else if (role === "staff") navigate("/staff/dashboard");
            else if (role === "admin") navigate("/admin");
          });
        } else {
          return res.json().then((errorData) => {
            setError(errorData.detail || "Login failed!");
          });
        }
      })
      .catch(() => setError("Could not connect to server!"))
      .finally(() => setLoading(false));
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <Card style={{ width: "24rem" }} className="shadow-lg border-0">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          <Form onSubmit={handleLogin} autoComplete="off">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="role">
              <Form.Label>Login As</Form.Label>
              <Form.Select
                value={role}
                aria-label="Select your role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">student</option>
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button
                variant="primary"
                type="submit"
                className="w-50 me-2"
                disabled={loading}
              >
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Login"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleSignup}
                className="w-50"
                type="button"
                disabled={loading}
              >
                Sign Up
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="link"
                className="text-decoration-none"
                onClick={handleForgotPassword}
                disabled={loading}
                tabIndex={0}
              >
                Forgot Password?
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
