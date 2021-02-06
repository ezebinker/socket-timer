import logo from "./logo.svg";
import { subscribeToTimer } from "./api";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timestamp, setTimestamp] = useState("no timestamp yet");

  useEffect(() => {
    subscribeToTimer((err, timestamp) => setTimestamp(timestamp));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Timer: {timestamp}</p>
      </header>
    </div>
  );
}

export default App;
