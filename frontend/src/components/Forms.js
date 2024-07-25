import { useDispatch, useSelector } from "react-redux";
import { addUserData, updateUserData } from "../features/crudSlice";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Forms = () => {
  const dispatch = useDispatch();
  const initialUpdate = useSelector((state) => state.inputFormUpdate);
  const [user, setUser] = useState({ _id: "", name: "", phone: "", email: "" });

  useEffect(() => {
    setUser(initialUpdate);
  }, [initialUpdate]);

  const handleSubmit = (values, actions) => {
    if (user._id) {
      dispatch(updateUserData(values));
    } else {
      dispatch(addUserData(values));
    }
    actions.resetForm();
    setUser({ _id: "", name: "", phone: "", email: "" });
  };

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Too short")
      .max(20, "Too Long")
      .required("Please enter Full Name"),
    phone: Yup.number().required("Please enter Phone Number"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
  });

  return (
    <div className="flex items-center justify-center mx-auto">
      <Formik
        initialValues={user}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        validationSchema={FormSchema}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form className=" my-2 w-7/12 py-4 rounded-lg bg-slate-100">
            <div>
              <div className="flex justify-center items-center m-2">
                <span className="font-bold">Name :</span>
                <Field
                  className="ml-3 p-1 rounded-lg resize-none"
                  name="name"
                  placeholder="Enter Full Name"
                />
              </div>
              {errors.name && touched.name && (
                <div className="errors text-red-400 flex justify-center items-center">
                  {errors.name}
                </div>
              )}
              <div className="flex justify-center items-center m-2">
                <span className="font-bold">Phone :</span>
                <Field
                  className="ml-2 p-1 rounded-lg resize-none"
                  name="phone"
                  placeholder="Enter Phone Number"
                />
              </div>
              {errors.phone && touched.phone && (
                <div className="errors text-red-400 flex justify-center items-center">
                  {errors.phone}
                </div>
              )}
              <div className="flex justify-center items-center m-2">
                <span className="font-bold">Email :</span>
                <Field
                  className="ml-3 p-1 rounded-lg resize-none"
                  name="email"
                  type="email"
                  placeholder="Enter Email Id"
                />
              </div>
              {errors.email && touched.email && (
                <div className="errors text-red-400 flex justify-center items-center">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="mt-2 px-2 py-1 bg-blue-200 rounded-lg font-medium hover:bg-sky-200 "
                type="submit"
              >
                {user._id ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms;
