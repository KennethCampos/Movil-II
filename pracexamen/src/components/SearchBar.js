import React from "react";
import { View, TextInput, Button } from "react-native";

export default function SearchBar({ keyword, setKeyword, onSearch }) {
  return (
    <View style={{ marginVertical: 15 }}>
      <TextInput
        placeholder="Buscar por nombre..."
        value={keyword}
        onChangeText={setKeyword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      />

      <Button title="Buscar" onPress={onSearch} />
    </View>
  );
}