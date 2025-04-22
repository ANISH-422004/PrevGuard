import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios/axios";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash/debounce";
import DOMPurify from "dompurify";



const Fakedata = () => {
  const [fakeDataList, setFakeDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mailEmail, setMailEmail] = useState(null);
  const [mailToken, setMailToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const MAILTM_API = "https://api.mail.tm";

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
    setLoading(true);
    setMessages([]);
    setMailEmail(null);
    try {
      const domainRes = await axios.get(`${MAILTM_API}/domains`);
      const domain = domainRes.data["hydra:member"][0].domain;
      const randomUsername = Math.random().toString(36).substring(2, 10);
      const randomEmail = `${randomUsername}@${domain}`;
      const password = `PrivGuard@123`;

      await axios.post(`${MAILTM_API}/accounts`, {
        address: randomEmail,
        password,
      });

      const loginRes = await axios.post(`${MAILTM_API}/token`, {
        address: randomEmail,
        password,
      });

      setMailEmail(randomEmail);
      setMailToken(loginRes.data.token);
      toast.success("Disposable email created 📬");
    } catch (err) {
      console.error("Mail.tm Error:", err.response?.data || err.message);
      toast.error("Failed to create disposable email");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Debounced message fetcher (manual trigger)
  const fetchMessages = debounce(async () => {
    if (!mailToken) return;
    try {
      setSyncing(true);
      const res = await axios.get(`${MAILTM_API}/messages`, {
        headers: { Authorization: `Bearer ${mailToken}` },
      });
      setMessages(res.data["hydra:member"]);
      console.log(messages);
      toast.success("Inbox synced 📬");
    } catch (err) {
      console.error("Error fetching messages", err);
      toast.error("Failed to sync inbox");
    } finally {
      setSyncing(false);
    }
  }, 2000);

  useEffect(() => {
    fetchFakeData();
  }, []);

  const handleViewMessage = async (id) => {
    try {
      const res = await axios.get(`${MAILTM_API}/messages/${id}`, {
        headers: { Authorization: `Bearer ${mailToken}` },
      });

      setActiveMessage(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to load full message", err);
      toast.error("Failed to open email");
    }

  };
  

  return (
    <div
      className={`min-h-screen px-4 py-24 ${
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
            <div className="flex items-center gap-4 mb-3">
              <p className="text-sm">
                Active Email: <strong>{mailEmail}</strong>
              </p>
              <button
                onClick={fetchMessages}
                disabled={syncing}
                className={`text-xs px-3 py-1 rounded-lg transition ${
                  darkTheme
                    ? "bg-dark-accent hover:bg-dark-hover text-white"
                    : "bg-light-accent hover:bg-light-hover text-white"
                }`}
              >
                {syncing ? "Syncing..." : "Sync Inbox 🔄"}
              </button>
            </div>
            <div className="bg-white/10 p-4 rounded-xl shadow-md border max-h-60 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-400">No messages yet...</p>
              ) : (
                messages.map((msg) => (
                  <button
                    onClick={() => handleViewMessage(msg.id)}
                    className="w-full text-left mb-3 border-b border-gray-500 pb-2 hover:bg-white/10 p-2 rounded transition"
                  >
                    <p className="font-bold text-sm text-blue-400 underline underline-offset-2">
                      {msg.subject || "(No Subject)"}
                    </p>
                    <p className="text-xs text-gray-300">
                      From:{" "}
                      <span className="font-medium">{msg.from?.address}</span>
                    </p>
                    <p className="text-xs text-secondaryText">{msg.intro}</p>
                  </button>
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
            <h3 className="text-lg font-semibold mb-1">Fake Name : {item.name}</h3>
            <p className="text-sm text-secondaryText">Fake PhoneNo. :{item.phone}</p>
            <p className="text-sm text-secondaryText">Fake Address : {item.address}</p>
            <p className="text-sm text-secondaryText">Fake AadharNo. :{item.aadhar}</p>
          </div>
        ))}
      </div>


      {isModalOpen && activeMessage && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className={`relative max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg transition ${
      darkTheme ? "bg-dark-secondary text-dark-primaryText" : "bg-white text-black"
    }`}>
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
      >
        <X size={24} />
      </button>
      <h2 className="text-xl font-bold mb-2">{activeMessage.subject}</h2>
      <p className="text-sm text-gray-500 mb-4">From: {activeMessage.from?.address}</p>
      <div
        className="prose max-w-none text-sm"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( activeMessage.html || activeMessage.text || "No content available.")  }}
      />
    </div>
  </div>
)}





    </div>
  );
};

export default Fakedata;
