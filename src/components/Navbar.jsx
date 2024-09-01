import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar fixed z-10 bg-primary text-primary-content">
      <div className="containerWrap flex justify-between">
        <a className="btn btn-ghost text-xl">安东尼和凡妮莎的秘密花园</a>
        {currentUser ? <button onClick={handleLogout}>Logout</button> : ""}
      </div>
    </div>
  );
};

export default Navbar;


