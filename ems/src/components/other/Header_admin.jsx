import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../pages/ChangePassword";

const Header_admin = (props) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // ✅ INSIDE the component

  useEffect(() => {
    if (!props.data) {
      setUsername("Admin");
    } else {
      setUsername(props.data.name);
    }
  }, [props.data]);

  const logoutuser = () => {
    localStorage.removeItem("loggedInUser");
    props.changeUser("");
  };

  const goToRegister = () => {
    navigate("/register"); // ✅ use inside a function
  };

  const goToChangePassword = () => {
    navigate("/change-password"); // ✅ use inside a function
  };

  return (
    <div className="text-amber-50 flex items-end justify-between">
      <h1 className="text-2xl font-medium">
        Hello <br />
        <span className="text-3xl font-semibold">{username}</span>
      </h1>

      <div className="flex gap-2">
        <button
          className="bg-emerald-600 text-lg font-medium text-white px-5 py-2 rounded-sm"
          onClick={goToRegister} // ✅ call a function
        >
          Register
        </button>

        <button
          className="bg-emerald-600 text-lg font-medium text-white px-5 py-2 rounded-sm"
          onClick={goToChangePassword} // ✅ call a function
        >
          Change Password
        </button>
        <button
          className="bg-red-600 text-lg font-medium text-white px-5 py-2 rounded-sm"
          onClick={logoutuser}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header_admin;
