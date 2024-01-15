import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterService,
  filterSports,
  getAllServices,
  getAllTypeCourt,
  orderAZ,
  orderZA,
} from "../redux/actions";

function Filters({ style }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllTypeCourt());
  }, [dispatch]);
  const complexs = useSelector((state) => state.complexs);
  const sports = useSelector((state) => state.typecourts);
  const services = useSelector((state) => state.services);

  const handleOrder = (e) => {
    e.preventDefault();
    if (e.target.value === "az") {
      dispatch(orderAZ(complexs));
    }
    if (e.target.value === "za") {
      dispatch(orderZA(complexs));
    }
  };
  const handleSports = (e) => {
    e.preventDefault();
    if (e.target.value !== "Sports") {
      dispatch(filterSports(e.target.value, complexs));
    }
  };

  const handleService = (e) => {
    e.preventDefault();
    if (e.target.value !== "Services") {
      dispatch(filterService(e.target.value, complexs));
    }
  };

  return (
    <section
      className={`flex flex-row w-full items-center gap-10 ${style} mb-10 mt-5`}
    >
      <select
        className=" appearance-none rounded-lg border-0 flex justify-center bg-principal dark:bg-principal-dark text-white cursdor-pointer py-2 px-5 hover:bg-principal-dark hover:dark:bg-principal duration-300 relative font-semibold"
        onChange={(e) => handleOrder(e)}
      >
        <option>Order</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      <select
        className=" appearance-none rounded-lg border-0 flex justify-center  bg-principal dark:bg-principal-dark text-white text-center cursdor-pointer py-2 px-5 hover:bg-principal-dark hover:dark:bg-principal duration-300 font-semibold"
        onChange={(e) => handleSports(e)}
      >
        <option>Sports</option>
        {sports?.map((s, index) => {
          return (
            <option key={index} value={s?._id}>
              {s?.name}
            </option>
          );
        })}
      </select>

      <select
        className="appearance-none rounded-lg border-0 flex justify-center bg-principal dark:bg-principal-dark text-white text-center cursdor-pointer py-2 px-5 hover:bg-principal-dark hover:dark:bg-principal duration-300  font-semibold"
        onChange={(e) => handleService(e)}
      >
        <option>Services</option>
        {services?.map((s, index) => {
          return (
            <option key={index} value={s?._id}>
              {s?.name}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default Filters;
