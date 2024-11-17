import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard ({ post }) {
  return (
    <div className="group relative w-64 border rounded-lg shadow-lg overflow-hidden bg-black hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold">{post.title}</p>
        <span className="italic text-sm text-gray-500">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-100px] left-0 right-0 border-teal-400 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md m-2"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}
