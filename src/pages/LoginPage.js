import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const LoginPage = (props) => {
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

  const loginHandler = (event) => {
    event.preventDefault();

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

    axios({
      method: "post",
      url: "https://task-master-backend.vercel.app/login",
      data: formBody,
    }).then((response) => {
      if (response.data !== "login") {
        setEmail("");
        setPassword("");
        setError(response.data);
      } else {
        localStorage.setItem("username", email);
        localStorage.setItem("password", password);
        localStorage.setItem("isLogin", true);
        navigate("/");
      }
    });
  };

  return (
    <div>
      <Header isLogin={isLogin} />
      <div className="maindiv">
        {!isLogin ? (
          <div>
            <form onSubmit={loginHandler}>
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
              <div className="submitButton">
                <button type="submit" className="btn btn-primary">
                  Login
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
    </div>
  );
};

export default LoginPage;
