import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import Login from "../services/Login.js";
import NodeLoader from "../services/NodeLoader.js";
import Database from "../services/Database.js";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Menú Principal"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <Button
          onPress={() => {
            new Login().logout(() => {
              navigate("Login");
            });
          }}
          title="Cerrar sesión"
          color="#598463"
        />
        <Button
          onPress={() => {
            navigate("Children");
          }}
          title="Educandos"
          color="#598463"
        />
        <Button
          onPress={() => {
            new Database().getCheckpoint((checkpoint) => {
              new NodeLoader(checkpoint).load();
            });
          }}
          title="Actualizar datos"
          color="#598463"
        />
      </View>
    );
  }
}
