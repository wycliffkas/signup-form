import React from "react";

const Form = ({
  onHandleChange,
  firstName,
  lastName,
  email,
  password,
  errors,
  onSaveUser,
}) => {
  let validation = true;
  if (errors.firstName || errors.lastName || errors.password || errors.email) {
    validation = false;
  }
  return (
    <div className="cotainer">
      <div className="row justify-content-center">
        <div className="col-4">
          <h4 className="center-text">Create Account</h4>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={onHandleChange}
                value={firstName}
                required
              />
              <span style={{ color: "red" }}>{errors["firstName"]}</span>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                onChange={onHandleChange}
                value={lastName}
                required
              />
              <span style={{ color: "red" }}>{errors["lastName"]}</span>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={onHandleChange}
                value={email}
                required
              />
              <span style={{ color: "red" }}>{errors["email"]}</span>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={onHandleChange}
                value={password}
                required
              />
              <span style={{ color: "red" }}>{errors["password"]}</span>
            </div>
            <button
              type="submit"
              className={` btn ${
                !validation ? "btn-secondary  btn-lg btn-block" : "btn-primary  btn-lg btn-block"
              }`}
              disabled={!validation}
              onClick={onSaveUser}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
