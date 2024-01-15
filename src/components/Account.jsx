import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OwnerDashboard from "./OwnerDashboard";
import UserDashBoard from "./UserDashboard";
import Develop from "./DeveloperDashBoard";

const Account = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  if (!currentUser) return navigate("/login");

  const dashBoard = () => {
    if (currentUser.rol === "admin") return <Develop />;
    if (currentUser.rol === "owner") return <OwnerDashboard />;
  };

  return (
    <main>
      {currentUser.rol !== "admin" && <UserDashBoard />}
      {dashBoard()}
    </main>
  );
};

export default Account;
