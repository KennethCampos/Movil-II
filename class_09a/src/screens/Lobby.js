import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Lobby({ ws, nombre, setScreen }) {

  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigoSala, setCodigoSala] = useState("");
  const [jugadores, setJugadores] = useState([]);
  const [esHost, setEsHost] = useState(false);

  useEffect(() => {
    ws.onmessage = (event) => {
      console.log("MSG:", event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.tipo === "sala_creada") {
          setCodigoSala(data.codigo);
          setEsHost(true);
          setMensaje("Sala creada ✅");
        }

        if (data.tipo === "jugadores") {
          setJugadores(data.lista);
        }

        if (data.tipo === "unido_sala") {
          setMensaje("Unido a sala ✅");
        }

        if (data.tipo === "inicio") {
          setScreen("game");
        }

      } catch (e) {
        console.log("Error parseando:", e);
      }
    };
  }, [ws]);

  const crearSala = () => {
    ws.send(JSON.stringify({
      tipo: "crear_sala",
      nombre: nombre
    }));
  };

  const unirseSala = () => {
    ws.send(JSON.stringify({
      tipo: "unirse_sala",
      codigo: codigo,
      nombre: nombre
    }));
  };

  const iniciarJuego = () => {
    ws.send(JSON.stringify({
      tipo: "iniciar"
    }));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>🎮 Lobby</Text>

      <TouchableOpacity style={styles.btn} onPress={crearSala}>
        <Text>Crear Sala</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Código sala"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={unirseSala}>
        <Text>Unirse</Text>
      </TouchableOpacity>

      <Text>{mensaje}</Text>

      <Text style={styles.codigo}>Sala: {codigoSala}</Text>

      <Text style={styles.sub}>👥 Jugadores:</Text>
      {jugadores.map((j, i) => (
        <Text key={i}>• {j}</Text>
      ))}

      {esHost && (
        <TouchableOpacity style={styles.btnStart} onPress={iniciarJuego}>
          <Text style={{color:"white"}}>INICIAR PARTIDA</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex:1, alignItems:"center", justifyContent:"center" },

  titulo: { fontSize:22, marginBottom:10 },

  input: {
    borderWidth:1,
    width:200,
    margin:5,
    padding:5
  },

  btn: {
    backgroundColor:"#ccc",
    padding:10,
    margin:5
  },

  btnStart: {
    backgroundColor:"green",
    padding:12,
    marginTop:15
  },

  codigo: { marginTop:10 },

  sub: { marginTop:10, fontWeight:"bold" }
});