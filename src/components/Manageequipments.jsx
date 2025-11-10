// import React, { useState, useEffect } from "react";
// import { Container, Card, Form, Button, Table } from "react-bootstrap";

// function Manageequipments() {
//   const [equipments, setEquipments] = useState([]);
//   const [newEquipment, setNewEquipment] = useState("");

//   // Track which equipment is in edit mode
//   const [editId, setEditId] = useState(null);
//   // Controlled form for edits
//   const [editForm, setEditForm] = useState({
//     name: "",
//     category: "",
//     available_quantity: 0,
//   });

//   // Fetch equipments from backend on mount
//   const fetchEquipments = () => {
//     fetch("http://127.0.0.1:8000/equipment/")
//       .then((res) => res.json())
//       .then(setEquipments)
//       .catch(() => alert("Failed to load equipments"));
//   };

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const handleAddEquipment = () => {
//     const name = newEquipment.trim();
//     if (!name) return alert("Enter equipment name!");

//     const quantity = window.prompt("Enter quantity:", "1");
//     if (quantity === null || isNaN(quantity) || Number(quantity) < 0) {
//       return alert("Invalid quantity");
//     }

//     const category = window.prompt("Enter category:", "");
//     if (category === null || category.trim() === "") {
//       return alert("Invalid category");
//     }

//     const payload = {
//       name,
//       available_quantity: Number(quantity),
//       category: category.trim(),
//     };

//     fetch("http://127.0.0.1:8000/equipment/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => {
//         if (res.ok) {
//           setNewEquipment("");
//           fetchEquipments();
//         } else {
//           alert("Failed to add equipment");
//         }
//       })
//       .catch(() => alert("Failed to add equipment"));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this equipment?")) {
//       fetch(`http://127.0.0.1:8000/equipment/${id}`, {
//         method: "DELETE",
//       })
//         .then((res) => {
//           if (res.ok) fetchEquipments();
//           else alert("Delete failed");
//         })
//         .catch(() => alert("Delete failed"));
//     }
//   };

//   const startEdit = (eq) => {
//     setEditId(eq.id);
//     setEditForm({
//       name: eq.name,
//       category: eq.category,
//       available_quantity: eq.available_quantity,
//     });
//   };

//   const handleApply = (id) => {
//     const payload = {
//       "name": editForm.name,
//       "category": editForm.category,
//       "available_quantity": Number(editForm.available_quantity),
//     };

//     fetch(`http://127.0.0.1:8000/equipment/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => {
//         if (res.ok) {
//           fetchEquipments();
//           setEditId(null);
//         } else {
//           alert("Update failed");
//         }
//       })
//       .catch(() => alert("Update failed"));
//   };

//   return (
//     <Container className="py-5">
//       <Card className="p-4 shadow-sm border-0">
//         <h3 className="mb-4 text-center">Manage Equipment</h3>

//         <Form className="d-flex mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Enter equipment name"
//             value={newEquipment}
//             onChange={(e) => setNewEquipment(e.target.value)}
//           />
//           <Button variant="primary" className="ms-2" onClick={handleAddEquipment}>
//             Add
//           </Button>
//         </Form>

//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Equipment Name</th>
//               <th>Category</th>
//               <th>Available Count</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {equipments.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center text-muted">
//                   No equipment added yet
//                 </td>
//               </tr>
//             ) : (
//               equipments.map((eq, index) => (
//                 <tr key={eq.id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {editId === eq.id ? (
//                       <Form.Control
//                         type="text"
//                         value={editForm.name}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, name: e.target.value })
//                         }
//                       />
//                     ) : (
//                       eq.name
//                     )}
//                   </td>
//                   <td>
//                     {editId === eq.id ? (
//                       <Form.Control
//                         type="text"
//                         value={editForm.category}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, category: e.target.value })
//                         }
//                       />
//                     ) : (
//                       eq.category
//                     )}
//                   </td>
//                   <td>
//                     {editId === eq.id ? (
//                       <Form.Control
//                         type="number"
//                         value={editForm.available_quantity}
//                         min="0"
//                         onChange={(e) =>
//                           setEditForm({
//                             ...editForm,
//                             available_quantity: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       eq.available_quantity
//                     )}
//                   </td>
//                   <td>
//                     {editId === eq.id ? (
//                       <>
//                         <Button
//                           variant="success"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => handleApply(eq.id)}
//                         >
//                           Apply
//                         </Button>
//                         <Button
//                           variant="secondary"
//                           size="sm"
//                           onClick={() => setEditId(null)}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           variant="warning"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => startEdit(eq)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleDelete(eq.id)}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </Table>
//       </Card>
//     </Container>
//   );
// }

// export default Manageequipments;
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Table, Alert, Spinner } from "react-bootstrap";

function Manageequipments() {
  const [equipments, setEquipments] = useState([]);
  const [newEquipment, setNewEquipment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", available_quantity: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  // Fetch equipments from backend
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/equipment/");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEquipments(data);
    } catch {
      setAlertMsg({ type: "danger", text: "Failed to load equipments." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg({ type: "", text: "" }), 2000);
  };

  const handleAddEquipment = async () => {
    const name = newEquipment.trim();
    if (!name) return showAlert("warning", "Enter equipment name!");
    const quantity = window.prompt("Enter quantity:", "1");
    if (quantity === null || isNaN(quantity) || Number(quantity) < 0) {
      return showAlert("warning", "Invalid quantity");
    }
    const category = window.prompt("Enter category:", "");
    if (category === null || category.trim() === "") {
      return showAlert("warning", "Invalid category");
    }
    const payload = {
      name,
      available_quantity: Number(quantity),
      category: category.trim(),
    };
    setActionLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/equipment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setNewEquipment("");
      showAlert("success", "Equipment added!");
      fetchEquipments();
    } catch {
      showAlert("danger", "Failed to add equipment");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      setActionLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/equipment/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        showAlert("success", "Deleted successfully");
        fetchEquipments();
      } catch {
        showAlert("danger", "Delete failed");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const startEdit = (eq) => {
    setEditId(eq.id);
    setEditForm({
      name: eq.name,
      category: eq.category,
      available_quantity: eq.available_quantity,
    });
  };

  const handleApply = async (id) => {
    if (!editForm.name.trim() || !editForm.category.trim() || isNaN(editForm.available_quantity)) {
      return showAlert("warning", "Invalid fields");
    }
    setActionLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/equipment/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name.trim(),
          category: editForm.category.trim(),
          available_quantity: Number(editForm.available_quantity),
        }),
      });
      if (!res.ok) throw new Error();
      showAlert("success", "Equipment updated!");
      fetchEquipments();
      setEditId(null);
    } catch {
      showAlert("danger", "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm border-0">
        <h3 className="mb-4 text-center">Manage Equipment</h3>

        {alertMsg.text && (
          <Alert variant={alertMsg.type} className="text-center py-2 mb-3">
            {alertMsg.text}
          </Alert>
        )}

        <Form className="d-flex mb-3" onSubmit={e => { e.preventDefault(); handleAddEquipment(); }}>
          <Form.Control
            type="text"
            placeholder="Enter equipment name"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            aria-label="Enter equipment name"
          />
          <Button
            variant="primary"
            className="ms-2"
            onClick={handleAddEquipment}
            disabled={actionLoading}
            type="submit"
          >
            {actionLoading ? <Spinner as="span" size="sm" animation="border" /> : "Add"}
          </Button>
        </Form>

        {loading ? (
          <div className="text-center my-5"><Spinner animation="border" /></div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Available Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No equipment added yet
                  </td>
                </tr>
              ) : (
                equipments.map((eq, index) => (
                  <tr key={eq.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editId === eq.id ? (
                        <Form.Control
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          aria-label="Equipment name"
                        />
                      ) : (
                        eq.name
                      )}
                    </td>
                    <td>
                      {editId === eq.id ? (
                        <Form.Control
                          type="text"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({ ...editForm, category: e.target.value })
                          }
                          aria-label="Category"
                        />
                      ) : (
                        eq.category
                      )}
                    </td>
                    <td>
                      {editId === eq.id ? (
                        <Form.Control
                          type="number"
                          min="0"
                          value={editForm.available_quantity}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              available_quantity: e.target.value,
                            })
                          }
                          aria-label="Available quantity"
                        />
                      ) : (
                        eq.available_quantity
                      )}
                    </td>
                    <td>
                      {editId === eq.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleApply(eq.id)}
                            disabled={actionLoading}
                          >
                            {actionLoading ? <Spinner as="span" size="sm" animation="border" /> : "Apply"}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditId(null)}
                            disabled={actionLoading}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => startEdit(eq)}
                            disabled={actionLoading}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(eq.id)}
                            disabled={actionLoading}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}

export default Manageequipments;
