import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Login = () => {
    const { googleLogin } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    userId: user?.uid,
                    name: user?.displayName,
                    email: user?.email
                }
                axios.post('http://localhost:5000/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })
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