import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserComplex } from "../redux/actions";

const ItemForOwnerList = ({ complex }) => {
  const handleClick = () => {};
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link to={`/search/${complex._id}`} className="relative block">
              <img
                alt="profil"
                src={
                  complex?.logo ||
                  "https://cdn-icons-png.flaticon.com/512/2782/2782896.png"
                }
                className="w-10 h-10 mx-auto rounded-full object-contain "
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{complex?.name}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {complex?.events?.length ? complex?.events : "No events active"}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {complex?.courts?.length
            ? complex?.courts.map((e) => "Court N°" + e.numberCourt)
            : "No courts created"}
        </p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {complex?.like?.$numberDecimal}
        </p>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span
          className={
            complex.active
              ? "relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
              : "relative inline-block px-3 py-1 font-semibold leading-tight text-red-900"
          }
        >
          <span
            aria-hidden="true"
            className={
              complex.active
                ? "absolute inset-0 bg-green-300 rounded-full opacity-50"
                : "absolute inset-0 bg-red-400 rounded-full opacity-50"
            }
          ></span>
          <span className="relative">
            {complex.active ? "active" : "inactive"}
          </span>
        </span>
      </td>

      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <button
          onClick={() => handleClick()}
          id={complex.id}
          className="text-indigo-600 hover:text-indigo-900"
        >
          {true ? "enable" : "disable"}
        </button>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <button className="text-indigo-600 hover:text-indigo-900">
          delete
        </button>
      </td>
    </tr>
  );
};

const OwnerDashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const userComplexs = useSelector((state) => state.userComplexs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserComplex(currentUser?._id));
  }, [dispatch, currentUser?._id]);

  return (
    <div className="bg-gray-100 container max-w-4xl px-4 mx-auto sm:px-8 py-8">
      <Link
        className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700  "
        to="/create"
      >
        Create complex
      </Link>
      {
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Complex
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Active events
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Courts
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Likes
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    status
                  </th>
                  <th
                    colSpan="2"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    actions
                  </th>
                </tr>
              </thead>
              {!userComplexs?.length ? (
                <tbody className="flex flex-col justify-center text-center items-center">
                  <h2>No hay complejos creados</h2>{" "}
                </tbody>
              ) : (
                <tbody>
                  {userComplexs?.length &&
                    userComplexs?.map((complex, index) => (
                      <ItemForOwnerList
                        array={userComplexs}
                        key={index}
                        complex={complex}
                        typeTable="complex"
                      />
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      }
    </div>
  );
};
export default OwnerDashboard;
