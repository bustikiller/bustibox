import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button} from 'react-native';
import Login from '../services/Login.js'
import NodeLoader from '../services/NodeLoader.js'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Inicio de sesión',
  };

  constructor(props) {
     super(props);
     this.state = {
        username: null,
        password: null
     }
  }

  render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={{padding: 30, flex: 1, backgroundColor: '#f6f6f6'}}>
          <View style={{flex: 1}} />
          <View style={{flex: 1}}>
            <TextInput
              style={{height: 40}}
              placeholder="Usuario"
              onChangeText={(text) => { this.setState({username: text}); }}
            />

            <TextInput
              secureTextEntry={true}
              style={{height: 40}}
              placeholder="Contraseña"
              onChangeText={(text) => { this.setState({password: text}); }}
            />

            <Button
              onPress={() => {
                  new Login().login(this.state.username, this.state.password, () => {
                    navigate('Home');
                    new NodeLoader().load();
                  });
              }}
              title="Iniciar Sesión"
              color="#598463"
            />
          </View>
          <View style={{flex: 1}} />
        </View>
      );
    }
}