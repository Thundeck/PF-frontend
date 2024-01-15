import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ilustration from "../img/manager-flatline";
import { createUser } from "../redux/actions";
import { NotificationFailure, NotificationWarning } from "../utils/tostify.ts";

const initalState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  profile_img: "",
};

const NotVisible = () => {
  return <i className="fa-solid fa-lock" />;
};

const Visible = () => {
  return <i className="fa-solid fa-lock-open" />;
};

const Register = () => {
  const [formData, setFormData] = useState(initalState);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  const { password, email, name, repeatPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, profile_img: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).includes("")) {
      NotificationWarning("All fields are required", "top-right");
      return;
    }

    if (password !== repeatPassword) {
      NotificationWarning("Password doesn't match!", "top-right");
      return;
    }

    if (password.length < 6) {
      NotificationWarning(
        "Password too short, minimun length is 6",
        "top-right"
      );
      return;
    }

    try {
      createUser(formData, navigate);
      setFormData(initalState);
    } catch (error) {
      NotificationFailure(error.message, "top-right");
    }
  };

  return (
    <main className=" w-full h-full flex justify-center items-start lg:mt-10 flex-row gap-x-20 gap-y-10 lg:gap-y-0 flex-wrap mt-5 px-10">
      <div className="text-2xl lg:text-4xl text-center font-black text-principal dark:text-principal-dark flex justify-start items-center flex-col lg:gap-5 w-full lg:w-fit">
        <p>Register your account to get started</p>
        <Ilustration />
        <p>and reach new customers</p>
      </div>

      <form
        noValidate
        className="px-10 bg-principal w-96 py-5 h-fit dark:bg-principal-dark rounded-lg shadow-lg shadow-gray-300 flex justify-center items-center flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label
            htmlFor="name"
            className="block font-bold text-white capitalize"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full px-1 py-2 border rounded-lg bg-gray-50"
            value={name}
            onChange={handleChange}
          />
        </div>
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
            name="email"
            placeholder="Registered email"
            className="w-full p-2 border rounded-lg bg-gray-50"
            value={email}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute bottom-[10px] right-3 text-gray-400"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <NotVisible /> : <Visible />}
          </button>
        </div>
        <div className="relative w-full">
          <label
            htmlFor="repeat-password"
            className="block font-bold text-white capitalize"
          >
            Repeat your password
          </label>
          <input
            id="repeat-password"
            type={visible2 ? "password" : "text"}
            name="repeatPassword"
            placeholder="Repeat your password"
            className="w-full p-2 border rounded-lg bg-gray-50"
            value={repeatPassword}
            onChange={handleChange}
          />
          <p
            type="button"
            className="absolute z-50 bottom-[10px] right-3 text-gray-400"
            onClick={() => setVisible2(!visible2)}
          >
            {visible2 ? <NotVisible /> : <Visible />}
          </p>
        </div>

        <div className="relative w-full h-fit">
          <label
            htmlFor="input-file-register"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-fit flex dark:bg-principal bg-principal-dark py-1 justify-center items-center flex-row gap-5 rounded-lg text-white font-bold hover:cursor-pointer"
          >
            {formData.profile_img ? (
              <img
                alt="profile"
                className="h-[50px] w-[50px] object-cover rounded-full border-2 border-white"
                src={formData.profile_img}
              />
            ) : (
              <p className="min-h-[50px] min-w-[50px] rounded-full flex justify-center items-center border-2 border-white">
                <i className="fa-solid fa-user text-xl text-white"></i>
              </p>
            )}
            Profile Image
          </label>
          <input
            id="input-file-register"
            className="w-0"
            type="file"
            onChange={handleChangeImage}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white capitalize transition-colors rounded-lg bg-principal-dark dark:bg-principal hover:cursor-pointer hover:bg-sky-800"
        >
          Register
        </button>

        <nav>
          <Link
            to="/login"
            className="block text-sm text-center hover:text-slate-500 text-white underline"
          >
            Already have an account? Log in!
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

export default Register;
