import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img className="w-full max-w-16" src="https://i.postimg.cc/ZRHzxVDw/spinner-8565-256.gif" alt="https://i.postimg.cc/ZRHzxVDw/spinner-8565-256.gif" />
      <p className="text-xl font-bold">Loading.....</p>
    </div>
  );
}
