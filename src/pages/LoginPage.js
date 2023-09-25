import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

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
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", email);
        localStorage.setItem("password", password);
        navigate("/");
      }
    });
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            name="username"
            value={email}
            onChange={emailHandler}
            aria-describedby="inputGroup-sizing-default"
            required
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            name="password"
            value={password}
            onChange={passwordHandler}
            aria-describedby="inputGroup-sizing-default"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>

      {error ? <p>{error}</p> : ""}
    </div>
  );
};

export default LoginPage;
