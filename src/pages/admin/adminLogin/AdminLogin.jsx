import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import myContext from "../../../context/data/myContext";
import { auth } from "../../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const context = useContext(myContext);
  const { mode } = context;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      return toast.error("Please fill in the login credentials");
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      localStorage.setItem("admin", JSON.stringify(result));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Card */}
      <Card
        className="w-full max-w-[24rem] shadow-xl rounded-lg transform transition-all duration-300 hover:scale-105"
        style={{
          background:
            mode === "dark"
              ? "rgba(30, 41, 59, 0.95)" // Dark mode card background
              : "rgba(255, 255, 255, 0.9)", // Light mode card background
          backdropFilter: "blur(10px)",
        }}
      >
        {/* CardHeader */}
        <CardHeader
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            borderTopLeftRadius: "0.75rem",
            borderTopRightRadius: "0.75rem",
          }}
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-3">
            <div className="flex justify-center">
              {/* Image */}
              <img
                className="rounded-full shadow-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzekamkBASPpF4KpUzAT1aryxtAT6BOOpRg&s"
                alt="Admin"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
          </div>

          {/* Top Heading */}
          <Typography
            variant="h4"
            className="font-semibold"
            style={{
              color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
              fontSize: "1.75rem",
            }}
          >
            Admin Login
          </Typography>
        </CardHeader>

        {/* CardBody */}
        <CardBody className="px-8 py-6">
          <form className="flex flex-col gap-6">
            {/* First Input */}
            <div>
              <Input
                type="email"
                label="Email"
                value={email}
                autoComplete="new-email" 
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md shadow-sm border-0 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Second Input */}
            <div>
              <Input
                type="password"
                label="Password"
                value={password}
                autoComplete="new-password" 
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md shadow-sm border-0 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Login Button */}
            <Button
              onClick={login}
              size="lg"
              className="shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
              style={{
                background:
                  mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                color:
                  mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
              }}
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
