import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Signup.modules.css";

const SignupPage = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    const isLoginString = localStorage.getItem("isLogin");
    if (isLoginString === "true") {
      // eslint-disable-next-line
      setIsLogin(true);
    } else {
      // eslint-disable-next-line
      setIsLogin(false);
    }
  }, [isLogin]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailHandler = (event) => {
    event.preventDefault();

    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();

    setPassword(event.target.value);
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    if (email.includes("@") && email.includes(".")) {
      if (password.length > 8) {
        setError("");
        var details = {
          username: email,
          password: password,
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        await axios({
          method: "post",
          url: "https://task-master-backend.vercel.app/signup",
          data: formBody,
        }).then((response) => {
          if (response.data !== "Process Complete") {
            setError(response.data);
          } else {
            localStorage.setItem("username", email);
            localStorage.setItem("password", password);
            localStorage.setItem("isLogin", true);
            navigate("/");
          }
        });
      } else {
        setError("Password needs to be greater than 8 characters");
        setPassword("");
      }
    } else {
      setError("Email is not valid");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="maindiv">
      {!isLogin ? (
        <div>
          <form onSubmit={signupHandler}>
            <div className="mx-5">
              <div className="input-group mb-3">
                <span
                  className="input-group-text mt-3"
                  id="inputGroup-sizing-default"
                >
                  Email
                </span>
                <input
                  type="text"
                  className="form-control mt-3 inputRounding"
                  aria-label="Sizing example input"
                  name="username"
                  value={email}
                  onChange={emailHandler}
                  aria-describedby="inputGroup-sizing-default"
                  required
                />
              </div>
            </div>
            <div className="mx-5">
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Password
                </span>
                <input
                  type="password"
                  className="form-control inputRounding"
                  aria-label="Sizing example input"
                  name="password"
                  value={password}
                  onChange={passwordHandler}
                  aria-describedby="inputGroup-sizing-default"
                  required
                />
              </div>
            </div>
            <h2 className="mx-5">Please don't use your real password</h2>
            <div className="submitButton">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>

          {error ? (
            <div className="errorDiv">
              <p className="errorMessage">{error}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p>Already Logged In</p>
      )}
    </div>
  );
};

export default SignupPage;
