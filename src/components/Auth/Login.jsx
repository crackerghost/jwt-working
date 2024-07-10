import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/verifyLogin", {
        email,
        pass,
      });

      if (response.status === 200) {
        
      
        localStorage.setItem("token" , response.data.token)
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            window.location.href = "/home";
          },
        });
      } else if (response.status === 400) {
        toast.error("Invalid login credentials. Please try again.", {
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
      if (error.response && error.response.status === 400) {
        toast.error("Invalid login credentials. Please try again.", {
          position: "top-center",
          autoClose: 1000
        });
      } else {
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          autoClose: 1000
        });
      }
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

export default Login;
