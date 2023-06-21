import React, { useState, useEffect  } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { validate } from "./validate";
import { notify } from "./toast";

import styles from "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [data, setdata] = useState(
    defaultValue || {
      name: "",
      email: "",
      phNumber: "",
      isAccepted: false,
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "Modal"));
    // console.log(errors);
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setdata({ ...data, [event.target.name]: event.target.checked });
    } else {
      setdata({ ...data, [event.target.name]: event.target.value });
    }
    // console.log(data);
  };


  // const handleChange = (e) => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.keys(errors).length) {
      notify("Data added Successfully !", "success");
    } else {
      notify("Invalid Data!", "error");
      setTouched({
        name: true,
        email: true,
        phNumber: true,
        isAccepted: true,
      });
    }
    onSubmit(data);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit} className= "formContainer ">
        <div className="formElement">
          <label>Name</label>
          <input
            className={
              errors.name && touched.name
                ? styles.unCompleted
                : styles.completed
            }
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div className="formElement">
          <label>Email</label>
          <input
            className={
              errors.email && touched.email
                ? styles.unCompleted
                : styles.completed
            }
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className= "formElement">
          <label>Phone Number</label>
          <input
            className={
              errors.phNumber && touched.phNumber
                ? styles.unCompleted
                : styles.completed
            }
            type="number"
            name="phNumber"
            value={data.phNumber}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.phNumber && touched.phNumber && (
            <span>{errors.phNumber}</span>
          )}
        </div>
       
        <div className= "formPrivacy">
          <div>
            <label>I Accept All Policy</label>
            <input
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {errors.isAccepted && touched.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>
        <div className= "formButtons">
        <button type="submit" className = "formButtons" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
        </form>
      </div>
    </div>
  );
};
