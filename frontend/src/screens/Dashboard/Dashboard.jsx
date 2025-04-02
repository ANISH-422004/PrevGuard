import { useState } from "react";
import { Hand, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const HandleLogout = () => {
    
  }


  console.log(user);
  return (
    <div className="flex h-screen bg-[#071952] text-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-52 bg-[#088395] p-5 space-y-6">
        <h1 className="text-xl font-bold text-[#EBF4F6]">Dashboard</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 1
          </a>
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 2
          </a>
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 3
          </a>
        </nav>
        <div className="mt-auto space-y-3">

          <button className="w-full bg-red-500 hover:bg-red-400 py-2 rounded flex items-center justify-center">
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Hidden by Default) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 w-52 h-full bg-[#088395] p-5 space-y-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 md:hidden z-30`}
      >
        <button onClick={() => setSidebarOpen(false)} className="text-white">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#EBF4F6]">Dashboard</h1>
        <nav className="space-y-4">
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 1
          </a>
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 2
          </a>
          <a href="#" className="block text-[#37B7C3] hover:text-white">
            Service 3
          </a>
        </nav>
        <div className="mt-auto space-y-3">
        <button 
        onClick={()=>{HandleLogout()}}
        
        className="w-full bg-red-500 hover:bg-red-400 py-2 rounded flex items-center justify-center">
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-[#088395] p-4 flex items-center justify-between md:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full bg-cover cursor-pointer"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl text-[#EBF4F6]">Welcome to the Dashboard</h2>
          <p className="text-[#37B7C3]">
            This is a dummy dashboard with a responsive sidebar.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
