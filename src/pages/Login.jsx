import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth,  } from "../context/AuthContext";



const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithEmail, signupWithEmail } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signupWithEmail(email, password);
      } else {
        await signinWithEmail(email, password);
      }
    } catch (error) {
      setError("Failed to authenticate. Please check your credentials and try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{isSignUp ? "Sign up now!" : "Login now!"}</h1>
          <p className="py-6">
          进来和我谈谈。我为我们的私人聊天制作了这个！
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleAuth}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isSignUp && (
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">{isSignUp ? "Sign Up" : "Login"}</button>
            </div>
            <div className="form-control mt-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Log in" : "Need an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
