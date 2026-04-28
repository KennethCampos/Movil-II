import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen({ setNombre, setScreen }) {
  const [input, setInput] = useState("");

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      
      <Text>Ingresa tu nombre</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        style={{ borderWidth:1, width:200, margin:10 }}
      />

      <TouchableOpacity
        onPress={() => {
          setNombre(input);
          setScreen("lobby");
        }}
      >
        <Text>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}