import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class AccountingSeat extends React.Component {

  render() {
    const navigate = this.props.navigation;
    return (
      <View
        style={{
          padding: 5,
          marginVertical: 5,
          backgroundColor: "#cccccc"
        }}
      >
        <Button
          title={this.getText()}
          onPress={() => {
            navigate("AccountingSeat", { seat: this.props.seat });
          }}
        />
      </View>
    );
  }

  getText() {
    return (this.props.seat.title);
  }
}
