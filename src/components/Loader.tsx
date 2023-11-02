"use client";
import React from "react";

function Loader() {
  return (
    <div className="bg-black bg-opacity-75 h-screen w-full fixed inset-0 flex items-center justify-center ">
      <div className="h-8 w-8 border-4 border-white border-solid border-t-black animate-spin rounded-full"></div>
    </div>
  );
}

export default Loader;
