import React from "react";
import Header_admin from "../other/Header_admin";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = ({ changeUser, handleRefresh }) => {
  return (
    <div className="h-screen w-full p-7">
      <Header_admin changeUser={changeUser} />
      <CreateTask handleRefresh={handleRefresh} />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
