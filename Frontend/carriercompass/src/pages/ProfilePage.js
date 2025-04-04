import React, { useState } from "react";
import axios from "axios";


const ProfilePage = () => {
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/get_User/${token}`);
      setUserData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData("Error fetching data.");
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Load Profile</button>
      <textarea value={userData} readOnly rows={15} cols={60} />
    </div>
  );
};

export default ProfilePage;
