import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from '../slices/users';
import { clearMessage } from "../slices/message";

const loginFormValidation = Yup.object().shape({
  userId: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required").min(8),
});


function Login() {
  let [ spin, setSpin ] = useState(false);
  let navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onLogin = (value)=>{
    const { userId, password } = value;
    setSpin(true);
    dispatch(login({ userId, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        setSpin(false);
      });
  }

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="my-24 flex flex-col">
      <h3 className="text-orange-600 text-center text-2xl font-medium mb-5">
        Login
      </h3>
      <div className="mt-8 flex flex-col bg-white border rounded-md shadow w-3/4 md:w-1/2 mx-auto">
        <Formik
          initialValues={{}}
          onSubmit={onLogin}
          validationSchema={loginFormValidation}
          className="inline-block mt-5"
        >
          {() => {
            return (
              <Form className="flex flex-col items-center justify-center px-2">
                <div className="mb-10">
                  <label className="block mt-10 font-medium">Email or Mobile</label>
                  <Field
                    name="userId"
                    type="test"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" User id"
                  />
                  <ErrorMessage
                    name="userId"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center text-white border rounded-md bg-orange-600 mb-5 px-10 py-2 hover:bg-orange-500"
                >
                  {spin ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span className="font-medium">Login</span>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
        {message ? (
          <>
            <div className="block text-center text-red-600 mb-5">{message}</div>
          </>
        ) : (
          <></>
        )}
        <div className="text-center text-xs mb-5">
          <p>
            New user?{" "}
            <Link className="italic text-orange-500" to="/register">
              Sign up
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

