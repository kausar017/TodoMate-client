import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          userId: user?.uid,
          name: user?.displayName,
          email: user?.email,
        };
        axios.post("http://localhost:5000/users", userInfo).then((res) => {
          console.log(res.data);
        });
        navigate(from);
        toast.success("Login Success");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-20 mx-auto flex items-center justify-center">
      <img className="w-full max-w-96" src="https://i.postimg.cc/BQVLCCrZ/Login-amico.png" alt="" />
      <button
        onClick={handleGoogleLogin}
        className="btn-lg btn max-w-72 border-2"
      >
        Login With Google
      </button>
    </div>
  );
};

export default Login;
