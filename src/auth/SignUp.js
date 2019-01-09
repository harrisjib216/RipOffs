import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import * as firebase from "firebase";
const {width, height} = Dimensions.get('window');


// class
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      eulaModal: false
    }


    this._navigate = this._navigate.bind(this);
    this._createAccount = this._createAccount.bind(this);
  }


  // render
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        {/* tiles/welcome */}
        <Text style={styles.welcomeLabel}>RipOffs</Text>
        <View style={styles.underline}/>
        <Text style={styles.welcomeSub}>Finally.. an app to find deals and rip-offs</Text>


        {/* auth container */}
        <View style={styles.authCont}>
          {/* name field */}
          <TextInput
            placeholder={'Name'}
            style={styles.nameField}
            onChangeText={(name) => this.setState({name: name})}
          />
          
          
          {/* email field */}
          <TextInput
            placeholder={'Email'}
            style={styles.emailField}
            onChangeText={(email) => this.setState({email: email})}
          />


          {/* password field */}
          <TextInput
            secureTextEntry={true}
            placeholder={'Password'}
            style={styles.passwordField}
            onChangeText={(password) => this.setState({password: password})}
          />


          {/* login button */}
          <TouchableOpacity style={styles.createBtn} onPress={() => this.setState({eulaModal: true})}>
            <Text style={styles.createText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        
        {/* create account btn */}
        <TouchableOpacity style={styles.loginBtn} onPress={() => this._navigate('Login')}>
          <Text style={styles.loginText}>login instead?</Text>
        </TouchableOpacity>


        {/* sign up eula */}
        <Modal visible={this.state.eulaModal} transparent={true}>
          <View style={styles.eulaCont}>
            {/* warning label */}
            <Text style={styles.eulaLabel}>You must agree to the terms in order to use RipOffs</Text>


            {/* eula */}
            <View style={styles.termsCont}>
              <ScrollView>
              <Text style={styles.termsText}>
                End-User License Agreement ("Agreement")
                Last updated: July 1, 2017

                Please read this End-User License Agreement ("Agreement") carefully before clicking the "I Agree" button, downloading or using RipOffs ("Application").

                By clicking the "I Agree" button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this Agreement.

                If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and do not download or use the Application.

                License

                RipOffs grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.

                Restrictions

                I agree that RipOffs is not responsible for anything and everything I do or others do on this app (RipOffs) and on the RipOffs' database; Everything is included.


                I agree not to and agree not to permit others to:

                a) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application or make the Application available to any third party.
                b) create hateful, discriminatory, slanderous, derogatory, unprofessional, obnoxious, offensive, and otherwise libelous comments and/or posts that can and/or will defame reputations or character, and that are in violation of individual Civil Rights protections
                c) create, save, post, false advertisements, slanderous products, scams, schemes, 
                d) purchase and/or sell false advertisements, slanderous products, scams, schemes, 
                e) lure others into illegal activities, commit others into illegal activities, or be lured into illegal activities


                Modifications to Application

                RipOffs reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.

                Term and Termination

                This Agreement shall remain in effect until terminated by you or RipOffs. 

                RipOffs may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.

                This Agreement will terminate immediately, without prior notice from RipOffs, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your desktop.

                Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your desktop.

                Severability

                If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

                Amendments to this Agreement

                RipOffs reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 10 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

                Contact Information

                If you have any questions about this Agreement, please contact us.
              </Text>
              </ScrollView>
            </View>


            {/* confirm btn */}
            <View style={{position: 'absolute', bottom: 0, width: width * 0.85, flexDirection: 'row'}}>
              {/* cancel btn */}
              <TouchableOpacity style={styles.dontBtn} onPress={() => this.setState({eulaModal: false})}>
                <Text style={styles.dontText}>I Do Not Agree</Text>
              </TouchableOpacity>


              {/* confirm btn */}
              <TouchableOpacity style={styles.agreeBtn} onPress={this._createAccount}>
                <Text style={styles.agreeText}>I Agree</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


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


  // create account
  _createAccount() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    
    // create
    .then((user) => {
      const myData = {
        uid: user.uid,
        name: this.state.name,
        email: this.state.email
      };


      firebase.database().ref().child(`users/${user.uid}`).set(myData)
      .then(() => {
        const { navigate } = this.props.navigation;
        navigate('Feed');
      })
      .catch((error) => {
        alert('could not create account at this time :(');
      });
    })


    // error
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
    marginTop: height * 0.10
  },
  nameField: {
    height: 55,
    fontSize: 20,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  usernameField: {
    height: 55,
    fontSize: 20,
    marginTop: 20,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  emailField: {
    height: 55,
    fontSize: 20,
    marginTop: 20,
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
  createBtn: {
    height: 60,
    marginTop: 15,
    borderRadius: 30,
    width: width * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2979ff'
  },
  createText: {
    fontSize: 22,
    color: 'white'
  },


  // eula
  eulaCont: {
    height: 485,
    marginTop: 40,
    marginBottom: 80,
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#e0e0e0'
  },
  eulaLabel: {
    fontSize: 24,
    marginTop: 10,
    marginLeft: 20,
    color: '#757575',
    fontWeight: '700'
  },
  termsCont: {
    height: 335,
    marginTop: 10,
    marginBottom: 80,
    width: width * 0.85,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  termsText: {
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: '600'
  },
  dontBtn: {
    height: 60,
    width: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757575'
  },
  dontText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700'
  },
  agreeBtn: {
    height: 60,
    width: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#039be5'
  },
  agreeText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700'
  },


  // login
  loginBtn: {
    alignSelf: 'center',
    marginTop: height * 0.10
  },
  loginText: {
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
export default SignUp;