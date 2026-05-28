import React from "react";

const comments = [
  {
    id: 1,
    name: "Rahul",
    text: "Amazing blog! Very helpful 🔥",
  },
  {
    id: 2,
    name: "Ankit",
    text: "Loved the explanation 👏",
  },
];

const PostDetails = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      
      <div className="relative h-[500px]">

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

          <span className="bg-purple-600 px-4 py-2 rounded-full mb-5 text-sm">
            Programming
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Getting Started with React
          </h1>

          <p className="text-gray-300 max-w-2xl">
            Learn how to build modern and interactive user interfaces using React.js
          </p>

        </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="flex items-center gap-4 mb-10">

          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-14 h-14 rounded-full"
          />

          <div>
            <h3 className="font-bold text-lg">
              Soumya Rout
            </h3>

            <p className="text-gray-400 text-sm">
              Posted on May 2026
            </p>
          </div>

        </div>

        
        <div className="bg-gray-900 p-8 rounded-3xl leading-8 text-gray-300 text-lg">

          <p className="mb-6">
            React is one of the most popular JavaScript libraries used for building modern web applications.
          </p>

          <p className="mb-6">
            It helps developers create reusable UI components and build fast single-page applications.
          </p>

          <p>
            In this blog, you will learn the basics of React including components, props, state, hooks, and routing.
          </p>

        </div>

        
        <div className="flex gap-4 mt-10">

          <button className="bg-pink-600 px-6 py-3 rounded-xl hover:bg-pink-700 transition">
            ❤️ Like
          </button>

          <button className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
            💬 Comment
          </button>

        </div>

        
        <div className="mt-20">

          <h2 className="text-3xl font-bold mb-8">
            Comments
          </h2>

          
          <div className="bg-gray-900 p-6 rounded-2xl mb-10">

            <textarea
              rows="4"
              placeholder="Write your comment..."
              className="w-full bg-gray-800 p-4 rounded-xl outline-none"
            ></textarea>

            <button className="mt-4 bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition">
              Add Comment
            </button>

          </div>

          
          <div className="space-y-6">

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-900 p-6 rounded-2xl"
              >

                <div className="flex items-center gap-4 mb-3">

                  <img
                    src={`https://i.pravatar.cc/150?img=${comment.id}`}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <h3 className="font-bold">
                      {comment.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      2 hours ago
                    </p>
                  </div>

                </div>

                <p className="text-gray-300">
                  {comment.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default PostDetails;