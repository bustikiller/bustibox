import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class AccountingEntry extends React.Component {

  render() {
    const navigate = this.props.navigation;
    return (
      <View
        style={{
          padding: 5,
          marginVertical: 5,
          backgroundColor: '#cccccc'
        }}
      >
        <Button
          title={this.getText()}
          onPress={() => {
            navigate("AccountingEntry", { entry: this.props.entry })
          }}
        />
      </View>
    );
  }

  getText() {
    return (this.props.entry.node.title + " " + this.props.entry.node.total + "€");
  }
}
