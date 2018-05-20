import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import Database from "../services/Database.js";
import AccountingYearTree from "../services/AccountingYearTree.js"
import AccountingEntry from "../components/AccountingEntry.js"

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
    console.log("Running componentDidMount");
    const tree = new AccountingYearTree(this.state.year);
    tree.build(() => {
      this.setState({
        year: 2018, 
        tree: tree
      })      
    });
  }

  render() {
    console.log("Rendering AccountingYearScreen");
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{ padding: 30, flex: 1, backgroundColor: "#f6f6f6" }}>
        <View>
          {this.state.tree && this.state.tree.entries.map((entry, i) => {
            return (
              <AccountingEntry
                key={i}
                node={entry.node}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
