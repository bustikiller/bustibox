import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import AccountingEntry from "../components/AccountingEntry.js";
import AccountingSeat from "../components/AccountingSeat.js";

import { header1, header2, basicScreen } from "../services/Styles";

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
    return (
      <ScrollView style={ basicScreen() }>
        <View>
          <Text style={ header1() }>{this.state.entry.node.title} {this.state.entry.node.total}€</Text>
          { this.renderAccountingEntries() }
          { this.renderAccountingSeats() }
        </View>
      </ScrollView>
    );
  }

  renderAccountingEntries() {
    const { navigate } = this.props.navigation;
    if(this.state.entry.children.length > 0) {
      return(
        <View>
          <Text style={ header2() }>Partidas Contables</Text>
          { this.state.entry.children.map((childEntry, i) => {
            return (
              <AccountingEntry
                key={i}
                entry={childEntry}
                navigation={navigate}
              />
            );
          })}
        </View>
      );
    }
  }

  renderAccountingSeats() {
    const { navigate } = this.props.navigation;
    if(this.state.entry.leaves.length > 0) {
      return(
        <View>
          <Text style={ header2() }>Asientos Contables</Text>
          {this.state.entry.leaves.map((seat, i) => {
            return (
              <AccountingSeat
                key={i}
                seat={seat}
                navigation={navigate}
              />
            );
          })}
        </View>
      );
    }
  }
}
