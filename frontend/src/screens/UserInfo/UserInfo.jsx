import React from "react";

const UserInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#071952] text-[#EBF4F6] p-4">
      <h2 className="text-3xl font-semibold mb-6">User Information</h2>
      <div className="bg-[#EBF4F6] text-[#071952] p-6 rounded-xl shadow-lg w-full max-w-md">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border-2 border-[#088395] rounded-lg focus:outline-none focus:border-[#37B7C3]"
          value="John Doe"
          readOnly
        />
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border-2 border-[#088395] rounded-lg focus:outline-none focus:border-[#37B7C3]"
          value="johndoe@example.com"
          readOnly
        />
        <button className="w-full p-2 bg-[#071952] text-white rounded-lg hover:bg-[#088395] transition">
          Edit Profile
        </button>
      </div>
      <button className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Log Out
      </button>
    </div>
  );
};

export default UserInfo;
