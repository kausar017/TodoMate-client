import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const { googleLogin } = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="mt-20 mx-auto flex items-center justify-center">
            <button onClick={handleGoogleLogin} className="btn-lg btn max-w-72 border-2">Login With Google</button>
        </div>
    );
};

export default Login;