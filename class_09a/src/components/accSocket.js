import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ws } from '../../App';
import { style_01 } from '../styles/style_01';

const AccSocket = () => {

  const [cartas] = useState([1,2,3,4,5,6,7,8]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [mensajes, setMensajes] = useState('');

  // ✅ recibir mensajes (BIEN hecho)
  useEffect(() => {
    ws.onmessage = (e) => {
      setMensajes(prev => prev + '\n' + e.data);
      console.log("SERVER:", e.data);
    };

    ws.onerror = (e) => {
      console.log("ERROR:", e.message);
    };

  }, []);

  // ✅ seleccionar cartas
  const seleccionar = (num) => {
    if (seleccionadas.includes(num)) return;

    if (seleccionadas.length < 2) {
      setSeleccionadas([...seleccionadas, num]);
    }
  };

  // ✅ enviar jugada
  const enviar = (num) => {
    if (seleccionadas.length !== 2) {
      console.log("Selecciona 2 cartas");
      return;
    }

    const msg = `${seleccionadas.join(",")}|${num}`;
    console.log("ENVIANDO:", msg);

    ws.send(msg);
    setSeleccionadas([]);
  };

  return (
    <View>

      <Text style={style_01.tit_01}>🎮 Juego de Cartas</Text>

      {/* CARTAS */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {cartas.map(n => (
          <TouchableOpacity
            key={n}
            style={{
              backgroundColor: seleccionadas.includes(n) ? "orange" : "#ccc",
              margin: 5,
              padding: 15
            }}
            onPress={() => seleccionar(n)}
          >
            <Text>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ELEGIR FINAL */}
      <Text>Elige cuál usar:</Text>
      <View style={{ flexDirection: "row" }}>
        {seleccionadas.map(n => (
          <TouchableOpacity
            key={n}
            style={{ backgroundColor: "lightblue", margin: 5, padding: 10 }}
            onPress={() => enviar(n)}
          >
            <Text>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MENSAJES */}
      <Text>📩 Resultados:</Text>
      <Text>{mensajes}</Text>

    </View>
  );
};

export default AccSocket;