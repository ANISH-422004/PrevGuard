import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/axios";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

const Fakedata = () => {
  const [fakeDataList, setFakeDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const fetchFakeData = async () => {
    try {
      const res = await axiosInstance.get("/api/fake-data/all");
      setFakeDataList(res.data.fakedata);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load fake data");
    }
  };

  const generateData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/fake-data/generate");
      toast.success("Fake data generated ✅");
      setFakeDataList((prev) => [...prev, res.data.data]);
    } catch (err) {
      toast.error(err.response.data.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      await axiosInstance.post(`/api/fake-data/delete`, {
        fakeDataId: id,
      });
      toast.success("Deleted 🗑️");
      setFakeDataList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchFakeData();
  }, []);

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        darkTheme
          ? "bg-dark-background text-dark-primaryText"
          : "bg-light-background text-light-primaryText"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🧪 Fake Data Generator</h1>
        <button
          onClick={generateData}
          disabled={loading}
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            darkTheme
              ? "bg-dark-accent hover:bg-dark-hover text-white"
              : "bg-light-accent hover:bg-light-hover text-white"
          }`}
        >
          {loading ? "Generating..." : "Generate Data"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {fakeDataList.map((item) => (
    <div
      key={item._id}
      className={`relative backdrop-blur-lg p-4 rounded-2xl shadow-xl border ${
        darkTheme
          ? "bg-dark-secondary/30 border-dark-hover"
          : "bg-light-secondary/30 border-light-hover"
      }`}
    >
      {/* 🔴 Glowing green active dot */}
      <span className="absolute top-2 left-[5%] w-2 h-2 rounded-full bg-green-400 shadow-md shadow-green-500 animate-pulse" />

      {/* ❌ Delete Button */}
      <button
        onClick={() => deleteData(item._id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
      >
        <X size={20} />
      </button>

      {/* 📄 Fake Data Display */}
      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-secondaryText">{item.email}</p>
      <p className="text-sm text-secondaryText">{item.phone}</p>
      <p className="text-sm text-secondaryText">{item.address}</p>
      <p className="text-sm text-secondaryText">{item.aadhar}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Fakedata;
