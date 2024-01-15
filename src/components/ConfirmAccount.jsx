import { useState } from "react";
import { confirmAccount } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const ConfirmAccount = () => {
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm === localStorage.getItem("token"))
      confirmAccount(confirm, navigate);
    setConfirm("");
  };

  return (
    <main className="w-full h-full flex justify-center items-center flex-col pt-10 gap-10">
      <h1 className="text-principal dark:text-principal-dark font-black text-3xl capitalize text-center">
        Confirm your account to <hr /> start using{" "}
        <span className="text-black">BooKing</span>
      </h1>
      <form
        noValidate
        className="px-10 bg-principal w-96 py-5 h-fit dark:bg-principal-dark rounded-lg shadow-lg shadow-gray-300 flex justify-center items-center flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className=" text-white font-black text-2xl">Confirm</h2>
        <h2 className=" text-white font-semibold">
          A code has been sent to your email address, enter it to confirm your
          account.
        </h2>
        <div className="w-full">
          <label
            htmlFor="code"
            className="block font-bold text-white capitalize"
          >
            Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="Code..."
            className="w-full px-1 py-2 border rounded-lg bg-gray-50"
            value={confirm}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white capitalize transition-colors rounded-lg bg-principal-dark dark:bg-principal hover:cursor-pointer hover:bg-sky-800"
        >
          Send
        </button>
      </form>
    </main>
  );
};

export default ConfirmAccount;
