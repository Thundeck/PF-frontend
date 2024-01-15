import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLocalities, getAllProvinces } from "../redux/actions";
import { NotificationWarning } from "../utils/tostify.ts";

const initialState = {
  city: "",
  province: "",
};

const SearchCity = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [localities, setLocalities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    getAllProvinces(setProvinces);
  }, []);

  const handleProvince = (e) => {
    setForm((prev) => ({ ...prev, province: e.target.value }));
    getAllLocalities(e.target.value, setLocalities);
  };

  const handleSearch = () => {
    if (Object.values(form).includes("")) {
      return NotificationWarning("Province and city are required", "top-right");
    } else {
      navigate(`search/${form.province}/${form.city}`);
    }
  };

  return (
    <div className="flex flex-row items-center w-full gap-1">
      <div className="col-span-2 lg:col-span-1 w-fit min-h-10 text-gray-700 placeholder-gray-400 bg-white  rounded-lg shadow-sm  flex justify-center items-center flex-row overflow-hidden">
        <select className="w-full min-h-10" onChange={(e) => handleProvince(e)}>
          {provinces?.map((e, i) => (
            <option key={i} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <select
          className="w-full min-h-10"
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
      <button
        onClick={handleSearch}
        type="button"
        className=" px-6 py-2.5 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 "
      >
        Search
      </button>
    </div>
  );
};

export default SearchCity;
