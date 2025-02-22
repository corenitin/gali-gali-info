import api from "./api";
import { use, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");

  const handleClick = async (e) => {
    try {
      const res = await api.post("/users", { username });
      console.log(res.data);
      setResult(res.data.message);

    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">App</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Enter name..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Send
        </button>
      </div>

      {result && (
        <div className="mt-4 bg-slate-200 p-4 rounded-lg shadow-md w-full max-w-md">
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
