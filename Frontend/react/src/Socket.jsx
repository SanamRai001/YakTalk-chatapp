import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getTokenFromCookie } from "/utils/getTokenFromCookie";

function Socket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [reciever, setReciever] = useState("");
  const [recieverId, setRecieverId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const newsocket = io("https://yaktalk-chatapp.onrender.com/", {
      withCredentials: true,
    });
    setSocket(newsocket);
    newsocket.on("connect", () => {
      console.log(`User connected! ID: ${newsocket.id}`);
    });
    return () => {
      newsocket.disconnect();
      console.log("User disconnected:", newsocket.id);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("chatMessage", ({ msg, uname }) => {
      setMessages((prev) => [...prev, `${uname}: ${msg}`]);
    });

    socket.on("privateMessage", ({ msg, uname }) => {
      setMessages((prev) => [...prev, `${uname}: ${msg}`]);
    });

    socket.on("online", (users) => {
      const entries = Object.entries(users);
      setOnlineUsers(entries);
    });
  }, [socket]);

  useEffect(() => {
    const checkChatAccess = async () => {
      try {
        const res = await fetch("https://yaktalk-chatapp.onrender.com/chat", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Access Denied");
        const text = await res.text();
        console.log("Access granted:", text);
      } catch (err) {
        console.log("Access Denied:", err.message);
        navigate("/login");
      }
    };
    checkChatAccess();
  }, []);

  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.name);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (socket) {
      if (reciever === "") {
        socket.emit("chatMessage", { msg: message });
      } else {
        socket.emit("privateMessage", { id: recieverId, msg: message });
      }
      setMessage("");
    }
  };

  const handleSendMessage = (socketId, user) => {
    setReciever(user);
    setRecieverId(socketId);
    setSelectedUserId(socketId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Header - spans full width on mobile, first column on desktop */}
    <header className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h1 className="text-3xl font-bold text-indigo-600">{username}</h1>
      <p className="text-gray-500">Welcome to your chat dashboard</p>
    </header>

    {/* Online Users Section */}
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 lg:row-span-2">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Online Users</h2>
        <p className="text-sm text-gray-500">{onlineUsers.length} active</p>
      </div>
      <ul className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]">
        {onlineUsers.map(([socketId, user]) => (
          <li key={socketId}>
            <button
              type="button"
              onClick={() => handleSendMessage(socketId, user)}
              className={`w-full px-4 py-3 text-left transition-all duration-200 ease-in-out
                ${
                  selectedUserId === socketId
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${selectedUserId === socketId ? 'bg-indigo-500' : 'bg-green-500'}`}></div>
                <span className="font-medium">{user}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>

    {/* Chat Messages Section */}
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
      </div>
      <div className="p-4 h-[400px] overflow-y-auto space-y-3">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                index % 2 === 0 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                <p>{msg}</p>
                <p className="text-xs opacity-70 mt-1 text-right">10:30 AM</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        )}
      </div>

      {/* Message Form */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label htmlFor="receiver" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              id="receiver"
              type="text"
              placeholder="Select user or enter name"
              value={reciever}
              onChange={(e) => setReciever(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <input
              id="message"
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>

    {/* Footer with Logout */}
    <footer className="lg:col-span-3">
      <button
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        type="button"
        onClick={() => {
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </footer>
  </div>
</div>
  );
}

export default Socket;
