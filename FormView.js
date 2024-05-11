import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { openDatabaseAsync } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default function FormView() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await openDatabaseAsync("database.db");
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS dados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            sobrenome TEXT,
            email TEXT,
            idade TEXT,
            endereco TEXT
          );
        `);
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    };

    initializeDatabase();
  }, []);

  const handleSubmit = async () => {
    try {
      const db = await openDatabaseAsync("database.db");
      await db.runAsync(
        "INSERT INTO dados (nome, sobrenome, email, idade, endereco) VALUES (?, ?, ?, ?, ?)",
        [nome, sobrenome, email, idade, endereco]
      );

      console.log("Dados inseridos com sucesso!");
      // Limpar os campos após o envio do formulário
      setNome("");
      setSobrenome("");
      setEmail("");
      setIdade("");
      setEndereco("");
      // Mostrar a mensagem de sucesso
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
      }, 4000);
    } catch (error) {
      console.error("Erro ao inserir os dados:", error);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 4000);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Sagah</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Na prática</Text>
          <Text style={styles.label}>Nome:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <Text style={styles.label}>Sobrenome:</Text>
          <TextInput
            style={styles.input}
            value={sobrenome}
            onChangeText={setSobrenome}
          />
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "blue" }]}
            onPress={() => navigation.navigate("Visualização de Dados")}
          >
            <Text style={styles.buttonText}>Dados dos Pais</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
          {successVisible && (
            <View style={styles.successMessage}>
              <Text style={styles.messageText}>
                Dados inseridos com sucesso!
              </Text>
            </View>
          )}
          {errorVisible && (
            <View style={styles.errorMessage}>
              <Text style={styles.messageText}>Erro ao inserir os dados.</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  container1: { flex: 1, backgroundColor: "#fff", padding: 20 },
  navbar: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarTitle: { fontSize: 20, fontWeight: "bold" },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  successMessage: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  errorMessage: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  messageText: { color: "#fff", textAlign: "center" },
});
