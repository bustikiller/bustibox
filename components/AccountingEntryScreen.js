import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import AccountingEntry from "../components/AccountingEntry.js";

export default class AccountingEntryScreen extends React.Component {
  static navigationOptions = {
    title: "Partida contable"
  };

  constructor(props) {
    super(props);
    this.state = {
      entry: this.props.navigation.state.params.entry
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <View>
          <Text>{this.state.entry.node.title} {this.state.entry.node.total}€</Text>
          <Text>Partidas Contables</Text>
          {this.state.entry.children.map((childEntry, i) => {
            return (
              <AccountingEntry
                key={i}
                entry={childEntry}
                navigation={navigate}
              />
            );
          })}
          <Text>Asientos Contables</Text>
        </View>
      </ScrollView>
    );
  }
}
