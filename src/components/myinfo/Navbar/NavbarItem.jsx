import React from "react";

function NavbarItem({ menu }) {
  return (
    <div className="Navbar-item ">
      <p>{menu.name}</p>
    </div>
  );
}

export default NavbarItem;