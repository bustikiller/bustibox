import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { accountingRowStyle, accountingRowTextStyle } from "../services/Styles"

export class AccountingRow extends React.Component {

  render() {
    return (
      <View style={{ backgroundColor: "#ccc" }} >
        <TouchableOpacity 
          onPress={ () => { return this.onPress(); } } >
          <View style={ accountingRowStyle() } >
            <Text style={ accountingRowTextStyle() }>{ this.getText() }</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
