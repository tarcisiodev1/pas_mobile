import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

export default function DataView() {
  const [data, setData] = useState(null); // Estado para armazenar os dados do banco de dados

  useEffect(() => {
    // Recuperar dados do banco de dados ao montar o componente
    fetchDataFromDB();
  }, []);

  // Função para recuperar os dados do banco de dados
  const fetchDataFromDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM dados",
        [],
        (_, { rows }) => {
          // Atualizar o estado com os dados recuperados do banco de dados
          setData(rows._array);
        },
        (_, error) => {
          console.error("Erro ao recuperar os dados do banco de dados:", error);
        }
      );
    });
  };

  // Função para excluir um item de dados com o ID fornecido
  const deleteData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM dados WHERE id = ?",
        [id],
        () => {
          console.log("Dado excluído com sucesso!");
          //Recuperar novamente os dados atualizados do banco de dados
          fetchDataFromDB();
        },
        (_, error) => {
          console.error("Erro ao excluir o dado:", error);
        }
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Dados Inseridos</Text>
        {data && data.length > 0 ? (
          <View style={styles.dataContainer}>
            {data.map((item) => (
              <View key={item.id} style={styles.dataItem}>
                <Text>Nome: {item.nome}</Text>
                <Text>Sobrenome: {item.sobrenome}</Text>
                <Text>E-mail: {item.email}</Text>
                <Text>Idade: {item.idade}</Text>
                <Text>Endereço: {item.endereco}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteData(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.message}>Nenhum dado encontrado.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dataItem: {
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
