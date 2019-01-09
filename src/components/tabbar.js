import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
const {width} = Dimensions.get('window');


// class
class Tabbar extends Component {
  constructor(props) {
    super(props);
    this._navigate = this._navigate.bind(this);
    this._toggleDeals = this._toggleDeals.bind(this);
  }


  // render
  render() {
    return (
      <View style={styles.footerview}>

        {/* profile btn */}
        <TouchableOpacity style={styles.footerBtns} onPress={() => this._navigate('Profile')}>
          <Image style={styles.buttonImgs} source={require('./*images/profile.png')} />
          <Text style={styles.buttonsText}>Profile</Text>
        </TouchableOpacity>


        {/* saved deals btn */}
        <TouchableOpacity style={styles.footerBtns} onPress={() => this._navigate('Saved')}>
          <Image style={styles.buttonImgs} source={require('./*images/saved.png')} />
          <Text style={styles.buttonsText}>Saved</Text>
        </TouchableOpacity>


        {/* create deals btn */}
        <TouchableOpacity style={styles.footerBtns} onPress={() => this._navigate('Post')}>
          <Image style={styles.buttonImgs} source={require('./*images/create.png')} />
          <Text style={styles.buttonsText}>Create</Text>
        </TouchableOpacity>


        {/* good/bad btn */}
        <TouchableOpacity style={styles.footerBtns} onPress={this._toggleDeals}>
          <Image style={styles.buttonImgs} source={require('./*images/cycle.png')} />
          <Text style={styles.buttonsText}>Good/Bad</Text>
        </TouchableOpacity>
      </View>
    );
  }


  // navigate
  _navigate(screen) {
    const navigator = this.props.navigator;
    navigator.navigate(screen);
  }


  // toggle type
  _toggleDeals() {
    const navigator = this.props.navigator;
    switch(this.props.currentScreen) {
      case 'Feed':
        navigator.navigate('Good');
        break;
      case 'Good':
        navigator.navigate('Bad');
        break;
      case 'Bad':
        navigator.navigate('Feed');
        break;
    }
  }
}


// styling
const styles = StyleSheet.create({
  footerview: {
    bottom: 0,
    height: 50,
    width: width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#92B0CE'
  },
  footerBtns: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ((width / 10) / 4) + 8,
  },
  buttonImgs: {
    width: 30,
    height: 30
  },
  buttonsText: {
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center'
  }
});


// export
export default Tabbar;