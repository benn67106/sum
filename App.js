import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/employees"); // ניתוב לעמוד העובדים לאחר התחברות
  };

  return (
    <Router>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <header className="bg-blue-500 p-4 text-white text-center text-xl font-bold">
              ברוכים הבאים לסיכומים יומיים - VIP Clean אחזקות
            </header>
            <nav className="bg-blue-300 p-4 flex justify-center gap-4">
              <NavLink className="text-white font-semibold" to="/employees">עובדים</NavLink>
              <NavLink className="text-white font-semibold" to="/daily-reports">דיווחים יומיים</NavLink>
              <NavLink className="text-white font-semibold" to="/salaries">משכורות</NavLink>
              <NavLink className="text-white font-semibold" to="/income">הכנסות</NavLink>
              <Button className="ml-4 bg-red-500 text-white p-2 rounded" onClick={() => setIsAuthenticated(false)}>
                התנתק
              </Button>
            </nav>
            <main className="p-4 flex-1">
              <Routes>
                <Route path="/employees" element={<Employees />} />
                <Route path="/daily-reports" element={<DailyReports />} />
                <Route path="/salaries" element={<Salaries />} />
                <Route path="/income" element={<Income />} />
                <Route path="*" element={<Navigate to="/employees" />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <Card className="p-6 w-96 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">התחברות</h2>
        <input
          type="text"
          placeholder="שם משתמש"
          className="w-full p-3 border rounded mb-3 text-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="סיסמה"
          className="w-full p-3 border rounded mb-5 text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold" onClick={handleLogin}>
          התחבר
        </Button>
      </Card>
    </div>
  );
}

function Employees() {
  const employees = [
    { name: "שלו", phone: "0509237848", sofas: 30, aircon: 30 },
    { name: "יעקב", phone: "0506556933", sofas: 35, aircon: 25 },
    { name: "מאי", phone: "0526706503", sofas: 35, aircon: 35 },
    { name: "צחי", phone: "0529461945", sofas: 35, aircon: 25 },
    { name: "אבי", phone: "0505777212", sofas: 30, aircon: 30 },
    { name: "דוד", phone: "0537150817", sofas: 35, aircon: 30 },
    { name: "מאיר", phone: "0505919121", sofas: 30, aircon: 30 },
    { name: "שקד", phone: "0515006372", sofas: 40, aircon: 30 }
  ];
  return (
    <Card className="p-4">
      <h2 className="text-lg font-bold mb-4">רשימת עובדים</h2>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-blue-200">
            <th className="border p-2">שם</th>
            <th className="border p-2">טלפון</th>
            <th className="border p-2">ספות (%)</th>
            <th className="border p-2">מזגנים (%)</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.phone}</td>
              <td className="border p-2">{emp.sofas}%</td>
              <td className="border p-2">{emp.aircon}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function DailyReports() {
  const [report, setReport] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendReport = () => {
    if (report.trim()) {
      setMessages([...messages, { text: report, sender: "user" }]);
      setReport("");
      setTimeout(() => {
        setMessages([...messages, { text: "דיווח התקבל, תודה!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-bold">דיווחים יומיים</h2>
      <div className="h-40 border p-2 mb-2 overflow-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className={`p-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.sender === "user" ? "bg-blue-300 p-1 rounded" : "bg-gray-300 p-1 rounded"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="הזן את הדיווח שלך כאן..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      ></textarea>
      <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold" onClick={handleSendReport}>
        שלח דיווח
      </Button>
    </Card>
  );
}

export default App;
