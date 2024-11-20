import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { setUserInfo } from "../redux/userSlice";
import { login } from '../services/authService';

const Login = () => {
    const dispatch = useDispatch();
    const initialValues = { email: '', password: ''};
    
    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const data = await login(values.email, values.password);  // Corrected typo here
            dispatch(setUserInfo(data)); // Store user info in Redux
        } catch (error) {
            setErrors({ server: error.response?.data?.message || 'An error occurred' });
        } 
        setSubmitting(false);
    };

    return (
        <div className="login-page">
            <h2>Login Here</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors }) => (
                    <Form>
                        <div>
                            <Field name="email" type="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        {errors.server && <div>{errors.server}</div>}
                        <button type="submit" disabled={isSubmitting}>Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
