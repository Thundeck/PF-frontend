import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createShift,
  getAvailableShifts,
  getComplexDetails,
  getCourtDetails,
  mercadoPagoPayment,
} from "../redux/actions/index.js";
import { getShiftsByDuration } from "../utils/functions.js";
import { NotificationInfo } from "../utils/tostify.ts";

const ReservationCourt = () => {
  initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);
  const { courtId, complexId } = useParams();
  const dispatch = useDispatch();

  const startDate = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(startDate.getDate() + 30);
  const [selectedDate, setSelectedDate] = useState("");
  const [court, setCourt] = useState(null);
  const [courtTurnByDuration, setCourtTurnByDuration] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [preferenceId, setPreferenceId] = useState("");
  const complex = useSelector((state) => state.detail);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    getCourtDetails(courtId, setCourt);
    dispatch(getComplexDetails(complexId));
  }, [dispatch, complexId, courtId]);

  useEffect(() => {
    if (court?.duration_turn?.$numberDecimal && complex?.time_work) {
      getShiftsByDuration(
        Number(court?.duration_turn?.$numberDecimal),
        complex?.time_work,
        setCourtTurnByDuration
      );
    }
  }, [court, complex]);

  useEffect(() => {
    if (selectedDate && court?._id) {
      getAvailableShifts(
        selectedDate,
        court?._id,
        courtTurnByDuration,
        setTimes
      );
    }
  }, [selectedDate, court, courtTurnByDuration]);

  //___________________________METODO DE PAGO_____________________________
  const handleConfirmPay = () => {
    mercadoPagoPayment(
      `${complex?.name},court N°${court?.numberCourt}`,
      court?.price?.$numberDecimal,
      court?.img,
      setPreferenceId
    );
    createShift(selectedTime, currentUser?._id, court?._id, complex?._id);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 p-10 gap-x-20">
      <div className="relative flex justify-center items-start flex-col w-full shadow-lg shadow-gray-600 p-2 rounded-lg bg-white">
        <div className="rounded-lg overflow-hidden w-full max-h-52 ">
          <img
            className="w-full h-full object-cover"
            src={complex?.imgs?.[0]}
            alt={complex?.name}
          />
        </div>
        <img
          className="max-w-24 max-h-24 flex justify-center items-center rounded-full absolute left-3 top-[60%]"
          src={complex?.logo}
          alt={complex?.name}
        />
        <h3 className="w-full text-end pr-5 text-principal/90 font-bold text-3xl mt-2">
          {complex?.name}
        </h3>
      </div>
      <div
        className="flex flex-col col-span-1 row-start-2 justify-center items-center mt-10 w-full h-fit gap-5
      rounded-lg shadow-lg shadow-gray-600 bg-white p-5
      "
      >
        <h2 className=" text-2xl w-full text-center font-bold text-principal dark:text-principal-dark">
          Shift Detail
        </h2>
        <div className="flex flex-row items-center font-medium  gap-3">
          <p>Pick date Turn:</p>
          <DatePicker
            selected={selectedDate}
            minDate={startDate}
            maxDate={thirtyDaysFromNow}
            onChange={(date) => setSelectedDate(date)}
            className=" bg-white rounded-lg border border-principal text-base  pl-5 "
          />
        </div>
        <section className="w-full flex justify-center items-start flex-row gap-3">
          <p className="font-medium">Available times:</p>
          <div>
            <p className="bg-gray-100 rounded-lg px-2 py-1">
              {selectedTime
                ? selectedTime.split("-")[4].split(":")[0] + ":00"
                : "selected time"}
            </p>
            <ul className="overflow-auto max-h-36">
              {times.length ? (
                times?.map((time) => (
                  <li
                    onClick={() => {
                      setSelectedTime(time.date);
                      NotificationInfo(time.date, "top-right");
                    }}
                    className="p-2 flex items-center space-x-4 cursor-pointer hover:bg-gray-400/50"
                    key={time.date}
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {`${time.date.split("-")[4].split(":")[0]}:00`}
                    </p>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {time.status ? (
                        <span className=" text-green-600 text-xs font-medium">
                          Available
                        </span>
                      ) : (
                        <span className=" text-red-600 text-xs font-medium  ">
                          No Available
                        </span>
                      )}
                    </div>

                    <i
                      className={`fa-solid fa-check text-gray-400 ${
                        time.date === selectedTime ? "text-principal" : ""
                      }`}
                    ></i>
                  </li>
                ))
              ) : (
                <p className="text-xs text-gray-400">
                  select a date to see the <hr /> available times
                </p>
              )}
            </ul>
          </div>
        </section>
      </div>
      <div className="row-span-2 col-span-1 w-full p-4 shadow-lg rounded-lg shadow-gray-600 bg-white">
        <section className="w-full">
          <div className="w-full max-h-44 overflow-hidden rounded-lg">
            <img
              className="object-cover w-full h-full "
              src={court?.img}
              alt=""
            />
          </div>
          <div className="flex justify-between items-center flex-row flex-wrap mt-5 gap-y-2">
            <p>Court N°{court?.numberCourt}</p>
            <p className="flex justify-center items-center flex-row gap-3 w-fit">
              <img
                className="max-w-7"
                src={court?.typeCourt.icon}
                alt={court?.typeCourt?.name}
              />
              {court?.typeCourt.name}
            </p>
            <p>Price: ${court?.price.$numberDecimal}</p>
            <p>Duration: 0{court?.duration_turn.$numberDecimal}:00hs</p>
            <p>Description: {court?.description}</p>
          </div>
        </section>
        <div className=" flex justify-between items-start flex-col mt-5 border-t border-black py-2 gap-10">
          <div className="w-full">
            <p className="bg-principal w-full py-2 px-4 text-white font-semibold mb-5">
              informacion de pago
            </p>
            <div className="w-full flex justify-between items-center flex-row px-2">
              <p>Shift price</p>
              <p>${court?.price.$numberDecimal}</p>
            </div>
            <div className="w-full flex justify-between items-center flex-row px-2">
              <p>Services used</p>
              <p>comming soon</p>
            </div>
            <div className="w-full flex justify-between items-center flex-row px-2">
              <p>Discount Coupon</p>
              <p>comming soon</p>
            </div>
          </div>
          <div className="border-t border-black flex justify-between flex-col gap-y-5 pt-4 w-full">
            <div className="w-full flex justify-between">
              <p>total amount:</p>
              <p>${court?.price?.$numberDecimal}</p>
            </div>
            <div className="w-full px-20 ">
              {selectedDate && selectedTime ? (
                <button
                  onClick={handleConfirmPay}
                  className=" bg-principal py-2 px-4 rounded-lg text-white font-semibold w-full text-center"
                >
                  Confirm
                </button>
              ) : (
                <p
                  onClick={() =>
                    NotificationInfo(
                      "Select a date and time to confirm payment.",
                      "top-right"
                    )
                  }
                  className="bg-principal py-2 px-4 rounded-lg text-white font-semibold w-full cursor-pointer text-center"
                >
                  Select date and time to confirm payment
                </p>
              )}

              {preferenceId && (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCourt;
