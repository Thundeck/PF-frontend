import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../img/BooKingblanco.png";

const UserMenu = ({ userModal, currentUser, resetCurrentUser }) => {
  return (
    <div
      className={`absolute z-[1000] right-2 top-16 lg:right-1 lg:top-20 w-[50%] lg:w-56 bg-principal rounded-md shadow-lg shadow-black dark:bg-principal-dark flex justify-center items-center flex-col ${
        userModal ? "" : "hidden"
      }`}
    >
      <Link
        to="/favorites"
        className="w-full px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
        role="menuitem"
      >
        <span className="flex flex-col">
          <span>Favorites</span>
        </span>
      </Link>
      {currentUser && (
        <Link
          to="/account"
          className="w-full px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
          role="menuitem"
        >
          <span className="flex flex-col">
            <span>Account</span>
          </span>
        </Link>
      )}
      {currentUser ? (
        <Link
          // href="#"
          className="w-full px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
          role="menuitem"
        >
          <span className="flex flex-col">
            <span onClick={resetCurrentUser}>Logout</span>
          </span>
        </Link>
      ) : (
        <Link
          to="/login"
          className="w-full px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
          role="menuitem"
        >
          <span className="flex flex-col">
            <span>Sign in</span>
          </span>
        </Link>
      )}
    </div>
  );
};

const NavBar = () => {
  const [userModal, setUserModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const resetCurrentUser = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="relative h-fit flex justify-between items-center flex-col bg-principal px-8 dark:bg-principal-dark py-2">
      <div className="flex items-center justify-between w-full gap-4">
        <Link className="flex-shrink-0" to="/">
          <img className="h-11" src={logo} alt="BooKing" />
        </Link>

        <div className="hidden lg:flex items-center  justify-end w-full gap-4">
          <Link className=" font-semibold text-white hover:scale-105  " to="/">
            Home
          </Link>
          <Link
            className=" font-semibold text-white hover:scale-105 "
            to="/about"
          >
            About us
          </Link>
          <Link
            className=" font-semibold text-white hover:scale-105  "
            to="/contact-us"
          >
            Contact us
          </Link>
        </div>

        <div className="">
          <button
            onClick={() => setUserModal(!userModal)}
            type="button"
            className="flex items-center justify-center w-full p-2 text-sm font-medium text-gray-700 rounded-full hover:bg-principal-dark dark:hover:bg-principal"
            id="options-menu"
          >
            {currentUser ? (
              <div className="h-11 w-11 border-2 rounded-full border-white">
                <img
                  src={currentUser?.profile_img}
                  alt="userphoto"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            ) : (
              <svg
                width="20"
                fill="currentColor"
                height="20"
                className="text-gray-800"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={`w-full lg:hidden flex justify-center items-center flex-row`}
      >
        <Link
          className="font-medium w-full active:scale-105 text-center active:text-principal-dark dark:active:text-principal py-4 hover:text-gray-300 text-white"
          to="/"
        >
          Home
        </Link>
        <Link
          className=" font-medium w-full active:scale-105 text-center active:text-principal-dark dark:active:text-principal py-4 hover:text-gray-300 text-white"
          to="/about"
        >
          About us
        </Link>
        <Link
          className=" font-medium w-full active:scale-105 text-center active:text-principal-dark dark:active:text-principal py-4 hover:text-gray-300 text-white"
          to="/contact-us"
        >
          Contact us
        </Link>
      </div>
      <UserMenu
        currentUser={currentUser}
        resetCurrentUser={resetCurrentUser}
        userModal={userModal}
        setUserModal={setUserModal}
      />
    </nav>
  );
};

export default NavBar;
