import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import uploadimg from "../img/uploadimg.png";
import { addFavorite } from "../redux/actions";
import { NotificationInfo } from "../utils/tostify.ts";

const ComplexCard = ({ complexDetails }) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const currentUser = useSelector((state) => state.currentUser);

  const favorite = currentUser?.favorites.some(
    (e) => e._id === complexDetails?._id
  );

  const handleFavorite = () => {
    if (currentUser) {
      if (favorite) {
        return NotificationInfo("Already in your favorites", "top-right");
      } else {
        dispatch(addFavorite(currentUser?._id, complexDetails?._id));
      }
    } else {
      return NotificationInfo(
        "log in to save the complexes in favorites",
        "top-right"
      );
    }
  };

  return (
    <div className="flex flex-row gap-5 justify-start min-w-[30rem] max-w-[30rem] w-full relative border-b border-gray-500 my-2 pb-2">
      <img
        className="max-w-36 rounded-full object-cover "
        src={complexDetails?.logo || uploadimg}
        alt={complexDetails?.name}
      />
      <div
        className="flex justify-between items-start flex-col
      "
      >
        <p className="text-2xl font-semibold pr-8">{complexDetails?.name}</p>
        <p className="text-lg text-gray-500">{complexDetails?.address}</p>
        <p className="text-black-400 mb-2 text-xl font-semibold flex justify-center items-center flex-row gap-1">
          <i className="fa-solid fa-star text-yellow-400"></i>
          {complexDetails?.like?.$numberDecimal}
        </p>
        <div className="flex justify-center items-center flex-row gap-5">
          <div className="flex flex-row">
            {complexDetails?.typeCourts?.map((e, i) => (
              <img key={i} className="h-7 w-7" src={e?.icon} alt={e.name} />
            ))}
          </div>
          <div className="flex flex-row">
            {complexDetails?.services?.map((e, i) => (
              <img key={i} className="h-7 w-7" src={e?.icon} alt={e.name} />
            ))}
          </div>
        </div>
      </div>
      <Link
        className=" h-fit absolute right-0 bottom-2
         bg-principal dark:bg-principal-dark py-2 px-5 rounded-lg font-semibold text-white hover:bg-principal-dark hover:dark:bg-principal duration-300"
        to={`/search/${complexDetails?._id}`}
      >
        Ver
      </Link>

      {pathname !== "/favorites" && (
        <button
          onClick={() => handleFavorite()}
          className="self-center  w-12 h-11 ml-1 absolute top-0 right-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-principal dark:bg-principal-dark rounded-lg shadow-md hover:bg-principal-dark dark:hover:bg-principal"
        >
          {favorite ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>
      )}
    </div>
  );
};

export default ComplexCard;
