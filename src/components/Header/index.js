import React, {  useState } from "react";
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

 

  

  

  return (
   <div className="navbar">
      <h1>
        <TbMoneybag className="logo-image" />
        CoinControl
      </h1>
      <div className="button-container">
       
        <AiFillSetting className="menu-btn" onClick={handleOpen} />
      </div>
      {isOpen && <UserProfile className="profile" />}
    </div>
  );
};

export default Header;












