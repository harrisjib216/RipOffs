import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as firebase from "firebase";
const {width, height} = Dimensions.get('window');


// class
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }


    this._navigate = this._navigate.bind(this);
    this._loginEP = this._loginEP.bind(this);
  }


  // render
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>


        {/* tiles && welcome */}
        <Text style={styles.welcomeLabel}>RipOffs</Text>
        <View style={styles.underline}/>
        <Text style={styles.welcomeSub}>Finally.. an app to find deals and rip-offs</Text>
        

        {/* auth container */}
        <View style={styles.authCont}>
          {/* email field */}
          <TextInput
            placeholder={'Email'}
            style={styles.emailField}
            placeholderColor={'white'}
            onChangeText={(email) => this.setState({email: email})}
          />


          {/* password field */}
          <TextInput
            secureTextEntry={true}
            placeholder={'Password'}
            placeholderColor={'white'}
            style={styles.passwordField}
            onChangeText={(password) => this.setState({password: password})}
          />

          {/* login button */}
          <TouchableOpacity style={styles.loginBtn} onPress={this._loginEP}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>


        {/* create account btn */}
        <TouchableOpacity style={styles.createBtn} onPress={() => this._navigate('SignUp')}>
          <Text style={styles.createText}>create account instead?</Text>
        </TouchableOpacity>


        {/* footer */}
        <View style={styles.footerView}>
          <Text style={styles.footerLogo}>IFAA, LLC</Text>
          <Text style={styles.footerContact}>Contact us to build your app at</Text>
          <Text style={styles.footerEmail}>ifaadev@gmail.com</Text>          
        </View>
      </ScrollView>
    );
  }


  // navigate to signup
  _navigate(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }


  // login with email && pass
  _loginEP() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    
    // navigate to feed
    .then(() => {
      const { navigate } = this.props.navigation;
      navigate('Feed');
    })
    .catch((error) => {
      alert(error);
    });
  }
}


// styling
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F8F9FB'
  },


  // welcome
  welcomeLabel: {
    fontSize: 72,
    marginTop: 40,
    color: '#79838C',
    fontWeight: 'bold'
  },
  underline: {
    width: 120,
    height: 10,
    backgroundColor: '#92B0CE'
  },
  welcomeSub: {
    fontSize: 22,
    marginTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#79838C',
    fontWeight: 'bold',
    textAlign: 'center',
  },


  // auth
  authCont: {
    marginTop: height * 0.22
  },
  emailField: {
    height: 55,
    fontSize: 20,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  passwordField: {
    height: 55,
    fontSize: 20,
    marginTop: 20,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  loginBtn: {
    height: 60,
    marginTop: 15,
    borderRadius: 30,
    width: width * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2979ff'
  },
  loginText: {
    fontSize: 22,
    color: 'white'
  },


  // create
  createBtn: {
    alignSelf: 'center',
    marginTop: height * 0.10
  },
  createText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#79838C',
    fontWeight: '800'
  },


  // footer
  footerView: {
    height: 140,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01579b'
  },
  footerLogo: {
    fontSize: 22,
    color: 'white',
    fontWeight: '800'
  },
  footerContact: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
    fontWeight: '700'
  },
  footerEmail: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
  }
});


// export
export default Login;