import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import Login from "../services/Login.js";
import Database from "../services/Database.js";
import Child from "../components/Child.js";

export default class ChildrenScreen extends React.Component {
  static navigationOptions = {
    title: "Educandos"
  };

  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
    new Database().fetchNodes("educando", nodes => {
      let sortedNodes = nodes.sort((a, b) => {
        if (a.unidad > b.unidad) {
          return 1;
        }
        if (a.unidad < b.unidad) {
          return -1;
        }
        return 0;
      });
      let filteredNodes = sortedNodes.filter(node => {
        return (
          node.lista_de_espera === "0" &&
          node.educandos_bajas_pendientes === "0" &&
          node.educandos_altas_pendientes === "0"
        );
      });
      this.setState({ children: filteredNodes });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <View>
          {this.state.children.map((node, i) => {
            return (
              <Child
                key={i}
                nid={node.nid}
                title={node.title}
                unidad={node.unidad}
                primer_apellido={node.primer_apellido}
                segundo_apellido={node.segundo_apellido}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
