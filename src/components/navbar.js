import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');


// class
class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  // render
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeLabel}>{this.props.navtitle}</Text>
      </View>
    );
  }
}


// styling
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    justifyContent: 'center',
    backgroundColor: '#92B0CE'
  },
  welcomeLabel: {
    fontSize: 28,
    marginTop: 20,
    marginLeft: 30,
    color: 'white',
    fontWeight: '800'
  },
});


// export
export default Navbar;