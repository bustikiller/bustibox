import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding: 30, flex: 1, backgroundColor: '#f6f6f6'}}>
        <View style={{flex: 1}} />
        <View style={{flex: 1}}>
          <TextInput
            style={{height: 40}}
            placeholder="Usuario"
            onChangeText={(text) => {}}
          />

          <TextInput
            secureTextEntry={true}
            style={{height: 40}}
            placeholder="Contraseña"
            onChangeText={(text) => {}}
          />

          <Button
            onPress={() => {}}
            title="Iniciar Sesión"
            color="#598463"
          />
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }
}
