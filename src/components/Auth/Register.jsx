import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [kyc, setKyc] = useState("");
  const [role, setRole] = useState("");



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        name,
        kyc,
        email,
        pass,
        role
        
       
      });

      if (response.status === 201) {
        
      
        localStorage.setItem("token" , response.data.token)
        toast.success("Register Success!", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            window.location.href = "/home";
          },
        });
      } else if (response.status === 400) {
        toast.error("User Already Exists", {
          position: "top-center",
          autoClose: 1000
        });
      } else {
        toast.error(`Unexpected status code: ${response.status}`, {
          position: "top-center",
          autoClose: 1000
        });
      }
    } catch (error) {
 
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 1000
        });
      
      console.error(error);
    }
  }

  return (
    <div className="container w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <form
        className="flex flex-col bg-gray-800 h-[40%] w-[30%] justify-center items-center rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-2xl">Login Page</h1>
        
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 rounded"
        />
         <input
          type="text"
          id="kyc"
          placeholder="Verification ID"
          value={kyc}
          onChange={(e) => setKyc(e.target.value)}
          className="mb-2 p-2 rounded"
        />
          <select
  id="role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="mb-2 p-2 rounded"
>
  <option value="">Account Type</option>
  <option value="Seller">Seller</option>
  <option value="Buyer">Buyer</option>

  {/* Add more options as needed */}
</select>

        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 rounded"
        />
        <input
          type="password"
          id="pass"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="mb-2 p-2 rounded"
        />
        <button
          className="bg-blue-700 flex justify-center items-center text-white p-4 rounded-3xl w-[30%] h-[15%] transition-all hover:scale-105"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
