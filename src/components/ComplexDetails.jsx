import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import noCourts from "../img/football-team-two-color.svg";
import noEvents from "../img/undraw_fans_re_cri3.svg";
import { getComplexDetails } from "../redux/actions";
import { groupDays, groupHours } from "../utils/functions.js";
import { NotificationInfo } from "../utils/tostify.ts";
import Comment from "./Comment";
import CreateCourt from "./CreateCourt.jsx";
import MapView from "./MapView.jsx";
import { Modal } from "./Modal.jsx";
import CourtCard from "./courtCard";
import { useModal } from "./hooks/useModal.js";

const ComplexDetails = () => {
  const dispatch = useDispatch();
  const complex = useSelector((state) => state.detail);
  const currentUser = useSelector((state) => state.currentUser);

  const { id } = useParams();

  const [update, setUpdate] = useState({
    images: null,
    name: null,
  });

  useEffect(() => {
    dispatch(getComplexDetails(id));
  }, [dispatch, id]);

  //UPDATE
  const [name, setName] = useState(true);
  const [isCourtOpen, modalOpenCourt, modalCloseCourt] = useModal(false);
  // const [isEventOpen, modalOpenEvent, modalCloseEvent] = useModal(false);

  const changeInput = () => {
    let input = document.getElementById("file");
    input.click();

    input.onchange = () => {
      let file = input.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        localStorage.setItem("imagen", reader.result);
        setUpdate({ ...update, images: reader.result });
      };
    };
  };

  const changeName = () => {
    setName(!name);
  };

  const handleChangeName = (e) => {
    setUpdate({ ...update, name: e.target.value });
  };

  // const handleUpdate = () => {
  //   updateComplex(id, {
  //     logo: update.images ? update.images : complex.logo, WORKING ON IT
  //     name: update.name ? update.name : complex.name,
  //   });
  // };

  const find = currentUser?.complexs?.find((e) => e?._id === id);

  return (
    <main className=" flex flex-col mt-4 justify-center items-center w-full  px-10">
      <section className="relative w-full h-fit max-h-96 max-w-full overflow-hidden rounded-lg shadow-lg shadow-gray-600">
        <img
          className="object-cover w-full h-full "
          src={
            complex.imgs?.[0] || //poner botones para pasar de foto con un paginado en la aprte inferios de la imagen
            "https://images-platform.99static.com//_2gq7dvYv9xtbqA9fP3AlbTZ-zM=/50x0:1826x1776/fit-in/590x590/projects-files/32/3275/327556/942cbbbc-6c3a-4370-988b-8a016293b91d.jpg"
          }
          alt={complex?.name}
        />

        {currentUser?.rol === "owner" && find && (
          <button
            onClick={changeInput}
            className="absolute bottom-2 right-2 lg:top-3 lg:right-5  w-11 h-11 ml-1 text-base font-semibold text-center text-white transition duration-200 ease-in bg-principal dark:bg-principal-dark rounded-full shadow-md hover:bg-principal-dark dark:hover:bg-principal "
          >
            <input
              type="file"
              id="file"
              onChange={changeInput}
              style={{ display: "none" }}
            />
            <i className="fa-solid fa-pen" />
          </button>
        )}
      </section>

      <section className="flex flex-row justify-between mt-10 w-full">
        <div className="flex flex-col items-start w-full ">
          <div className="flex flex-row items-center">
            {name ? (
              <p className="mb-5 text-5xl font-bold text-black">
                {complex.name || "No name provided"}
              </p>
            ) : (
              <input
                type="text"
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm "
                value={update.name}
                onChange={(e) => handleChangeName(e)}
              />
            )}
            {currentUser?.rol === "owner" && find && (
              <button
                onClick={changeName}
                className=" w-11 h-11 ml-1 text-base font-semibold text-center text-white transition duration-200 ease-in bg-principal dark:bg-principal-dark rounded-full shadow-md hover:bg-principal-dark dark:hover:bg-principal "
              >
                <i className="fa-solid fa-pen" />
              </button>
            )}
          </div>

          <p className="text-2xl font-bold text-gray-500">
            {[complex?.province, complex?.city, complex.address].join(",")}
          </p>
        </div>

        <div className="flex flex-row justify-center items-center">
          <span className="text-3xl font-semibold">
            {complex?.like?.$numberDecimal || "0.0"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      </section>

      <section className="mt-10 w-full shadow-lg rounded-lg overflow-hidden pb-5 relative">
        <h3 className="text-2xl font-bold text-white bg-principal dark:bg-principal-dark py-3 pl-4">
          Events board
        </h3>
        {complex?.events?.length ? (
          complex.events.map((event) => (
            <article key={event._id}>
              <img src={event.img} alt={event.tittle} />
              <p>Event: {event.tittle}</p>
              <p>Date: {event.date}</p>
              <p>Description: {event.description}</p>
            </article>
          ))
        ) : (
          <p className="min-h-32 flex justify-center items-center flex-col text-gray-400 text-xl font-semibold mt-5">
            {currentUser?.rol === "owner"
              ? "Create events to make yourself known"
              : "This complex doesn't have upcoming events"}
            <img className="h-60" src={noEvents} alt="no-events-available" />
          </p>
        )}
        {currentUser?.rol === "owner" && find && (
          <button
            onClick={() => NotificationInfo("Events comming soon", "top-right")}
            className="absolute top-3 right-4 text-white text-2xl"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </section>

      <section className="mt-10 w-full bg-white shadow-lg rounded-lg overflow-hidden relative pb-5">
        <h3 className="text-2xl font-bold text-white bg-principal dark:bg-principal-dark pl-4 py-3">
          Complex Courts
        </h3>
        <div className="flex justify-center w-full gap-5">
          {complex?.courts?.length ? (
            complex?.courts?.map((court) => (
              <Link
                to={`/reservation/${court?._id}/${complex?._id}`}
                key={court?._id}
              >
                <CourtCard
                  court={court}
                  complexTimes={complex.time_work}
                  complexDays={complex.open_days}
                />
              </Link>
            ))
          ) : (
            <p className="min-h-32 flex justify-center items-center flex-col text-gray-400 text-xl font-semibold mt-5">
              {currentUser?.rol === "owner"
                ? "Create sports courts, rooms for your customers"
                : "No room available"}
              <img className="h-60" src={noCourts} alt="no-courts-available" />
            </p>
          )}
        </div>
        {currentUser?.rol === "owner" && find && (
          <button
            onClick={() => modalOpenCourt()}
            className="absolute top-3 right-4 text-white text-2xl"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
        <Modal isOpen={isCourtOpen} modalClose={modalCloseCourt}>
          <CreateCourt complexId={id} />
        </Modal>
      </section>

      <section className="my-10 w-full shadow-lg rounded-lg overflow-hidden bg-white">
        <h3 className="text-2xl font-bold bg-principal dark:bg-principal-dark py-3 pl-4 text-white">
          Visit us
        </h3>

        <div className="flex flex-col my-10 flex-nowrap md:flex-row px-5">
          {complex?.lat && complex?.lng && (
            <MapView
              complexes={[complex]}
              position={{ lat: complex?.lat, lng: complex?.lng }}
              height="500px"
              width="100%"
            />
          )}

          <div className="flex flex-col gap-5 w-5/6 ">
            <div className=" ml-5 shadow-xl rounded-lg overflow-hidden">
              <h4 className="py-2 font-bold bg-principal dark:bg-principal-dark pl-4 text-white">
                Location
              </h4>
              <p className="my-4 pl-4">
                {[complex?.province, complex?.city, complex.address].join(",")}
              </p>
            </div>
            <div className=" ml-5 shadow-xl rounded-lg overflow-hidden">
              <h4 className="py-2 font-bold bg-principal dark:bg-principal-dark pl-4 text-white">
                Open
              </h4>
              {complex?.open_days?.length && complex.time_work.length ? (
                <p className="flex justify-center items-start flex-col p-4">
                  <p>Days: {groupDays(complex.open_days)}</p>
                  <p>Schedules: {groupHours(complex.time_work)}</p>
                </p>
              ) : (
                <p className="my-4 p-4">No config found for this complex</p>
              )}
            </div>
            <div className=" ml-5 shadow-xl rounded-lg overflow-hidden">
              <h4 className="py-2 font-bold bg-principal dark:bg-principal-dark pl-4 text-white">
                Services
              </h4>
              {complex?.services?.length ? (
                complex?.services?.map((service) => (
                  <p className="my-5 flex justify-start items-center flex-row gap-3 capitalize px-4">
                    <img
                      className="max-w-8 "
                      src={service.icon}
                      alt={service.name}
                    />
                    {service.name}
                  </p>
                ))
              ) : (
                <p className="my-4 p-4">No services specified</p>
              )}
            </div>
            <div className=" ml-5 shadow-xl rounded-lg overflow-hidden">
              <h4 className="py-2 font-bold bg-principal dark:bg-principal-dark pl-4 text-white">
                Type of Courts
              </h4>
              {complex?.typeCourts?.length ? (
                complex.typeCourts.map((typeCourts) => (
                  <p className="my-5 p-4">{typeCourts.name}</p>
                ))
              ) : (
                <p className="my-4 p-4">No type courts specified</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center items-center flex-col">
        <h3 className="flex flex-col items-center justify-center text-2xl  font-bold text-principal">
          Comments
        </h3>
        <div className="flex flex-col gap-4 w-2/3 bg-white h-80 p-4 rounded-lg">
          {complex?.reviews?.map((rev) => (
            <Comment rev={rev} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ComplexDetails;
