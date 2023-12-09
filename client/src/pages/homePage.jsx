import React, { useState } from "react";
import Popup from "../components/popup/popup";
import logo from "../assets/logo.jpg";
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
          <img src={logo} alt="" id="logo" />
          <h1>D n R</h1>
        </div>

        <strong>
        We all have a habbit to borrow loan and reward ourselves with purchases and later pay EMI.
        In recent days we also have the trend of Buy Now Pay Later (BNPL).
        </strong>
        <div className="box-btns">
          <button onClick={() => setpopup(true)}>Invest</button>
        </div>
      
      </div>
    </div>
  );
};

export default HomePage;
