import React, { useState, useEffect } from "react";
import Section from "./Section";
import Footer from "./Footer";
import vehicleLogo from "../images/vehicleLogo.jpg";
import payment from "../images/payment.jpg";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "../App.css";

function UserHome(props) {
  console.log("userHome::::", props);
  const location = useLocation();
  const history = useHistory();
  console.log(location.state);
  const [isHome, setIsHome] = useState(false);
  const [registerFlag, setRegisterFlag] = useState("");
  const goToHome = (event) => {
    setIsHome(true);
  };
  const bookRide = (event) => {
    history.push({
      pathname: "/BookRide",
      state: {
        userName: location.state.userName,
        password: location.state.password,
      },
    });
  };
  useEffect(() => {
    console.log("setIsHome:", setIsHome);
    if (isHome) {
      history.push({
        pathname: "/",
        state: {
          userName: location.state.userName,
          password: location.state.password,
        },
      });
    }
  }, [isHome]);
  return (
    <div className="header">
      <div className="container">
        <nav className="nav_checkbox">
          <a href="#" className="logo">
            RIDESHARE
          </a>
          <input type="checkbox" id="tab-nav" className="tab-nav" />
          <label for="tab-nav" className="label">
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
          </label>
          <ul className="content_nav">
            <li>
              <NavLink to="/" onClick={() => goToHome()}>
                HOME
              </NavLink>
            </li>
            <li>
              <a href="#">ABOUT</a>
            </li>
            <li>
              <a href="#">BLOG</a>
            </li>
            <li>
              <a href="#">SERVICE</a>
            </li>
          </ul>
        </nav>
        <div>{location.state.userName} Logged In successfully!!</div>
      </div>
      <div className="content_section">
        <div className="cardContainer">
          <div className="rideItems">
            <img src={vehicleLogo} alt="" />
            <button
              id="bookRide"
              type="submit"
              onClick={(e) => {
                bookRide(e);
              }}
            >
              Book a ride
            </button>
          </div>
          <div className="rideItems">
            <img src={payment} alt="" />
            <button>Pay</button>
          </div>
        </div>
      </div>
      <div className="contentfooter">
        <Footer />
      </div>
    </div>
  );
}

export default UserHome;
