import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import { NotificationFailure, NotificationSuccess } from "../utils/tostify.ts";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      NotificationFailure("Email is required", "top-");
    }

    try {
      const { data } = await clientAxios.post("/clients/forgot-password", {
        email,
      });
      NotificationSuccess(data, "top-right");
    } catch (error) {
      NotificationFailure(error.message, "top-right");
    }
  };

  return (
    <>
      <h1 className="text-6xl font-black capitalize text-sky-600">
        Recover your account and don't lose your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      <form
        className="px-10 py-10 my-10 bg-white rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="block text-xl font-bold text-gray-600 uppercase"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Registered email"
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send instructions"
          className="w-full py-3 mb-5 font-bold text-white uppercase transition-colors rounded bg-sky-700 hover:cursor-pointer hover:bg-sky-800"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block my-5 text-sm text-center uppercase text-slate-500"
        >
          Already have an account? Log in!
        </Link>
        <Link
          to="/register"
          className="block my-5 text-sm text-center uppercase text-slate-500"
        >
          Don't have an account? Register now!
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
