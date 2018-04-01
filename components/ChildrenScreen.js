import React, { Component } from "react";
import { Text, View, Button } from "react-native";
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
      this.setState({ children: nodes });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <Text>Helloworld there are {this.state.children.length} nodes</Text>
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
      </View>
    );
  }
}
