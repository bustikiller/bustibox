import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import AccountingSeat from "../components/AccountingSeat.js";

export default class AccountingSeatScreen extends React.Component {
  static navigationOptions = {
    title: "Asiento contable"
  };

  constructor(props) {
    super(props);
    this.state = {
      seat: this.props.navigation.state.params.seat
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <View>
          <Text>{this.state.seat.title}</Text>
        </View>
      </ScrollView>
    );
  }
}
