import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";




export default function GameScreen({ ws, setScreen }) {

  const [cartas, setCartas] = useState([1,2,3,4,5,6,7,8]);
  const [seleccion, setSeleccion] = useState([]);
  const [bloqueada, setBloqueada] = useState(null);

  const [jugadores, setJugadores] = useState([]);
  const [resultado, setResultado] = useState("");
  const [ronda, setRonda] = useState(1);
  const [finJuego, setFinJuego] = useState(null);

  // ===== SOCKET =====
  useEffect(() => {

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("MSG:", data);

      // 👥 jugadores conectados
      if (data.tipo === "jugadores") {
        setJugadores(data.lista);
      }

      // 👀 ver jugadas en tiempo real
      if (data.tipo === "jugadas") {
        setJugadores(data.jugadores);
      }

      // 🏆 resultado
      if (data.tipo === "resultado") {
        setResultado(data.ganador);
      }

      // 📊 estado (ronda + puntos)
      if (data.tipo === "estado") {
        setRonda(data.ronda);
        setJugadores(data.jugadores);
      }

      // 🔄 reset cartas (ronda 7)
      if (data.tipo === "reset_cartas") {
        setCartas([1,2,3,4,5,6,7,8]);
        setBloqueada(null);
      }


        if (data.tipo === "fin_juego") {
            setFinJuego(data);
        }
    };

  }, []);

  // ===== SELECCIONAR CARTA =====
const seleccionarCarta = (carta) => { 

  if (bloqueada === carta) return;
  if (seleccion.includes(carta)) return;

  if (seleccion.length < 2) {
    const nueva = [...seleccion, carta];
    setSeleccion(nueva);

    // 🔥 NUEVO: cuando ya hay 2 cartas, avisar al servidor
    if (nueva.length === 2) {
      ws.send(JSON.stringify({
        tipo: "seleccion_cartas",
        cartas: nueva
      }));
    }
  }
};

  // ===== ENVIAR JUGADA =====
  const enviarJugada = (carta) => {

    if (seleccion.length !== 2) return;

    ws.send(JSON.stringify({
      tipo: "jugada",
      cartas: seleccion,
      usada: carta
    }));

    const otra = seleccion.find(c => c !== carta);

    setBloqueada(otra);
    setCartas(prev => prev.filter(c => c !== carta));
    setSeleccion([]);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>🎮 Juego</Text>

      <Text>Ronda: {ronda}</Text>

      {/* 👥 JUGADORES */}
      <View style={styles.box}>
        <Text style={styles.sub}>Jugadores:</Text>

        {jugadores.map((j, i) => (
          <Text key={i}>
            {j.nombre || j} 
            {j.puntos !== undefined ? ` - ${j.puntos} pts` : ""}
            {j.cartas ? ` (🃏 ${j.cartas[0]}, ${j.cartas[1]})` : ""}
            {j.seleccion ? ` (🎴 ${j.seleccion})` : ""}
          </Text>
        ))}
      </View>

      {/* 🏆 RESULTADO */}
      <Text style={styles.resultado}>{resultado}</Text>

      {/* 🃏 CARTAS */}
      <View style={styles.row}>
        {cartas.map((carta) => (
          <TouchableOpacity
            key={carta}
            style={[
              styles.carta,
              seleccion.includes(carta) && styles.seleccionada,
              bloqueada === carta && styles.bloqueada
            ]}
            onPress={() => seleccionarCarta(carta)}
          >
            <Text>{carta}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🎯 ELEGIR FINAL */}
      <Text>Elige cuál usar:</Text>

      <View style={styles.row}>
        {seleccion.map((carta) => (
          <TouchableOpacity
            key={carta}
            style={styles.boton}
            onPress={() => enviarJugada(carta)}
          >
            <Text>{carta}</Text>
          </TouchableOpacity>
        ))}
      </View>

       {finJuego && (
        <View style={{ marginTop: 20 }}>
            <Text>🏆 Ganador: {finJuego.ganador}</Text>
            <Text>Puntos: {finJuego.puntos}</Text>

            <TouchableOpacity
            style={{ backgroundColor: "green", padding: 10, marginTop: 10 }}
            onPress={() => {
            setFinJuego(null);
            setScreen("lobby"); // o "login"
            }}
            >
            <Text style={{ color: "white" }}>OK</Text>
            </TouchableOpacity>
        </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", // Un fondo gris muy claro para que resalten las cartas
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2D3436",
    marginBottom: 5,
    letterSpacing: 0.5
  },

  sub: {
    fontSize: 14,
    color: "#636E72",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 20
  },

  resultado: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0984E3", // Azul vibrante para los resultados
    backgroundColor: "#E1F5FE",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20
  },

  box: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10
  },

  carta: {
    width: 50, // Mantengo el tamaño solicitado
    height: 50,
    margin: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 8, // Bordes redondeados para un look moderno
    justifyContent: "center",
    alignItems: "center",
    
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevación para Android
    elevation: 3, 
  },

  seleccionada: {
    backgroundColor: "#fdcb6e", // Un naranja más suave y elegante
    borderWidth: 2,
    borderColor: "#e17055"
  },

  bloqueada: {
    backgroundColor: "#ff7675", // Un rojo pastel, menos agresivo
    opacity: 0.8
  },

  boton: {
    backgroundColor: "#6C5CE7", // Púrpura moderno
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    margin: 10,
    elevation: 2
  },
  
  textoBoton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});