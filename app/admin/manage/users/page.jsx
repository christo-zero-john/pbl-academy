"use client";

import { Admin } from "@/frontend/modules/entities/Admin";
import { useEffect, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async function () {
      const getUsersStatus = await Admin.getAllUsers();
      if (getUsersStatus.status == 0) {
        console.log("Error fetching user data: ", getUsersStatus.error);
      } else {
        setUsers(getUsersStatus.data);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div>
      {users.map((user, index) => {
        return <div key={index}>{user.id}</div>;
      })}
    </div>
  );
}
