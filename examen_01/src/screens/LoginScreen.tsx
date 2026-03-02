import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setLocalError("Please fill all fields");
      return;
    }

    setLocalError("");
    dispatch(loginUser({ username, password }));
  };

  
  useEffect(() => {
    if (token) {
      navigation.replace("Home");
    }
  }, [token]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fdfdfd" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: "black" }]}>
                Login
            </Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {localError ? (
            <Text style={styles.error}>{localError}</Text>
          ) : error ? (
            <Text style={styles.error}>
              Incorrect username or password
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "white",
  },
  input: {
    backgroundColor: "#3d3737",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: "white",
  },
  button: {
    backgroundColor: "#3d3737",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});