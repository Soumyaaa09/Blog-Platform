import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        My Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-900 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-2">
            Total Blogs
          </h2>

          <p className="text-5xl font-bold text-purple-500">
            12
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-2">
            Comments
          </h2>

          <p className="text-5xl font-bold text-pink-500">
            48
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-2">
            Likes
          </h2>

          <p className="text-5xl font-bold text-indigo-500">
            120
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;