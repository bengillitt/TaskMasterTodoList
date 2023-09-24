import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      setIsLogin("true");
    } else {
      setIsLogin("false");
    }
  }, []);

  const LogoutHandler = () => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    setIsLogin("false");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="./">
            TaskMaster
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="./">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="./archives">
                  Archives
                </Link>
              </li> */}
            </ul>
            {isLogin !== "true" ? (
              <div>
                <button className="btn btn-outline-success" type="submit">
                  <Link className="btn" to={"./signup"}>
                    Signup
                  </Link>
                </button>
                <button className="btn btn-outline-success" type="submit">
                  <Link className="btn" to={"./login"}>
                    Login
                  </Link>
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={LogoutHandler}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
