import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-3xl text-center w-full max-w-md">

        <img
          src="https://i.pravatar.cc/150"
          alt=""
          className="w-32 h-32 rounded-full mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold mb-2">
          Soumya Rout
        </h1>

        <p className="text-gray-400 mb-6">
          Full Stack Developer & Blogger
        </p>

        <button className="bg-purple-600 px-6 py-3 rounded-xl">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;