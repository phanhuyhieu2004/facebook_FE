import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'; // Import Axios
import "./Register.css";

const Register = () => {
    const navigate=useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPass: '',
            phone:'',
            day: '',
            month: '',
            year: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(6, 'Minimum length 4 characters')
                .max(8, 'Maximum length 6 characters')
                .matches(/^[a-zA-Z0-9]+$/, 'Do not write any special signs'),
            email: Yup.string().email('Invalid email'),
            password: Yup.string()
                .min(6, 'Minimum length 4 characters')
                .max(8, 'Maximum length 6 characters')
                .matches(/^[a-zA-Z0-9]+$/, 'Do not write any special signs'),
            phone: Yup.string()
                .matches(/^[0][0-9]{9}$/, 'Phone number must start with 0 and have 10 digits'),
            confirmPass: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Confirmation password does not match')
        }),

        onSubmit: values => {
            const { userName, email, password, day, month, year ,phone} = values; // Destructure values

            const birthday = `${year}-${month}-${day}`;

            const userData = {
                username: userName,
                password: password,
                email: email,
                phone:phone,

                birthday: birthday
            };
            console.log('Submitting form with values:', userData); // Log giá trị trước khi gửi yêu cầu

            axios.post('http://localhost:8080/api/register', userData)
                .then(response => {


                    navigate('/login?registrationSuccess=true');




                })
                .catch(error => {
                    console.error('There was an error registering!', error);
                    if (error.response && error.response.status === 400) {
                        setErrorMessage('Username or phone number already exists');
                    }
                });
        },
    });

    return (
        <div className="register">
            <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" className="register__logo" alt="logo" />
            <div className="register__container">
                <center><i className=" fa-brands fa-facebook fa-beat"
                           style={{
                               color: "#0080ff", fontSize: " 40px",
                               margin: "20px"
                           }}/>
                </center>

                {errorMessage && <div className="error"><p>{errorMessage}</p></div>}

                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div>
                            <input
                                className="register__name"
                                type="text"
                                placeholder="User Name" required
                                {...formik.getFieldProps('userName')}
                            />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div className="error">{formik.errors.userName}</div>
                            ) : null}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email" required
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>
                    <center>

                        <input
                            type="password"
                            placeholder="New Password" required
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}
                    </center>
                    <center>
                        <input
                            type="password"
                            placeholder="Confirm Password" required
                            {...formik.getFieldProps('confirmPass')}
                        />
                        {formik.touched.confirmPass && formik.errors.confirmPass ? (
                            <div className="error">{formik.errors.confirmPass}</div>
                        ) : null}
                    </center><center>
                    <input
                        type="text"
                        placeholder="Phone" required
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="error">{formik.errors.phone}</div>
                    ) : null}
                </center>
                    <h5 className="register__date">Date Of Birth</h5>
                    <div className="row">
                        <select className="register__date2" {...formik.getFieldProps('day')} required>
                            <option value="">Day</option>
                            {[...Array(31).keys()].map(day => (
                                <option key={day + 1} value={day + 1}>{day + 1}</option>
                            ))}
                        </select>
                        <select className="register__date3" {...formik.getFieldProps('month')} required>
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                <option key={index + 1} value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <select className="register__date3" {...formik.getFieldProps('year')} required>
                            <option value="">Year</option>
                            {Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {formik.touched.day && formik.errors.day ? (
                        <div className="error">{formik.errors.day}</div>
                    ) : null}
                    {formik.touched.month && formik.errors.month ? (
                        <div className="error">{formik.errors.month}</div>
                    ) : null}
                    {formik.touched.year && formik.errors.year ? (
                        <div className="error">{formik.errors.year}</div>
                    ) : null}
                    <p className="register__policy">
                        By clicking Sign Up, you agree to our{" "}
                        <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You
                        may receive SMS notifications from us and can opt out at any time.
                    </p>
                    <center>
                        <button type="submit" className="register__register">
                            Sign Up
                        </button>
                    </center>
                    <Link to="/login">
                        <p className="register__login">Already have an account?</p>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;