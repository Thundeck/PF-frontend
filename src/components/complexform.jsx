import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createComplex,
  getAllLocalities,
  getAllProvinces,
  getAllServices,
  updateUser,
} from "../redux/actions";
import { groupDays, groupHours } from "../utils/functions.js";
import { NotificationWarning } from "../utils/tostify.ts";
import MapView from "./MapView";
import valComplex from "./valComplex";

const initalState = {
  name: "",
  address: "",
  cuit: "",
  province: "",
  city: "",
  imgs: [],
  logo: "",
  lat: "",
  lng: "",
  website: "",
  services: [],
  open_days: [],
  time_work: [],
};
function ComplexForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const services = useSelector((state) => state.services);
  const [form, setForm] = useState({
    ...initalState,
  });
  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [daysOpen, setDaysOpen] = useState(false);
  const [workingHours, setWorkingHours] = useState(false);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i < 10 ? `0${i}` : `${i}`);
  }

  useEffect(() => {
    getAllProvinces(setProvinces);
    dispatch(getAllServices());
    if (!currentUser) {
      NotificationWarning(
        "it is necessary to be registered to create a complex",
        "top-right"
      );
      navigate("/login");
    }
  }, [dispatch, currentUser, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "cuit") {
      setForm({
        ...form,
        [e.target.name]: e.target.value.trim(),
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const type = file.name.split(".")[1];
    const imageFormat = ["png", "jpg", "jpeg"];
    if (!imageFormat.includes(type)) {
      return NotificationWarning(
        "Only jpg, png and jpeg formats are allowed.",
        "top-right"
      );
    } else {
      previewFile(file, e.target.name);
    }
  };

  const previewFile = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (name === "logo") {
        setForm({
          ...form,
          logo: reader.result,
        });
      } else {
        setForm({
          ...form,
          imgs: [...form.imgs, reader.result],
        });
      }
    };
  };

  const handleProvince = (e) => {
    setForm((prev) => ({ ...prev, province: e.target.value }));
    getAllLocalities(e.target.value, setLocalities);
  };

  const handleTimeWork = (hour) => {
    const inTimeWork = form.time_work.includes(hour);

    let newTimeWork;
    if (!inTimeWork) {
      newTimeWork = [...form.time_work, hour];
    } else {
      newTimeWork = form.time_work.filter((e) => e !== hour);
    }

    newTimeWork.sort((a, b) => parseInt(a) - parseInt(b));

    setForm({
      ...form,
      time_work: newTimeWork,
    });
  };

  const handleDays = (day) => {
    const inOpenDays = form.open_days.includes(day);

    let newOpenDays;
    if (!inOpenDays) {
      newOpenDays = [...form.open_days, day];
    } else {
      newOpenDays = form.open_days.filter((e) => e !== day);
    }

    // Ordena los días de la semana
    newOpenDays.sort((a, b) => days.indexOf(a) - days.indexOf(b));

    setForm({
      ...form,
      open_days: newOpenDays,
    });
  };

  const handleServices = (id) => {
    const inServices = form.services.includes(id);

    if (!inServices) {
      setForm({
        ...form,
        services: [...form.services, id],
      });
    } else {
      const newServiceArr = form.services.filter((e) => e !== id);
      setForm({
        ...form,
        services: newServiceArr,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valComplex(form)) {
      createComplex({ ...form, idUser: currentUser?._id }, navigate);
      currentUser?.rol === "client" &&
        updateUser(currentUser.id, { rol: "owner" });
      setForm(initalState);
    }
  };

  const setPosition = (obj) => {
    setForm((prevForm) => ({ ...prevForm, lat: obj.lat, lng: obj.lng }));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {currentUser?.rol === "client" && (
        <div className="self-center max-w-xl">
          <h1 className="mb-5 text-4xl text-center font-bold text-principal dark:text-principal-dark">
            Do you want to be an owner and manage your complex?
          </h1>
          <p className="mt-10 text-center text-2xl font-medium">
            create your complex and acquire the advantages of an owner, saving
            you from having to manage schedules, payments and annoying shift
            cancellations.
          </p>
        </div>
      )}

      <div className="flex flex-col m-10 lg:flex-row gap-4 bg-white p-4 rounded place-content-between">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex justify-center items-center flex-col w-full max-w-2xl px-5 py-10 mt-10 bg-principal rounded-lg dark:bg-principal-dark"
        >
          <div className="mb-6 text-3xl font-normal text-center text-white">
            Create your complex
          </div>
          <div className="grid max-w-xl grid-cols-2  gap-4 m-auto">
            <p className="mb-6 text-2xl font-light text-center text-white col-span-2">
              complex information
            </p>

            <input
              type="text"
              className=" col-span-2 lg:col-span-1 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm "
              placeholder="Complex name"
              name="name"
              value={form.name}
              onChange={(e) => handleChange(e)}
            />

            <div className="col-span-2 lg:col-span-1 w-full min-h-full text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm  flex justify-center items-center flex-row overflow-hidden">
              <select
                className="w-full h-full"
                onChange={(e) => handleProvince(e)}
              >
                {provinces?.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
              <select
                className="w-full h-full py-2.5"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, city: e.target.value }))
                }
              >
                {localities?.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="col-span-2 lg:col-span-1 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm "
              placeholder="Cuit"
              name="cuit"
              value={form.cuit}
              onChange={(e) => handleChange(e)}
            />

            <input
              type="text"
              id="contact-form-name"
              className="col-span-2 lg:col-span-1 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm "
              placeholder="Complex address"
              name="address"
              value={form.address}
              onChange={(e) => handleChange(e)}
            />

            <div className="col-span-2 flex justify-center items-center gap-4 flex-row min-h-[2.75rem] w-full">
              <div className=" flex h-full justify-center items-center flex-row relative w-full">
                <label
                  onClick={() => setDaysOpen(!daysOpen)}
                  className="text-white w-full max-w-24 h-full rounded-l-lg font-semibold bg-principal-dark dark:bg-principal hover:bg-principal-dark/50 dark:hover:bg-principal/50 flex justify-center items-center"
                  htmlFor="select-for-services"
                >
                  Open days
                </label>
                <p
                  onClick={() => setDaysOpen(!daysOpen)}
                  className=" w-full max-w-[10.5rem] overflow-hidden h-full bg-white flex justify-start items-center pl-5 capitalize rounded-r-lg relative"
                >
                  {form.open_days.length
                    ? form.open_days.length > 1
                      ? form.open_days.join(",")
                      : form.open_days[0]
                    : "open days"}

                  <i
                    className={`fa-solid fa-chevron-up text-gray-500 absolute right-2 z-50 ${
                      daysOpen ? "-rotate-180" : ""
                    }`}
                  ></i>
                </p>
                {daysOpen && (
                  <div
                    id="select-for-services"
                    className="w-full max-w-[24.25rem] h-44 overflow-auto -bottom-[11.1rem] right-0 py-2 z-[1100] bg-white absolute shadow-lg shadow-gray-600 rounded-lg"
                  >
                    {days.map((e, i) => (
                      <button
                        type="button"
                        value={e}
                        key={i}
                        onClick={(e) => handleDays(e.target.value)}
                        className="flex justify-between items-center flex-row hover:bg-gray-300 py-1 px-5 h-fit gap-5 w-full"
                      >
                        <p className="text-black  font-semibold flex flex-row justify-start items-center gap-2 capitalize">
                          {e}
                        </p>

                        {form.open_days.includes(e) && (
                          <i className="fa-solid fa-check h-7 w-7 text-principal flex justify-center items-center text-xl"></i>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className=" flex h-full justify-center items-center flex-row relative w-full">
                <label
                  onClick={() => setWorkingHours(!workingHours)}
                  className="text-white text-center w-full max-w-24 h-full rounded-l-lg font-semibold bg-principal-dark dark:bg-principal hover:bg-principal-dark/50 dark:hover:bg-principal/50 flex justify-center items-center"
                  htmlFor="select-for-services"
                >
                  working hours
                </label>
                <p
                  onClick={() => setWorkingHours(!workingHours)}
                  className=" w-full h-full  max-w-[10.5rem] overflow-hidden bg-white flex justify-start items-center pl-5 capitalize rounded-r-lg relative"
                >
                  {form.time_work.length
                    ? form.time_work.length > 1
                      ? form.time_work.map((e) => `${e}hs`).join(",")
                      : form.time_work[0] + "hs"
                    : "working hours"}

                  <i
                    className={`fa-solid fa-chevron-up text-gray-500 absolute right-2 z-50 ${
                      workingHours ? "-rotate-180" : ""
                    }`}
                  ></i>
                </p>
                {workingHours && (
                  <div
                    id="select-for-services"
                    className="w-full max-w-[24.25rem] h-44 overflow-auto -bottom-[11.1rem] right-0 py-2 z-[1100] bg-white absolute shadow-lg shadow-gray-600 rounded-lg"
                  >
                    {hours?.map((e, i) => (
                      <button
                        type="button"
                        key={i}
                        value={e}
                        onClick={(e) => handleTimeWork(e.target.value)}
                        className="flex justify-between items-center flex-row hover:bg-gray-300 py-1 px-5 h-fit gap-5 w-full"
                      >
                        <p className="text-black  font-semibold flex flex-row justify-start items-center gap-2">
                          {e}hs
                        </p>
                        {form.time_work.includes(e) && (
                          <i className="fa-solid fa-check h-7 w-7 text-principal flex justify-center items-center text-xl"></i>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              className="col-span-2 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm "
              placeholder="Website"
              name="website"
              value={form.website}
              onChange={(e) => handleChange(e)}
            />

            <div className="col-span-2 relative bg-white overflow-hidden  rounded-lg ">
              <label
                htmlFor="logo-input-complex"
                className="absolute left-0 h-full bg-400 text-grey-500
                mr-5 py-3 px-6 border-0
                text-sm font-medium
                bg-principal/30 text-principal dark:text-principal-dark
                transition-all
                hover:cursor-pointer hover:bg-principal-dark dark:hover:bg-principal
                hover:text-white"
              >
                Complex's logo
              </label>
              <input
                id="logo-input-complex"
                type="file"
                name="logo"
                onChange={(e) => handleImage(e)}
                className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-6 file:border-0
              file:text-white file:bg-white
              "
              />
            </div>

            <div className="col-span-2 relative bg-white overflow-hidden  rounded-lg ">
              <label
                htmlFor="imgs-input-complex"
                className="absolute left-0 h-full bg-400 text-grey-500
                mr-5 py-3 px-6 border-0
                text-sm font-medium
                bg-principal/30 text-principal dark:text-principal-dark
                transition-all
                hover:cursor-pointer hover:bg-principal-dark dark:hover:bg-principal
                hover:text-white"
              >
                Complex's imgs
              </label>
              <input
                id="imgs-input-complex"
                type="file"
                name="imgs"
                onChange={(e) => handleImage(e)}
                className="text-sm text-grey-500
              file:mr-5 file:py-3 file:px-6 file:border-0
              file:text-white file:bg-white
              "
              />
            </div>

            <div className="col-span-2 flex min-h-10 justify-center items-center flex-row relative">
              <label
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-white w-full max-w-36 h-full rounded-l-lg font-semibold bg-principal-dark dark:bg-principal hover:bg-principal-dark/50 dark:hover:bg-principal/50 flex justify-center items-center"
                htmlFor="select-for-services"
              >
                Services
              </label>
              <p
                onClick={() => setServicesOpen(!servicesOpen)}
                className=" w-full h-full bg-white flex justify-start items-center pl-10 capitalize rounded-r-lg relative"
              >
                {services
                  .filter((e) => form.services.includes(e._id))
                  .map((e) => e.name)
                  .join(",") || "services"}

                <i
                  className={`fa-solid fa-chevron-up text-gray-500 absolute right-2 z-50 ${
                    servicesOpen ? "-rotate-180" : ""
                  }`}
                ></i>
              </p>
              {servicesOpen && (
                <div
                  id="select-for-services"
                  className="w-full max-w-[24.25rem] h-44 overflow-auto -bottom-[11.1rem] right-0 py-2 z-[1100] bg-white absolute shadow-lg shadow-gray-600 rounded-lg"
                >
                  {services?.map((e, i) => (
                    <button
                      type="button"
                      value={e._id}
                      onClick={(e) => handleServices(e.target.value)}
                      className="flex justify-between items-center flex-row hover:bg-gray-300 py-1 px-5 h-fit gap-5 w-full"
                    >
                      <p
                        className="text-black  font-semibold flex flex-row justify-start items-center gap-2 capitalize"
                        key={i}
                      >
                        <img className="h-7 w-7" src={e.icon} alt={e.name} />
                        {e.name}
                      </p>

                      {form.services.includes(e._id) && (
                        <i className="fa-solid fa-check h-7 w-7 text-principal flex justify-center items-center text-xl"></i>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2 bg-white px-4 py-1 border border-transparent border-gray-300 rounded-lg shadow-sm ">
              <MapView
                setPosition={setPosition}
                position={{ lat: form.lat, lng: form.lng }}
                center={{ lat: form.lat, lng: form.lng }}
                height="300px"
                width="100%"
              />
            </div>

            <div className="col-span-2 text-right">
              {true && (
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-center text-white transition duration-200 ease-in bg-principal-dark dark:bg-principal rounded-lg shadow-md shadow-gray-700 hover:bg-principal-dark dark:hover:bg-principal"
                >
                  create
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="mt-10 lg:mr-40">
          <div className="self-center max-w-xl">
            <h2 className="mb-5 text-4xl text-center font-bold text-principal dark:text-principal-dark">
              Create your complex
            </h2>
            <p className="mt-10 text-center text-2xl font-medium">
              you can see below an example of the same
            </p>
          </div>
          <div className="flex flex-col m-10  justify-around relative">
            <img
              className="max-w-[26rem] rounded-lg shadow-xl mb-10"
              src={
                form.imgs.length > 0
                  ? form.imgs[0]
                  : "https://i.ytimg.com/vi/ZwtCjlru67Y/maxresdefault.jpg"
              }
              alt="complex"
            />
            <div className="absolute left-3 top-52 h-14 w-14 rounded-full overflow-hidden border-2 border-principal-dark flex justify-center items-center">
              {form?.logo ? (
                <img
                  className=" max-h-14 max-w-14"
                  src={form.logo}
                  alt="logo"
                />
              ) : (
                <i className="fa-solid fa-building-user bg-principal h-full w-full flex justify-center items-center text-3xl "></i>
              )}
            </div>

            <div className="flex flex-col mx-5">
              <p className="text-2xl mb-2 py-2">
                {form?.name || "Complex name"}
              </p>
              <p className="text-gray-400 mb-2">
                Address: {form.address || "BooKing 503"}
              </p>
              <p className="text-gray-400 mb-2">
                Days:{" "}
                {form.open_days.length ? groupDays(form.open_days) : "Monday"}
              </p>
              <p className="text-gray-400 mb-2">
                Schedules:{" "}
                {form.time_work.length ? groupHours(form.time_work) : "00hs"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplexForm;
