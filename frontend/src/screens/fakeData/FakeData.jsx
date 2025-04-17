import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/axios";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { faker } from "@faker-js/faker";

const Fakedata = () => {
  const [fakeDataList, setFakeDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mailEmail, setMailEmail] = useState(null);
  const [mailToken, setMailToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const MAILTM_API = "https://api.mail.tm";
;
 

  // 📡 Fetch user's fake data
  const fetchFakeData = async () => {
    try {
      const res = await axiosInstance.get("/api/fake-data/all");
      setFakeDataList(res.data.fakedata);
    } catch (err) {
      toast.error("Failed to load fake data");
    }
  };

  // ➕ Generate new fake data
  const generateData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/fake-data/generate");
      toast.success("Fake data generated ✅");
      setFakeDataList((prev) => [...prev, res.data.data]);
    } catch (err) {
      toast.error(err.response?.data?.errors?.[0] || "Error generating data");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete fake data
  const deleteData = async (id) => {
    try {
      await axiosInstance.post(`/api/fake-data/delete`, { fakeDataId: id });
      toast.success("Deleted 🗑️");
      setFakeDataList((prev) => prev.filter((item) => item._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  // 🔐 Create mail.tm account and get token
  const generateMailAccount = async () => {
    setLoading(true)
    setMessages([])
    setMailEmail(null)
    try {
      setMessages([]);
      setMailEmail(null);

      const domainRes = await axios.get(`${MAILTM_API}/domains`);
      // console.log(domainRes.data["hydra:member"][0].domain);
      const domain = domainRes.data["hydra:member"][0].domain;

      const randomEmail = `${faker.string.alphanumeric(10)}@${domain}`;
      const password = `PrivGuard@123`


      console.log("Random Email:", randomEmail);
      console.log("random Password:", password);

      const res = await axios.post(`${MAILTM_API}/accounts`, {
        address: randomEmail,
        password,
      });
      console.log(res.data);

      const loginRes = await axios.post(`${MAILTM_API}/token`, {
        address: randomEmail,
        password,
      });

      console.log(loginRes.data.token);
      
      setMailEmail(randomEmail);
      setMailToken(loginRes.data.token);
      toast.success("Disposable email created 📬");
    } catch (err) {
      console.error("Mail.tm Error:", err.response.data);
      toast.error("Failed to create disposable email");
    }finally{
      setLoading(false)
    }
  };

  // ⏱️ Poll mail every 5 seconds
  useEffect(() => {
    if (!mailToken) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${MAILTM_API}/messages`, {
          headers: { Authorization: `Bearer ${mailToken}` },
        });
        setMessages(res.data["hydra:member"]);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [mailToken]);

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

      {/* 📫 Disposable Mailbox */}
      <div className="my-10">
        <h2 className="text-xl font-semibold mb-3">📫 Disposable Mailbox</h2>
        {!mailEmail ? (
          <button
            onClick={generateMailAccount}
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              darkTheme
                ? "bg-dark-accent hover:bg-dark-hover text-white"
                : "bg-light-accent hover:bg-light-hover text-white"
            }`}
          >
            Generate Disposable Email
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">
              Active Email: <strong>{mailEmail}</strong>
            </p>
            <div className="bg-white/10 p-4 rounded-xl shadow-md border max-h-60 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-400">No messages yet...</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="mb-3 border-b border-gray-500 pb-2"
                  >
                    <p className="font-bold">{msg.from?.address}</p>
                    <p className="text-xs">{msg.subject}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🔐 Fake Data Cards */}
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
            <span className="absolute top-2 left-[5%] w-2 h-2 rounded-full bg-green-400 shadow-md shadow-green-500 animate-pulse" />
            <button
              onClick={() => deleteData(item._id)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
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
