import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  createTypeCourt,
  getAllComplex,
  getAllCourt,
  getAllEvent,
  getAllServices,
  getAllShift,
  getAllTypeCourt,
  getAllUser,
} from "../redux/actions";
import Table from "./Table";

const initalState = {
  name: "",
  icon: "",
};

const DeveloperDashBoard = () => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.allUsers);
  const complexes = useSelector((state) => state.allComplexs);
  //const courts = useSelector((state) => state.courts); comming soon
  const events = useSelector((state) => state.events);
  const reviews = useSelector((state) => state.reviews);
  const services = useSelector((state) => state.services);
  const typecourts = useSelector((state) => state.typecourts);
  //const shifts = useSelector((state) => state.shifts); comming soon
  const [sport, setSport] = useState(initalState);
  const [service, setService] = useState(initalState);
  const [currentPage, setCurrentPage] = useState("clients");

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllComplex());
    dispatch(getAllCourt());
    dispatch(getAllEvent());
    dispatch(getAllServices());
    dispatch(getAllShift());
    dispatch(getAllTypeCourt());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "sport") {
      setSport({
        ...sport,
        name: e.target.value,
      });
    } else {
      setService({ ...service, name: e.target.value });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    previewFile(file, e.target.name);
  };

  const previewFile = (file, e) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (e === "sport") {
        setSport({
          ...sport,
          icon: reader.result,
        });
      } else {
        setService({
          ...service,
          icon: reader.result,
        });
      }
    };
  };

  const handleSubmitSport = (e) => {
    e.preventDefault();
    createTypeCourt(sport);
    setSport(initalState);
  };

  const handleSubmitService = (e) => {
    e.preventDefault();
    createService(service);
    setService(initalState);
  };

  return (
    <div className="flex flex-col w-screen pt-5 px-10 h-fit gap-10">
      <div className="flex flex-row flex-wrap shadow-lg rounded-lg p-4 gap-x-5">
        <h3 className="w-full text-xl text-principal dark:text-principal-dark border-b border-principal">
          Creation Area
        </h3>
        <form
          onSubmit={(e) => handleSubmitSport(e)}
          className="grid grid-cols-2 gap-y-5 w-fit px-5 py-10 mt-10 bg-principal rounded-lg dark:bg-principal-dark"
        >
          <div className="mb-6 text-3xl col-span-2 font-light text-center text-gray-800 dark:text-white">
            Create Sports
          </div>

          <input
            type="text"
            className="flex-1 w-full px-4 py-2 text-base col-span-2 text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm"
            placeholder="Sport"
            name="sport"
            value={sport.name}
            onChange={(e) => handleChange(e)}
          />

          <div className="col-span-2 relative bg-white overflow-hidden  rounded-lg ">
            <label
              htmlFor="icon-input-sport"
              className="absolute left-0 h-full bg-400 text-grey-500
                mr-5 py-3 px-6 border-0
                text-sm font-medium
                bg-principal/30 text-principal dark:text-principal-dark
                transition-all
                hover:cursor-pointer hover:bg-principal-dark dark:hover:bg-principal
                hover:text-white"
            >
              Sport icon
            </label>
            <input
              id="icon-input-sport"
              type="file"
              name="sport"
              onChange={(e) => handleImage(e)}
              className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-6 file:border-0
              file:text-white file:bg-white
              "
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 col-span-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700  "
          >
            create
          </button>
        </form>

        <form
          onSubmit={(e) => handleSubmitService(e)}
          className="grid grid-cols-2 gap-y-5 w-fit px-5 py-10 mt-10 bg-principal rounded-lg dark:bg-principal-dark"
        >
          <div className="mb-6 col-span-2  text-3xl font-light text-center text-gray-800 dark:text-white">
            Create Service
          </div>

          <input
            type="text"
            className="flex-1 w-full col-span-2 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm"
            placeholder="Service name"
            name="service"
            value={service.name}
            onChange={(e) => handleChange(e)}
          />

          <div className="col-span-2 relative bg-white overflow-hidden  rounded-lg ">
            <label
              htmlFor="icon-input-service"
              className="absolute left-0 h-full bg-400 text-grey-500
                mr-5 py-3 px-6 border-0
                text-sm font-medium
                bg-principal/30 text-principal dark:text-principal-dark
                transition-all
                hover:cursor-pointer hover:bg-principal-dark dark:hover:bg-principal
                hover:text-white"
            >
              Service icon
            </label>
            <input
              id="icon-input-service"
              type="file"
              name="service"
              onChange={(e) => handleImage(e)}
              className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-6 file:border-0
              file:text-white file:bg-white
              "
            />
          </div>

          <button
            type="submit"
            className="w-full col-span-2 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700  "
          >
            create
          </button>
        </form>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-fit border-b border-principal-dark dark:border-principal flex justify-start items-end flex-row gap-0.5">
          {[
            "clients",
            "complexes",
            "events",
            "reviews",
            "services",
            "typecourts",
          ].map((e, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(e)}
              className={` capitalize text-white font-semibold rounded-t-lg ${
                e === currentPage
                  ? "py-2.5 px-5 bg-principal-dark dark:bg-principal"
                  : "bg-principal dark:bg-principal-dark  py-2 px-4"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        {currentPage === "clients" && (
          <Table array={clients} typeTable={currentPage} />
        )}
        {currentPage === "complexes" && (
          <Table array={complexes} typeTable={currentPage} />
        )}
        {currentPage === "events" && (
          <Table array={events} typeTable={currentPage} />
        )}
        {currentPage === "reviews" && (
          <Table array={reviews} typeTable={currentPage} />
        )}
        {currentPage === "services" && (
          <Table array={services} typeTable={currentPage} />
        )}
        {currentPage === "typecourts" && (
          <Table array={typecourts} typeTable={currentPage} />
        )}
      </div>
    </div>
  );
};

export default DeveloperDashBoard;
