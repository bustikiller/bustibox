import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import Login from "../services/Login.js";
import Database from "../services/Database.js";

export default class Child extends React.Component {

  render() {
    return (
      <View
        style={{
          padding: 5,
          marginVertical: 5,
          backgroundColor: this.getBackgroundColor()
        }}
      >
        <Text>
          {this.props.title} {this.props.primer_apellido}{" "}
          {this.props.segundo_apellido}
        </Text>
      </View>
    );
  }

  getBackgroundColor() {
    const colors = {};
    colors["1"] = "#CCF2FF";
    colors["2"] = "#ECFF8F";
    colors["3"] = "#82FF82";
    colors["4"] = "#FFDE88";
    colors["5"] = "#FFCCCC";

    return colors[this.props.unidad];
  }
}
