import {
    Link, useNavigate, useLocation,

} from "react-router-dom";
// đang nhập các thành phần từ gói npm react-router-dom đã được cài đặt trước đó.
import "./Login.css";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useAuth} from "../../AuthContext";


function Login() {
    const { login } = useAuth();
    const navigate=useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const registrationSuccess = params.get('registrationSuccess');
    const formik = useFormik({
        initialValues: {
            userName: '',

            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(6, 'Minimum length 6 characters')
                .max(8, 'Maximum length 8 characters')
                .matches(/^[a-zA-Z0-9]+$/, 'Do not write any special signs'),

            password: Yup.string()
                .min(6, 'Minimum length 6 characters')
                .max(8, 'Maximum length 8 characters')
                .matches(/^[a-zA-Z0-9]+$/, 'Do not write any special signs'),

        }),

        onSubmit: values => {
            const {userName,password} = values; // Destructure values


            const userData = {
                username: userName,
                password: password
            };
            console.log('Submitting form with values:', userData); // Log giá trị trước khi gửi yêu cầu
            // Make API call using Axios
            axios.post('http://localhost:8080/api/login', userData)
                .then(response => {
                    login(response.data);
                    navigate('/home');


                    // Handle successful registration (e.g., redirect to login page)
                })
                .catch(error => {
                    console.error('There was an error registering!', error);
                    if (error.response && error.response.status === 401) {
                        setErrorMessage('Username or password is incorrect');
                    } if (error.response && error.response.status === 403) {
                        setErrorMessage('Account has been blocked');
                    }
                });
        },
    });
    return (
        <div className="login">
            <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" class="login__logo"/>
            <div className="login__container">
                <center><i className=" fa-brands fa-facebook fa-beat"
                           style={{color: "#0080ff",fontSize:" 40px",
                               margin: "20px"}} />
                </center>
                {registrationSuccess && (
                    <div className="success-message"><p>Registration successful</p></div>
                )}
                {errorMessage && <div className="error"><p>{errorMessage}</p></div>}

                <form onSubmit={formik.handleSubmit}>
                    <center>
                        <input
                            type="text"

                            placeholder="Username" required
                            {...formik.getFieldProps('userName')}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div className="error">{formik.errors.userName}</div>
                        ) : null}


                    </center>
                    <center>
                        <input
                            type="password"
                            placeholder="Password" required
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}

                    </center>
                    <center>
                        <button

                            type="submit" class="login__login">
                            Log In
                        </button>
                    </center>
                    <center>
                        <div class="sideinfo">
                            <h4>Forgotten Password?</h4>
                            <h4 class="dot">·</h4>
                            <Link to="/register" style={{textDecoration: 'none'}}>
                                <h4 class="rtd">Sign up for Facebook</h4>
                            </Link>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default Login;