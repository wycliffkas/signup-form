import React, { Component } from "react";
import { toast } from "react-toastify";
import Form from "./components/Form";

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors: {},
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    let errors = this.state.errors;

    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 3 ? "Atleast 2 characaters required" : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 3 ? "Atleast 2 characaters required" : "";
        break;
      case "email":
        errors.email = regExp.test(value) ? "" : "Email address is invalid";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  submitUser = (event) => {
    event.preventDefault();
    this.checkEmail(this.state.email);
  };

  checkEmail = (email) => {
    const emailDetails = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        email: email,
      },
    };

    fetch("https://api.raisely.com/v3/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailDetails),
    })
      .then((response) => response.json())
      .then((resData) => {
        let errors = {};
        if (resData.data.status === "EXISTS") {
          errors["email"] = "Email is taken, please choose another email";
          return this.setState({ errors });
        }
        this.saveUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveUser = () => {
    const userDetails = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch("https://api.raisely.com/v3/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.errors) {
          toast.error("Saving user failed!, check the details entered");
        }
        toast.success(resData.message);
        this.setState({ firstName: "", lastName: "", email: "", password: "" });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Saving user failed!, check the details entered");
      });
  };

  render() {
    return (
      <div>
        <Form
          onHandleChange={this.handleChange}
          errors={this.state.errors}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          onSaveUser={this.submitUser}
        />
      </div>
    );
  }
}

export default App;
