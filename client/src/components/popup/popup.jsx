import React, { useState } from "react";
import { GiCancel, GiWavyItinerary } from "react-icons/gi";
import "./popup.css";

const Popup = ({ closepopup }) => {
  const [accountAddress, setAccountAddress] = useState("");
  const [depositPeriod, setDepositPeriod] = useState("");
  const [bufferPeriod, setBufferPeriod] = useState("");
  const [dailyDepositAmount, setDailyDepositAmount] = useState("");
  const [fixedInterest, setFixedInterest] = useState("");

  const handleClick = () => {
    closepopup();
  };

  const handleUpload = () => {
    // Handle the upload logic with the input values
    console.log({
      accountAddress,
      depositPeriod,
      bufferPeriod,
      dailyDepositAmount,
      fixedInterest,
    });
    let c = document.getElementById("try-it");
    c.innerHTML = "<div class='success'> Please wait, investing with 😍</div>";
    const hey = () => {
      c.innerHTML = "<div class='success'> Success ✅😊</div>";
    }
    setTimeout(hey, 3000);
  };

  return (
    <div className="con-home-popup" id="try-it">
      <div className="popup-header">
        <h3>Complete Details</h3>
        <GiCancel className="cross" onClick={handleClick} />
      </div>
      <div className="popup-content">
        <label>
          Account Address:
          <input
            type="text"
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target.value)}
          />
        </label>
        <label>
          Deposit Period:
          <input
            type="text"
            value={depositPeriod}
            onChange={(e) => setDepositPeriod(e.target.value)}
          />
        </label>
        <label>
          Buffer Period:
          <input
            type="text"
            value={bufferPeriod}
            onChange={(e) => setBufferPeriod(e.target.value)}
          />
        </label>
        <label>
          Daily Deposit Amount:
          <input
            type="text"
            value={dailyDepositAmount}
            onChange={(e) => setDailyDepositAmount(e.target.value)}
          />
        </label>
        <label>
          Fixed Interest:
          <input
            type="text"
            value={fixedInterest}
            onChange={(e) => setFixedInterest(e.target.value)}
          />
        </label>
        <button onClick={handleUpload}>Deposit</button>
      </div>
    </div>
  );
};

export default Popup;
