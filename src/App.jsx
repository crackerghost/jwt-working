import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './components/Auth/Register';

function App() {
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/verifytoken", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        toast.success("Valid User", {
          position: "top-center",
          autoClose: 1000
        });
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error("Invalid User Auth", {
            position: "top-center",
            autoClose: 1000
          });
        } else {
          toast.error("An error occurred", {
            position: "top-center",
            autoClose: 1000
          });
        }
      }
    };
    verifyToken();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
