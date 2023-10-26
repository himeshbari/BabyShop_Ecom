import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center mx-auto">
      <div className="text-center dashboard-menu shadow-lg">
        <div className="list-group">
          <h4 className="font-fam my-0">Dashboard</h4>
          <NavLink
            to="/user-profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
          to="/"
            className="list-group-item border-1 hide-1"
            style={{height:"100vh", zIndex:"-2"}}
          > 
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
