export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email Required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  } else {
    delete errors.email;
  }

  if (!data.phNumber) {
    errors.phNumber = "Phone Number Required";
  } else if (data.phNumber.length < 10) {
    errors.phNumber = "Phone Number must be 10characters or more";
  } else {
    delete errors.phNumber;
  }

  if (type === "Modal") {
    if (!data.name) {
      errors.name = "Username Required";
    } else {
      delete errors.name;
    }


    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "You didn't Accept our Regulation!";
    }

    if (type === "Modal") {
      if (!data.name.trim()) {
        errors.name = "Username Required";
      } else {
        delete errors.name;
      }
    }
  }

  return errors;
};
