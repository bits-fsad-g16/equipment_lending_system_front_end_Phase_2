// import React, { useState, useEffect } from "react";
// import { Container, Table, Button, Form } from "react-bootstrap";

// function ManageUsers() {
//   const [users, setUsers] = useState([]);

//   // Track currently edited user by ID and their form data
//   const [editId, setEditId] = useState(null);
//   const [editRole, setEditRole] = useState("");

//   // Load users from backend
//   const fetchUsers = () => {
//     fetch("http://127.0.0.1:8000/user/users_list")
//       .then((res) => res.json())
//       .then(setUsers)
//       .catch(() => alert("Failed to fetch users"));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       fetch(`http://127.0.0.1:8000/user/delete_user/${id}`, { method: "DELETE" })
//         .then((res) => {
//           if (res.ok) fetchUsers();
//           else alert("Delete failed");
//         })
//         .catch(() => alert("Delete failed"));
//     }
//   };

//   const startEdit = (user) => {
//     setEditId(user.id);
//     setEditRole(user.role);
//   };

//   const handleApply = (id) => {
//     fetch(`http://127.0.0.1:8000/user/edit_user/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ role: editRole }),
//     })
//       .then((res) => {
//         if (res.ok) {
//           alert("User role updated");
//           fetchUsers();
//           setEditId(null);
//           setEditRole("");
//         } else {
//           alert("Update failed");
//         }
//       })
//       .catch(() => alert("Update failed"));
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditRole("");
//   };

//   return (
//     <Container className="py-5">
//       <h3 className="text-center mb-4">Manage Users</h3>

//       <Table striped bordered hover responsive className="shadow-sm">
//         <thead className="table-success">
//           <tr>
//             <th>#</th>
//             <th>Username</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td>{user.username}</td>
//                 <td>
//                   {editId === user.id ? (
//                     <Form.Select
//                       value={editRole}
//                       onChange={(e) => setEditRole(e.target.value)}
//                     >
//                       <option value="student">Student</option>
//                       <option value="staff">Staff</option>
//                       <option value="admin">Admin</option>
//                     </Form.Select>
//                   ) : (
//                     user.role
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {editId === user.id ? (
//                     <>
//                       <Button
//                         size="sm"
//                         variant="success"
//                         className="me-2"
//                         onClick={() => handleApply(user.id)}
//                       >
//                         Apply
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={handleCancel}
//                       >
//                         Cancel
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         size="sm"
//                         variant="outline-warning"
//                         className="me-2"
//                         onClick={() => startEdit(user)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline-danger"
//                         onClick={() => handleDelete(user.id)}
//                       >
//                         Delete
//                       </Button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center text-muted">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default ManageUsers;
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert, Spinner } from "react-bootstrap";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/user/users_list");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
    } catch {
      setAlertMsg({ type: "danger", text: "Failed to fetch users." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg({ type: "", text: "" }), 1800);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setActionLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/user/delete_user/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        showAlert("success", "User deleted.");
        fetchUsers();
      } catch {
        showAlert("danger", "Delete failed.");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setEditRole(user.role);
  };

  const handleApply = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/user/edit_user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: editRole }),
      });
      if (!res.ok) throw new Error();
      showAlert("success", "User role updated.");
      fetchUsers();
      setEditId(null);
      setEditRole("");
    } catch {
      showAlert("danger", "Update failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditRole("");
  };

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4">Manage Users</h3>
      {alertMsg.text && (
        <Alert variant={alertMsg.type} className="text-center py-2 mb-3">
          {alertMsg.text}
        </Alert>
      )}
      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    {editId === user.id ? (
                      <Form.Select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        aria-label="User role"
                      >
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="text-center">
                    {editId === user.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          className="me-2"
                          onClick={() => handleApply(user.id)}
                          disabled={actionLoading}
                        >
                          {actionLoading ? <Spinner as="span" size="sm" animation="border" /> : "Apply"}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleCancel}
                          disabled={actionLoading}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline-warning"
                          className="me-2"
                          onClick={() => startEdit(user)}
                          disabled={actionLoading}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(user.id)}
                          disabled={actionLoading}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageUsers;
