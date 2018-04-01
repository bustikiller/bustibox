import {ToastAndroid} from 'react-native';
import NodeLoader from '../services/NodeLoader.js'

export default class Login {

    login(username, password, callback){
        this.getToken((token) => {
            this.performLoginRequest(username, password, token, (sessionInfo) => {
                console.log(sessionInfo);
                callback();
            })
        });
    }

    logout(callback) {
        new NodeLoader().clearAll(() => {
            this.getToken((token) => {
                this.performLogoutRequest(token, callback);
            });
        });
    }

    performLogoutRequest(token, callback) {
        fetch('http://kimball.com.es/api/user/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
          },
          body: JSON.stringify({})
        })
        .then(callback)
        .catch((error) => {
          ToastAndroid.show("Error cerrando sesión", ToastAndroid.SHORT);
        });
    }

    performLoginRequest(username, password, token, callback){
        fetch('http://kimball.com.es/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then(response => {
            if (response.status === 200 || response.status === 406 ) {
                return response;
            } else {
                console.log('Response status = ' + response.status);
                throw Error(response.statusText);
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log("data = " + data);
            callback(data);
        })
        .catch((error) => {
          ToastAndroid.show("Usuario o contraseña incorrectos", ToastAndroid.SHORT);
        });
    }

    getToken(callback){
        fetch('http://kimball.com.es/services/session/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        })
        .then((response) => {
            response.text().then((text) =>{
                callback(text);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
}