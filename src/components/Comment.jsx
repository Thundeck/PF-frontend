import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ rev }) => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div
      className={`w-full h-fit flex ${
        currentUser?._id === rev?.client?._id ? "justify-end" : "justify-start"
      } `}
    >
      <div
        className={`w-fit ${
          currentUser?._id === rev?.client?._id
            ? "bg-principal"
            : "bg-principal/80"
        } p-2 rounded-lg min-w-52`}
      >
        <div className="flex justify-between flex-row ">
          <div className="flex flex-row items-center gap-1">
            <img
              alt="profile"
              className="h-5 rounded-full"
              src={
                rev?.client?.profile_img ||
                "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              }
            />
            <p className="font-semibold text-sm text-black capitalize">
              {currentUser?._id === rev?.client?._id
                ? "you"
                : rev?.client?.name}
            </p>
          </div>

          <p className="  text-white flex justify-center items-center gap-1">
            <i className="fa-solid fa-star"></i>
            {rev.rating}
          </p>
        </div>

        <p className="ml-2">{rev.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
