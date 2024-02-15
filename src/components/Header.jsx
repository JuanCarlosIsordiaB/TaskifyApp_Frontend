import React from "react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Finder from "./Finder";
import useAuth from "../hooks/useAuth";

export const Header = () => {
  const { handleFinder, logOut } = useProjects();
  const { logOutAuth } = useAuth();

  const handleLogOut = () => {
    logOut();
    logOutAuth();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          Taskify
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase text-black hover:text-gray-700"
            onClick={handleFinder}
          >
            Find Project
          </button>
          <Link
            to="/projects"
            className="font-bold uppercase text-black hover:text-gray-700 "
          >
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-red-600 hover:bg-red-500 transition-colors p-3 rounded-md uppercase font-bold "
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <Finder />
        </div>
      </div>
    </header>
  );
};
