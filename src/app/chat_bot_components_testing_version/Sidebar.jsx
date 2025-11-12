// components/Sidebar.jsx
import React from "react";

const Sidebar = ({ alumniList, onSelectChat }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Alumni</h2>
      <ul>
        {alumniList.map((alumni) => (
          <li
            key={alumni.id}
            onClick={() => onSelectChat(alumni)}
            className="flex items-center mb-3 p-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            <img
              src={alumni.image}
              alt={alumni.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{alumni.name}</p>
              <p className="text-sm text-gray-500">{alumni.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
