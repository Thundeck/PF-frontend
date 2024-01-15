import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../redux/actions";

const initialState = { profile_img: "", name: "" };
const UserDashboard = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, profile_img: reader.result });
    };
  };

  const handleChange = () => {
    setFormData({ ...formData, name });
    setEditName(true);
    setName("");
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(currentUser._id, formData));
  };

  const diferentThanUser = (obj) => {
    if (
      obj.name !== currentUser.name &&
      obj.profile_img !== currentUser.profile_img
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex justify-start items-center flex-col p-12">
      <div className="w-[80%] h-full flex justify-start items-end border-b-2 border-principal dark:border-principal-dark relative">
        {formData !== initialState && diferentThanUser(formData) && (
          <div>
            <button
              onClick={() => setFormData(initialState)}
              className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-12 w-12 text-white font-bold py-2 px-2 rounded-full absolute top-0  right-0 flex justify-center items-center"
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button
              onClick={() => handleUpdateUser()}
              className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-fit w-fit text-white font-bold py-2.5 px-2 rounded-full absolute bottom-2  right-0 flex justify-center items-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i> Update
            </button>
          </div>
        )}
        <div className="w-fit h-fit relative">
          <label
            htmlFor="file-input-profile"
            className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-12 w-12 text-white font-bold py-2 px-2 rounded-full absolute bottom-2  right-0 flex justify-center items-center"
          >
            <i className="fa-solid fa-pen"></i>
          </label>
          <input
            className="w-0"
            type="file"
            id="file-input-profile"
            onChange={handleChangeImage}
            style={{ display: "none" }}
          />
          <img
            src={formData.profile_img || currentUser.profile_img}
            className="w-36 h-36 mb-3 border object-cover rounded-full"
            alt="profile"
            border="0"
          />
        </div>

        <div className="w-fit pl-3 min-h-12 flex justify-center items-center flex-row-reverse gap-5 mb-3">
          {editName ? (
            <button
              htmlFor="input-change-name"
              onClick={() => setEditName(false)}
              className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-12 w-12 text-white font-bold py-2 px-2 rounded-full  flex justify-center items-center"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          ) : (
            <div className="flex justify-center items-center flex-row gap-5">
              <button
                htmlFor="input-change-name"
                onClick={handleChange}
                className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-12 w-12 text-white font-bold py-2 px-2 rounded-full  flex justify-center items-center"
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                htmlFor="input-change-name"
                onClick={() => {
                  setEditName(true);
                  setName("");
                }}
                className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 h-12 w-12 text-white font-bold py-2 px-2 rounded-full  flex justify-center items-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}
          {editName ? (
            <h1 className=" text-3xl font-bold text-black">
              {formData.name.length ? formData.name : currentUser.name}
            </h1>
          ) : (
            <input
              id="input-change-name"
              className="text-3xl font-bold text-gray-800 rounded-md pl-3 max-w-60"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center flex-col mt-10 gap-5">
        <Link
          className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 text-white font-bold py-2 px-4 rounded w-[80%] min-h-20 flex justify-between items-center"
          to="/"
        >
          <p>New Reservation</p>
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </Link>
        <Link
          className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 text-white font-bold py-2 px-4 rounded w-[80%] min-h-20 flex justify-between items-center"
          to="/reservations"
        >
          <p>My Reservations</p>
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </Link>
        <Link
          className="bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded w-[80%] min-h-20 flex justify-between items-center"
          to="/favorites"
        >
          <p>My Favorites</p>
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </Link>
        {currentUser.rol === "client" && (
          <Link
            className="bg-principal-dark hover:bg-principal dark:bg-principal dark:hover:bg-principal/50 text-white font-bold py-2 px-4 rounded w-[80%] min-h-20 flex justify-between items-center"
            to="/create"
          >
            Create Complex
            <i className="fa-solid fa-chevron-right text-2xl"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
