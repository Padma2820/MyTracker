import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { TbMoneybag } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import UserProfile from "../UserProfileFeture";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openOrder, setIsOpenOrder] = useState(0);
  const handleOpen = () => {
    if (openOrder === 0) {
      setIsOpen(true);
      setIsOpenOrder(1);
    } else if (openOrder === 1) {
      setIsOpen(false);
      setIsOpenOrder(0);
    }
  };

  const currencyConverterRef = useRef(null);
  useEffect(() => {
    if (currencyConverterRef.current) {
      console.log("Scrolling to:", currencyConverterRef.current.offsetTop);
      window.scrollTo({
        top: currencyConverterRef.current.offsetTop,
        behavior: "smooth",
      });
    } else {
      console.error("currencyConverterRef.current is null");
    }
  }, []); // Empty dependency array means this effect runs once after the component mounts
  

  

  return (
    // <>
    //   <div className="navbar">
    //     <h1>
    //       Expense Tracker
    //       <TbMoneybag className="logo-image" />
    //     </h1>
    //     <AiFillSetting className="menu-btn" onClick={handleOpen} />
    //   </div>
    //   {isOpen && <UserProfile className="profile" />}
    // </>

  //   <>
  //   <div className="navbar">
  //     <h1>
  //       Expense Tracker
  //       <TbMoneybag className="logo-image" />
  //     </h1>
  //     <div className="nav-buttons">
  //       <button className="menu-btn">
  //         Currency Converter
  //       </button>
  //       <AiFillSetting className="menu-btn" onClick={handleOpen} />
  //     </div>
  //   </div>
  //   {isOpen && <UserProfile className="profile" />}
  // </>


  <div className="navbar">
      <h1>
        <TbMoneybag className="logo-image" />
        Expense Tracker
      </h1>
      <div className="button-container">
       
        <AiFillSetting className="menu-btn" onClick={handleOpen} />
      </div>
      {isOpen && <UserProfile className="profile" />}
    </div>
  );
};

export default Header;












