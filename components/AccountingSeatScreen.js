import React, { Component } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import AccountingSeat from "../components/AccountingSeat.js";
import Moment from 'moment';
import { basicScreen, header1, header2 } from "../services/Styles";

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
    console.log(JSON.stringify(this.state.seat));
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={ basicScreen() }>
        <View>
          <Text style={ header1() }>{this.state.seat.title} {this.state.seat.importe}€</Text>
          <Text style={ header2() }>{Moment(this.state.seat.fecha).format("DD/MM/YYYY")}</Text>
        </View>
      </ScrollView>
    );
  }
}
