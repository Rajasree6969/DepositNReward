import React, { useState } from "react";
import Popup from "../components/popup/popup";
import Logo from "../assets/logo.png";
import "./home.css";
const HomePage = () => {
  const [popup, setpopup] = useState(false);
  const close = () => {
    setpopup(false);
  };
  const runbserver = () => {
    fetch("http://localhost:3001/execute", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response here
          return response.json(); // Parse the JSON response
        } else {
          // Handle error response
          return response.json().then((errorData) => {
            throw new Error(`${errorData.msg}`);
          });
        }
      })
      .then((responseData) => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="con-home">
      {popup && <Popup closepopup={() => close()} />}
      <div className="box-home">
        <div className="box-image">
          <img src={Logo} alt="" id="logo" />
          <h1>ChromoZK.gen</h1>
        </div>

        <strong>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
          ratione nulla quasi at dolorem, ipsa ut quia maxime enim labore soluta
          provident dignissimos voluptatem tenetur sunt optio error debitis,
          necessitatibus commodi architecto.
        </strong>
        <div className="box-btns">
          <button onClick={() => setpopup(true)}>Invest</button>
        </div>
      </div>
      <div className="con-partners">
        <div className="box-partners">
          <div className="parth">
            <h3>Partners</h3>
          </div>
          <div className="partner">
            <img src="" alt="" />
            <p className="p-name">Scroll</p>
          </div>
          <div className="partner">
            <img src="" alt="" />
            <p className="p-name">Airstack</p>
          </div>
          <div className="partner">
            <img src="" alt="" />
            <p className="p-name">Polygon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
