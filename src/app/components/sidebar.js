"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Chat", path: "/chat" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      {/* Logo/Header */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        MyApp
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg transition ${
              pathname === item.path
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer/Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
