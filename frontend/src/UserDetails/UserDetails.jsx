

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserDetails() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    // Fetch user data based on userId
    const getUserData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            
            if (!userId || !token) {
                alert("User ID or token not found. Please log in again.");
                navigate('/Login');
                return;
            }

            console.log("Token:", token); // Log the token for debugging

            const res = await fetch(`http://localhost:3000/user/${userId}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();
           
            //console.log("Response data:", data); // Log entire response data for inspection

            if (!res.ok) throw new Error(data.message || "Error fetching user data");

            // Handle specific responses based on server messages
            if (data.status === false) {
                if (data.message === "Invalid user Id") {
                    alert("Invalid user action");
                    navigate('/Home');
                } else if (data.message === "User Id is not present in DataBase.") {
                    alert("Account deactivated");
                    navigate('/Login');
                }
            } else if (data.status === true) {
                // Success: display user data
                //alert(`Welcome, ${data.data.data || "User"}`); // Adjusted based on likely data fields
                console.log(data.data)
                setUserData(data.data); // Set user data in state
               
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>User Details</h1>
            <button onClick={getUserData}>Get User Data</button>
            {userData && (
                <div>
                    <h3>firstname: {userData.fname}</h3>
                    <h3>Lastname: {userData.lname}</h3>
                    <h3>email: {userData.email}</h3>
                    <h3>password: {userData.password}</h3>
                    <h3>address: {userData.address}</h3>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
