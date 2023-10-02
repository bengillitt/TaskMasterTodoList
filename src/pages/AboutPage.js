import Header from "./Header";

import { useState, useEffect } from "react";

import "./AboutPage.css";

const AboutPage = () => {
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

  return (
    <div>
      <Header isLogin={isLogin} />
      <div>
        <h1>About This Project</h1>
        <div className="text-div">
          <p>
            This project was made as part of a competition. I have added decent
            authentication however it is not very secure so please don't use
            your real password when signing up. THE DATA IS NOT ENCRYPTED
            THEREFORE I WILL HAVE YOUR PASSWORD IF YOU PUT IN YOUR REAL PASSWORD
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
