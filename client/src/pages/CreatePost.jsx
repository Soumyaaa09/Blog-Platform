import React from "react";

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-bold mb-8">
          Create New Blog
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Blog Title"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="file"
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <textarea
            rows="10"
            placeholder="Write your blog..."
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          ></textarea>

          <button className="bg-gradient-to-r from-pink-600 to-purple-700 px-8 py-4 rounded-xl font-bold">
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;