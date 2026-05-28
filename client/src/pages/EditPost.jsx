import React from "react";

const EditPost = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8">
          Edit Blog Post
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            defaultValue="Getting Started with React"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="text"
            defaultValue="Programming"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="file"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <textarea
            rows="10"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
            defaultValue="React is a JavaScript library for building user interfaces..."
          ></textarea>

          <div className="flex gap-4">

            <button className="bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
              Update Post
            </button>

            <button
              type="button"
              className="bg-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              Delete Post
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;