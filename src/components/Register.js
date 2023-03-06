import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { register } from "../slices/users";
import { clearMessage } from "../slices/message";

const signupFormValidation = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Enter valid email")
    .required("This field is required"),
  dob: Yup.date()
    .required("This field is required")
    .test(
      "valid",
      "The DOB must be before 01-01-2015",
      (val) => val && moment(val).isBefore("2015-01-01")
    ),
  mobile: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required").min(8),
  confirmPassword: Yup.string().required("This field is required").min(8),
});

function Register(props) {
  let [error, setError] = useState("");
  let [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onSignup = async (value) => {
    if (value.password !== value.confirmPassword) {
      setError("The password and confirm password did not match");
    } else {
      setError("");
      setSpin(true);
      console.log(value);
      dispatch(register(value))
        .unwrap()
        .then(() => {
          setSpin(false);
          navigate("/login");
        })
        .catch(() => {
          setSpin(false);
        });
    }
  };

  return (
    <div className="my-20 flex flex-col">
      <h3 className="text-orange-600 text-center text-2xl font-medium mb-5">
        Registration
      </h3>
      <div className="mt-5 flex flex-col bg-white border rounded-md shadow w-3/4 md:w-1/2 mx-auto">
        <Formik
          initialValues={{}}
          onSubmit={onSignup}
          validationSchema={signupFormValidation}
        >
          {() => {
            return (
              <Form className="flex flex-col items-center justify-center px-2">
                <div className="mb-10">
                  <label className="block mt-10 font-medium">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" First name"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">DOB</label>
                  <Field
                    name="dob"
                    type="date"
                    min={"1920-01-01"}
                    max={"2015-01-01"}
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                  />
                  <ErrorMessage
                    name="dob"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Mobile</label>
                  <Field
                    name="mobile"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Mobile"
                  />
                  <ErrorMessage
                    name="mobile"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
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
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
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
                    <span className="font-medium">Register</span>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
        {message ? (
          <>
            <div className="block text-center text-red-500 mb-5">{message}</div>
          </>
        ) : (
          <></>
        )}
        {error ? (
          <>
            <div className="block text-center text-red-500 mb-5">{error}</div>
          </>
        ) : (
          <></>
        )}

        <div className="text-center text-xs mb-5">
          <p>
            Already have an account?{" "}
            <Link className="italic text-orange-500" to="/login">
              Login
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
