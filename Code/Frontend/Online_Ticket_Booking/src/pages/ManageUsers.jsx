import React, { useEffect, useState } from "react";
import DataService from "../services/dataService";
import { Spinner, Table, Button, Alert } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Make sure this starts as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    DataService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError("Could not fetch users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(Boolean).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <Button
                  variant={user.status === "active" ? "danger" : "success"}
                  onClick={() => {
                    DataService.toggleUserStatus(user.id)
                      .then((res) => {
                        const updatedUser = res.data;
                        setUsers((prev) =>
                          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                        );
                      })
                      .catch(() => alert("Failed to toggle status"));
                  }}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
