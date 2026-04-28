import React, { useState, useEffect } from "react";
import LoginScreen from "./src/screens/Login";
import LobbyScreen from "./src/screens/Lobby";
import GameScreen from "./src/screens/GameScreen";

export default function App() {

  const [screen, setScreen] = useState("login");
  const [nombre, setNombre] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://18.117.193.70:5000");

    socket.onopen = () => {
      console.log("✅ Conectado al servidor");
    };

    socket.onerror = () => {
      console.log("❌ Error WS");
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  if (!ws) return null;

  if (screen === "login") {
    return <LoginScreen setNombre={setNombre} setScreen={setScreen} />;
  }

  if (screen === "lobby") {
    return (
      <LobbyScreen
        ws={ws}
        nombre={nombre}
        setScreen={setScreen}
      />
    );
  }

  if (screen === "game") {
    return <GameScreen ws={ws} setScreen={setScreen}/>;
  }

  return null;
}