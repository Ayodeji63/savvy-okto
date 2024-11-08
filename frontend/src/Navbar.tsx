import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  PiggyBank,
  User,
} from "lucide-react";
import { notification } from "./utils/notification";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, isActive }) => (
  <NavLink
    to={to}
    className={`flex flex-col items-center rounded-full p-2 ${isActive ? "bg-green-500" : ""}`}
  >
    <Icon size={24} color={isActive ? "white" : "black"} />
  </NavLink>
);

const FloatingNavBar: React.FC = () => {
  const location = useLocation();
  const comingSoon = () => {
    notification.info("coming soon");
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-4 py-2 shadow-lg">
      <ul className="flex space-x-8">
        <NavItem
          to="/dashboard/dashboard/page"
          icon={Home}
          isActive={location.pathname === "/dashboard/dashboard/page"}
        />
        <NavItem
          to="/group-savings/page"
          icon={Users}
          isActive={location.pathname === "/group-savings/page"}
        />
        <NavItem
          to="/loan"
          icon={PiggyBank}
          isActive={location.pathname === "/loan"}
        />
        <div
          onClick={comingSoon}
          className="flex flex-col items-center rounded-full p-2"
        >
          <User size={24} color="black" />
        </div>
      </ul>
    </nav>
  );
};

export default FloatingNavBar;
