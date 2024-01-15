import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import LayOut from "./components/LayOut";
// import SearchCity from "./components/SearchCity";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Account from "./components/Account";
import ComplexDetails from "./components/ComplexDetails";
import ComplexFavorite from "./components/ComplexFavorite";
import ConfirmAccount from "./components/ConfirmAccount";
import CreateCourt from "./components/CreateCourt";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import NewPassword from "./components/NewPassword";
import Register from "./components/Register";
import ReservationCourt from "./components/ReservationCourt";
import Reservations from "./components/Reservations";
import ComplexContainer from "./components/complexContainer";
import ComplexForm from "./components/complexform";
import { checkUserSession } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_KEY_GOOGLE}>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="account" element={<Account />} />
          <Route path="favorites" element={<ComplexFavorite />} />
          <Route path="*" element={<Error404 />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
          <Route path="confirm-account" element={<ConfirmAccount />} />
          <Route path="search/:province/:city" element={<ComplexContainer />} />
          <Route path="create" element={<ComplexForm />} />
          <Route path="search/:id" element={<ComplexDetails />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="createcourt/:id" element={<CreateCourt />} />
          <Route
            path="reservation/:courtId/:complexId"
            element={<ReservationCourt />}
          />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
