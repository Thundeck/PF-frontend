import React, { useState } from "react";
import { createReview } from "../redux/actions";

const Review = ({ complex, client, modalClose, complexName }) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
    client,
    complex,
  });

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateReview = (e) => {
    e.preventDefault();
    createReview(review, modalClose);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-white max-w-96 m-auto mt-8 p-5 rounded-lg">
      <h2 className="text-principal text-2xl font-bold">
        Feedback to {complexName}
      </h2>
      <p className="text-center text-gray-500">
        Leave a review for the owner to read your recommendations or just to
        show your appreciation.
      </p>
      <form
        onSubmit={handleCreateReview}
        className="flex flex-col relative items-end justify-center"
      >
        <div className="w-full flex justify-center items-center flex-col">
          <label>How was your experience?</label>
          <div className="flex flex-row items-center justify-center">
            {[...Array(5)].map((e, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    hidden={true}
                    value={ratingValue}
                    onClick={(e) => handleChange(e)}
                  />
                  <p
                    className={
                      ratingValue <= review.rating
                        ? "text-3xl mb-2 text-yellow-400"
                        : "text-3xl mb-2 text-gray-400"
                    }
                  >
                    <i className="fa-solid fa-star"></i>
                  </p>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start justify-center w-full">
          <label>Comment:</label>
          <textarea
            name="comment"
            id=""
            cols="40"
            rows="3"
            onChange={handleChange}
            placeholder="Leave your comment"
            className="border border-gray-300 p-2 rounded mb-5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="font-semibold py-2 px-4  text-center text-white transition duration-200 ease-in bg-principal rounded-md shadow-md hover:bg-principal-dark "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Review;
