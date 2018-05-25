import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import Database from "../services/Database.js";
import AccountingYearTree from "../services/AccountingYearTree.js";
import AccountingEntry from "../components/AccountingEntry.js";
import { basicScreen } from "../services/Styles";

export default class AccountingYearScreen extends React.Component {
  static navigationOptions = {
    title: "Año contable"
  };

  constructor(props) {
    super(props);
    this.state = {
      year: 2018, 
      tree: null
    };
  }

  componentDidMount() {
    const tree = new AccountingYearTree(this.state.year);
    tree.build(() => {
      this.setState({
        year: 2018, 
        tree
      });    
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={ basicScreen() }>
        <View>
          {this.state.tree && this.state.tree.entries.map((entry, i) => {
            return (
              <AccountingEntry
                key={i}
                entry={entry}
                navigation={navigate}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
