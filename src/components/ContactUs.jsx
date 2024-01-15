import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    complex: "",
    events: "",
    city: "",
    email: "",
    phone: "",
    comments: "",
  });

  const { name, complex, city, email, phone, comments } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col my-16 lg:flex-row justify-center items-center gap-10 w-full">
      <div className="self-center max-w-xl">
        <h2 className="mb-5 text-4xl font-bold text-principal dark:text-principal-dark">
          Do you want to try our app in your events complex?
        </h2>
        <p className="mt-10 text-2xl font-medium">
          We show you the benefits of having an online channel to manage your
          complex that allows users to book online.
        </p>
        <p className="mt-10 text-2xl font-medium ">
          Leave us your contact details so we can get in touch with you.
        </p>
      </div>

      <form
        className="flex self-center w-full max-w-sm space-x-3 border flex-col px-5 py-10  mt-10 bg-principal dark:bg-principal-dark rounded-lg "
        onSubmit={handleFormSubmit}
      >
        <div className="mb-6 text-3xl text-center text-white ">
          Contact us !
        </div>
        <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              id="contact-form-name"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent border-gray-300 rounded-lg shadow-sm "
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              id="contact-form-email"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent border-gray-300 rounded-lg shadow-sm "
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              id="contact-form-name"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent border-gray-300 rounded-lg shadow-sm "
              placeholder="Complex"
              value={complex}
              name="complex"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <input
              type="number"
              id="contact-form-phone"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent border-gray-300 rounded-lg shadow-sm "
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-span-2 lg:col-span-2">
            <input
              type="text"
              id="contact-form-city"
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-transparent border-gray-300 rounded-lg shadow-sm "
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-span-2">
            <label className="text-gray-700" htmlFor="name">
              <textarea
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-200 border border-gray-300 rounded-lg "
                id="comment"
                placeholder="Enter your comment"
                name="comments"
                rows="5"
                cols="40"
                value={comments}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full col-span-2 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-principal-dark dark:bg-principal rounded-lg shadow-md hover:bg-indigo-500/70  "
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
