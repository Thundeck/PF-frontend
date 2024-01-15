import axios from "axios";
import {
  NotificationFailure,
  NotificationSuccess,
} from "../../utils/tostify.ts";
import * as actions from "../actionTypes";

import clientAxios from "../../config/clientAxios";

//CRUD COMPLEX
export const getAllComplex = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/complex/all");
    dispatch({
      type: actions.GET_ALL_COMPLEX,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getMostLiked = async (setRanking) => {
  try {
    const { data } = await axios.get("http://localhost:3001/complex/ranking");
    if (data) setRanking(data);
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getAllComplexCity = (form) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/complex/all-city",
      form
    );
    dispatch({
      type: actions.SEARCH_BY_CITY,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getCityUbi = async (id, setPosition) => {
  try {
    const { data } = await axios.get(
      `https://apis.datos.gob.ar/georef/api/localidades-censales?id=${id}&campos=centroide`
    );
    setPosition({
      lat: data.localidades_censales[0].centroide.lat,
      lng: data.localidades_censales[0].centroide.lon,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getComplexDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/complex/details/${id}`
    );

    dispatch({
      type: actions.GET_COMPLEX_DETAIL,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createComplex = async (complex, navigate) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/complex/create",
      complex
    );
    navigate("/account");
    return NotificationSuccess(data, "top-right");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateComplex = async (id, complex) => {
  try {
    const create = await axios.put(
      `http://localhost:3001/complex/update/${id}`,
      complex
    );

    return { create, msg: "complex updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteComplex = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/complex/delete/${id}`);

    return { create, msg: "complex deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//
//CRUD CLIENT/USER

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/client/all");

    dispatch({
      type: actions.GET_ALL_USER,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    const find = await axios.get(`http://localhost:3001/client/${id}`);

    dispatch({
      type: actions.GET_USER_DETAIL,
      payload: find.data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getUserComplex = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await axios.get(
      `http://localhost:3001/complex/user-complex/${id}`
    );

    console.log(data);

    dispatch({
      type: actions.GET_USER_COMPLEX,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createUser = async (formData, navigate) => {
  try {
    const { data } = await clientAxios.post("/client/create", formData);
    if (data) NotificationSuccess(data.msg, "top-right");
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/confirm-account");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const confirmAccount = async (token, navigate) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/client/confirm-account/${token}`
    );
    if (data) NotificationSuccess(data.msg, "top-right");
    if (data) navigate("/login");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/client/update/${id}`,
      user
    );

    dispatch({
      type: actions.SET_CURRENT_USER,
      payload: data,
    });
    NotificationSuccess("User updated succesfully", "top-right");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteUser = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/client/delete/${id}`);

    return { create, msg: "user deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//CRUD COURT
export const getAllCourt = () => async (dispatch) => {
  try {
    const api = await axios.get("http://localhost:3001/court/all");
    dispatch({
      type: actions.GET_ALL_COURT,
      payload: api.data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getCourtDetails = async (id, setCourt) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/court/${id}`);

    if (data) setCourt(data);
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createCourt = async (court) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/court/create",
      court
    );
    if (data) NotificationSuccess("Court created succesfully", "top-right");

    return;
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};
export const updateCourt = (id, { numberCourt, description, typeCourt }) => {
  const court = {
    numberCourt,
    description,
    typeCourt,
  };
  try {
    const create = axios.put(`http://localhost:3001/court/update/${id}`, court);

    return { create, msg: "court updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteCourt = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/court/delete/${id}`);

    return { create, msg: "court deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//CRUD SHIFT
export const getAllShift = () => async (dispatch) => {
  try {
    const api = await axios.get("http://localhost:3001/shift/all");
    dispatch({
      type: actions.GET_ALL_SHIFT,
      payload: api.data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getUserShifts = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/shift/user-shifts/${id}`
    );
    dispatch({
      type: actions.GET_USER_SHIFT,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getShiftDetail = (id) => async (dispatch) => {
  try {
    const find = await axios.get(`http://localhost:3001/shift/${id}`);

    dispatch({
      type: actions.GET_SHIFT_DETAIL,
      payload: find,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createShift = (date, clientId, courtId, complexId) => {
  const Shift = { date, clientId, courtId, complexId };
  try {
    const { data } = axios.post(`http://localhost:3001/shift/create`, Shift);
    if (data) {
      return NotificationSuccess("Shift created succesfully", "top-right");
    }
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateShift = (id, { date, time_start }) => {
  const Shift = { date, time_start };
  try {
    const update = axios.put(`http://localhost:3001/shift/update/${id}`, Shift);

    return { update, msg: "Shift updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteShift = (id) => {
  try {
    const deleted = axios.post(`http://localhost:3001/shift/delete/${id}`);

    return { deleted, msg: "Shift deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getAvailableShifts = async (date, courtId, timesArr, setTimes) => {
  const body = {
    date: date
      .toString()
      .split(" ")
      .slice(0, 4)
      .join("-"),
    courtId,
    timesArr,
  };

  try {
    const { data } = await axios.post(
      `http://localhost:3001/shift/complex-shift-date`,
      body
    );

    if (data) setTimes(data);
    return;
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//CRUD TYPECOUR
export const getAllTypeCourt = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/typecourt/all");
    dispatch({
      type: actions.GET_ALL_TYPECOURT,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getTypeCourtDetails = (id) => async (dispatch) => {
  try {
    const find = await axios.get(`http://localhost:3001/typecourt/${id}`);

    dispatch({
      type: actions.GET_TYPECOURT_DETAIL,
      payload: find,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createTypeCourt = async (typecourt) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/typecourt/create",
      typecourt
    );
    if (data)
      return NotificationSuccess("Typecourt created succesfully", "top-right");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateTypeCourt = (id, { description, icon }) => {
  const typecourt = { description, icon };
  try {
    const create = axios.put(
      `http://localhost:3001/typecourt/update/${id}`,
      typecourt
    );
    return { create, msg: "typecourt updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteTypeCourt = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/typecourt/delete/${id}`);
    return { create, msg: "typecourt deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//CRUD EVENT
export const getAllEvent = () => async (dispatch) => {
  try {
    const api = await axios.get("http://localhost:3001/event/all");
    dispatch({
      type: actions.GET_ALL_EVENT,
      payload: api.data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getEventDetails = (id) => async (dispatch) => {
  try {
    const find = await axios.get(`http://localhost:3001/event/${id}`);

    dispatch({
      type: actions.GET_EVENT_DETAIL,
      payload: find,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createEvent = ({ description, icon }) => {
  const typecourt = { description, icon };
  try {
    const create = axios.get("http://localhost:3001/event/create", typecourt);

    return { create, msg: "event created" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateEvent = (id, { description, icon }) => {
  const typecourt = { description, icon };
  try {
    const create = axios.put(
      `http://localhost:3001/event/update/${id}`,
      typecourt
    );

    return { create, msg: "event updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteEvent = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/event/delete/${id}`);

    return { create, msg: "event deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

// FILTROS Y ORDENAMIENTOS
export const filterSports = (id, arr) => (dispatch) => {
  const filtered = arr.filter((item) =>
    item.typeCourts.some((sport) => sport._id === id)
  );
  dispatch({
    type: actions.FILTER_BY_SPORT,
    payload: filtered,
  });
};

export const filterService = (id, arr) => (dispatch) => {
  const filtered = arr.filter((item) =>
    item.services.some((serv) => serv._id === id)
  );
  console.log(id);
  console.log(filtered);
  console.log(arr);
  dispatch({
    type: actions.FILTER_BY_SERVICE,
    payload: filtered,
  });
};

export const orderAZ = (array) => (dispatch) => {
  let arr = array;

  let ordered = arr.sort((actual, siguiente) => {
    if (actual.name > siguiente.name) return 1;
    if (actual.name < siguiente.name) return -1;
    return 0;
  });

  dispatch({
    type: actions.FILTER_BY_AZ,
    payload: [...ordered],
  });
};

export const orderZA = (array) => (dispatch) => {
  const order = array.sort((a, b) => b.name.localeCompare(a.name)); // Ordena de la Z a la A

  const reversed = order.reverse();

  dispatch({
    type: actions.FILTER_BY_ZA,
    payload: [...reversed],
  });
};

export const orderFav = (array) => (dispatch) => {
  let ordered = array.sort((a, b) => a.rating - b.rating);

  dispatch({
    type: actions.FILTER_BY_AZ,
    payload: [...ordered],
  });
};

export const removeFilters = (array) => {
  return {
    type: actions.REMOVE_FILTERS,
    payload: array,
  };
};

//CRUD REVIEWS Review
export const getAllReview = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/reviews/all");

    dispatch({
      type: actions.GET_ALL_REVIEW,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getReviewDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/reviews/${id}`);

    dispatch({
      type: actions.GET_REVIEW_DETAIL,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const mercadoPagoPayment = async (
  name,
  price,
  image,
  setPreferenceId
) => {
  const body = {
    name,
    image,
    price: parseInt(price),
  };
  try {
    const { data } = await axios.post("http://localhost:3001/payment", body);

    return setPreferenceId(data.id);
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createReview = async (review, modalClose) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/reviews/create",
      review
    );
    if (data) {
      NotificationSuccess("comment successfully published", "top-right");
      modalClose();
    }
    return;
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateReview = (id, review) => {
  try {
    const create = axios.put(
      `http://localhost:3001/reviews/update/${id}`,
      review
    );

    return { create, msg: "review updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteReview = (id) => {
  try {
    const create = axios.post(`http://localhost:3001/reviews/delete/${id}`);

    return { create, msg: "review deleted" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

//OTROS
export const getAllServices = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/service/all");
    dispatch({
      type: actions.GET_ALL_SERVICES,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const createService = async (service) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/service/create",
      service
    );

    if (data)
      return NotificationSuccess("Service created succesfully", "top-right");
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const addFavorite = (client, complex) => async (dispatch) => {
  //ver como cambiarlo para mejorar, considerar crear otra funcion
  try {
    const { data } = await axios.put(
      `http://localhost:3001/client/favorite/${client}/${complex}`
    );

    console.log("esto es add", data);

    dispatch({
      type: actions.ADD_FAVORITE,
      payload: data,
    });
    if (data)
      return NotificationSuccess(
        "Complex added succesfully to favorites",
        "top-right"
      );
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const deleteFavorite = (client, complex) => async (dispatch) => {
  //ver como cambiarlo para mejorar, considerar crear otra funcion
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/client/favorite/${client}/${complex}`
    );
    console.log("esto es delete", data);
    dispatch({
      type: actions.ADD_FAVORITE,
      payload: data,
    });
    if (data)
      return NotificationSuccess(
        "Complex deleted succesfully from favorites",
        "top-right"
      );
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const addFavoriteLocalStorage = (arr) => {
  //ver como cambiarlo para mejorar, considerar crear otra funcion
  return {
    type: actions.FAV_LOCAL,
    payload: arr,
  };
};

export const createFavorite = async (id) => {
  try {
    const send = await axios.post(
      `http://localhost:3001/favorites/create/${id}`
    );
    return { send, msg: "complex array created" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const updateFavorite = (id, obj, bool) => async (dispatch) => {
  try {
    const send = await axios.put(
      `http://localhost:3001/client/update/${id}`,
      obj
    );

    if (bool && send) {
      dispatch({
        type: actions.UPDATE_FAVORITES,
        payload: obj.favorites,
      });
    } else {
      dispatch({
        type: actions.UPDATE_FAVORITES_DEL,
        payload: obj.favorites,
      });
    }
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getFavorite = () => async (dispatch) => {
  const favorites = await axios.get("url");

  dispatch({
    type: actions.GET_FAVORITES,
    payload: favorites,
  });
};

//LOGIN

export const loginUser = (dataLog) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/client/login`,
      dataLog
    );

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        token: data.token,
        _id: data._id,
        email: data.email,
        isActive: data.isActive,
        deleted: data.deleted,
        rol: data.rol,
        profile_img: data.profile_img,
      })
    );

    dispatch({
      type: actions.SET_CURRENT_USER,
      payload: data,
    });
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const logoutUser = () => {
  localStorage.clear();
  return {
    type: actions.LOGOUT_CURRENT_USER,
    payload: null,
  };
};

export const checkUserSession = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    return {
      type: actions.LOGOUT_CURRENT_USER,
      payload: null,
    };
  } else {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return async (dispatch) => {
      try {
        const { data } = await clientAxios("client/profile", config);
        return dispatch({
          type: actions.SET_CURRENT_USER,
          payload: data,
        });
      } catch (error) {
        NotificationFailure(error.message, "top-right");
      }
    };
  }
};

// DEVELOPER FUNCTIONS
export const changeStatusComplex = async (id, change) => {
  try {
    const update = await axios.put(
      `http://localhost:3001/complex/update/${id}`,
      change
    );

    return { update, msg: "complex updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getAllProvinces = async (setProvinces) => {
  try {
    const { data } = await axios.get(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id"
    );

    const order = data.provincias.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );

    setProvinces(order);
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const getAllLocalities = async (city, setLocalities) => {
  try {
    const { data } = await axios.get(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${city}&campos=nombre&max=1000`
    );

    const order = data.localidades.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );

    setLocalities(order);
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};

export const changeStatusUser = async (id, change) => {
  try {
    const update = await axios.put(
      `http://localhost:3001/client/update/${id}`,
      change
    );

    return { update, msg: "user updated" };
  } catch (error) {
    NotificationFailure(error.message, "top-right");
  }
};
