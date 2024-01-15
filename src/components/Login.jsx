import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import { loginUser } from "../redux/actions/index.js";
import { NotificationFailure, NotificationSuccess } from "../utils/tostify.ts";

const NotVisible = () => {
  return <i className="fa-solid fa-lock" />;
};

const Visible = () => {
  return <i className="fa-solid fa-lock-open" />;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async (response) => {
    console.log(response);
    try {
      const { data } = await clientAxios.post("/client/googleAuth", response);
      console.log(data);
      if (data?.token) {
        localStorage.setItem("token", data?.token);
      }
      if (data) {
        console.log(data);
        dispatch(loginUser(data));
      }
    } catch (error) {
      NotificationFailure(error.message, "top-right");
    }
  };

  if (currentUser?._id) return <Navigate to="/account" replace />;

  return (
    <main className="w-full h-full flex justify-center items-center lg:mt-10 flex-col gap-y-10 mt-5 px-10">
      <h1 className="text-2xl lg:text-4xl font-black capitalize text-principal dark:text-principal-dark w-full text-center max-w-[80%] m-auto">
        Log in to manage your <hr />
        <span className="text-slate-700">complex</span> or turns{" "}
        <span className="text-slate-700">reservations</span>
      </h1>

      <form
        onSubmit={handleLoginSubmit}
        className="px-10 bg-principal w-96 py-5 h-fit dark:bg-principal-dark rounded-lg shadow-lg shadow-gray-300 flex justify-center items-center flex-col gap-5"
      >
        <div className="w-full">
          <label
            htmlFor="email"
            className="block font-bold text-white capitalize"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            className="w-full px-1 py-2 border rounded-lg bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <label
            htmlFor="password"
            className="block font-bold text-white capitalize"
          >
            Password
          </label>
          <input
            id="password"
            type={visible ? "password" : "text"}
            name="password"
            placeholder="Registered password"
            className="w-full p-2 border rounded-lg bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute bottom-[10px] right-3 text-gray-400"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <NotVisible /> : <Visible />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white capitalize transition-colors rounded-lg bg-principal-dark dark:bg-principal hover:cursor-pointer hover:bg-sky-800"
        >
          Log in
        </button>

        <GoogleLogin
          size="large"
          useOneTap={true}
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse);
          }}
          onError={() => {
            NotificationSuccess("Fail to login user");
          }}
        />
        <nav>
          <Link
            to="/register"
            className="block text-sm text-center hover:text-slate-500 text-white underline"
          >
            Don't have an account? Register now!
          </Link>
          <Link
            to="/forgot-password"
            className="block text-sm text-center hover:text-slate-500 text-white underline"
          >
            Forgot my password
          </Link>
        </nav>
      </form>
    </main>
  );
};

export default Login;
