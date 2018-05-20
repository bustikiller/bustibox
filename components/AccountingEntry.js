import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class AccountingEntry extends React.Component {

  render() {
    return (
      <View
        style={{
          padding: 5,
          marginVertical: 5,
          backgroundColor: '#cccccc'
        }}
      >
        <Text>
          {this.props.node.title} {this.props.node.total}€
        </Text>
      </View>
    );
  }
}
