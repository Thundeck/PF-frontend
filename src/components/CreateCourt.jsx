import React, { useEffect } from "react";
import { useState } from "react";
import { createCourt, getAllTypeCourt } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NotificationWarning } from "../utils/tostify.ts";

const CreateCourt = ({ complexId }) => {
  const dispatch = useDispatch();
  const typeCourt = useSelector((state) => state.typecourts);

  const initalState = {
    complexId,
    numberCourt: 0,
    description: "",
    typeCourt: "",
    price: 0.0,
    duration_turn: 1.0,
    img: "",
  };

  const [form, setForm] = useState(initalState);

  useEffect(() => {
    dispatch(getAllTypeCourt());
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePrice = (e) => {
    setForm({
      ...form,
      price: parseFloat(e.target.value),
    });
  };

  const handleChangeSport = (e) => {
    setForm({
      ...form,
      typeCourt: e.target.value,
    });
  };

  const handleChangeDuration = (e) => {
    setForm({
      ...form,
      duration_turn: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).includes("")) {
      NotificationWarning("All fields are required");
      return;
    }
    createCourt(form);
    setForm(initalState);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setForm({
        ...form,
        img: reader.result,
      });
    };
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="grid grid-cols-4 my-8 max-w-[50%] bg-white p-10 rounded-xl gap-3 w-fit m-auto"
    >
      <h1 className="col-span-4 flex justify-center items-center text-3xl font-bold mb-5">
        Create Court
      </h1>
      <div className="flex flex-col col-span-2">
        <label className="mb-2">Number Court</label>
        <input
          type="number"
          name="numberCourt"
          value={form.numberCourt}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded mb-5"
        />
      </div>
      <div className="flex flex-col col-span-2">
        <label className="mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded mb-5"
        />
      </div>
      <div className="col-span-2 flex justify-center items-center flex-row flex-wrap">
        <select
          className=" appearance-none rounded-lg w-full lg: max-w-44 text-center border-0 flex justify-center bg-principal dark:bg-principal-dark text-white cursdor-pointer py-2 px-5 h-fit hover:bg-principal-dark hover:dark:bg-principal duration-300 relative font-semibold"
          onChange={(e) => handleChangeSport(e)}
        >
          <option>Type Court</option>
          {typeCourt?.map((s, index) => {
            return (
              <option key={index} value={s._id}>
                {s?.name}
              </option>
            );
          })}
        </select>
        <select
          className="  appearance-none rounded-lg border-0  w-full lg: max-w-44  flex justify-center bg-principal dark:bg-principal-dark text-white cursdor-pointer py-2 px-5 h-fit text-center hover:bg-principal-dark hover:dark:bg-principal duration-300 relative font-semibold"
          onChange={(e) => handleChangeDuration(e)}
        >
          <option>Duration</option>
          <option value={1}>1hs</option>
          <option value={2}>2hs</option>
          <option value={3}>3hs</option>
        </select>
      </div>

      <div className="col-span-2 flex flex-col">
        <label className="mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={(e) => handleChangePrice(e)}
          className="border border-gray-300 p-2 rounded mb-5"
        />
      </div>

      <label className="col-span-4">
        Image:<br></br>
        <input
          type="file"
          name="logo"
          onChange={(e) => handleImage(e)}
          className="text-sm text-grey-500
              file:mr-5 file:py-2 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-blue-200 file:text-blue-700
              file:transition-all
              hover:file:cursor-pointer hover:file:bg-blue-700
              hover:file:text-white mb-5
              "
        />
      </label>
      <button
        type="submit"
        className="col-span-4 w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-principal dark:bg-principal-dark dark:hover:bg-principal  hover:bg-principal-dark "
      >
        New Court
      </button>
    </form>
  );
};

export default CreateCourt;
