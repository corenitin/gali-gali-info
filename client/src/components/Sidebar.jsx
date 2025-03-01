import React from "react";
import { NavLink } from "react-router";

function Sidebar() {
  const links = [
    { title: "Dashboard", to: "dashboard" },
    { title: "Listings", to: "listings" },
    { title: "Pick-Up Requests", to: "pick-up-requests" },
    { title: "Notifications", to: "notifications" },
  ];

  return (
    <div className="bg-primary/5 dark:bg-primary-dark/15 min-h-screen fixed px-4 py-8">
      <ul className="flex flex-col gap-8">
        {links.map((link) => (
          <NavLink
            to={`/business/${link.to}`}
            key={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md border ${
                isActive
                  ? "bg-primary/15 border-primary/50" // Active styles
                  : "bg-primary/10 border-transparent hover:bg-primary/15 hover:border-primary/50"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
``
