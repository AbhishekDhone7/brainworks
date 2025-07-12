import React from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Button } from "@mui/material";
import "./ManageStudents.css";

const studentData = [
  { id: 1, name: "Alice Johnson", email: "alice@mail.com", course: "Math" },
  { id: 2, name: "Bob Smith", email: "bob@mail.com", course: "Science" },
  { id: 3, name: "Charlie Brown", email: "charlie@mail.com", course: "History" },
];

const studentColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
  { field: "course", headerName: "Course" },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: ({ row }) => (
      <div className="action-buttons">
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => alert(`Edit student ${row.id}`)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => alert(`Delete student ${row.id}`)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export default function ManageStudents() {
  return (
    <div className="manage-students-wrapper">
      <div className="header">
        <h2>Manage Students</h2>
        <Button variant="contained" color="success">
          + Add Student
        </Button>
      </div>
      <CustomTable columns={studentColumns} rows={studentData} />
    </div>
  );
}
