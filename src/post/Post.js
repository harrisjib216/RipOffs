import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from "firebase";
import Navbar from './../components/navbar';
import TabBar from './../components/tabbar';
import RadioButton from 'react-native-radio-button';
import { _getMyData } from './../components/loadData';
const {width, height} = Dimensions.get('window');


// class
class Post extends Component {
  constructor(props) {
    super(props);
    const p = new Date();
    this.state = {
      myUID: '',
      myName: '',
      postTitle: '',
      postGoodBad: true,
      postContent: '',
      postLink: '',
      date: `${p.getMonth() + 1}/${p.getDate()}/${p.getFullYear()}`,
      timestamp: '',
    }


    this._createPost = this._createPost.bind(this);
    this._navigate = this._navigate.bind(this);
  }


  // render
  render() {
    return (
      <ScrollView>
        {/* nav bar */}
        <Navbar navtitle={'UPLOAD YOUR DEAL'} />


        {/* post title field */}
        <View style={styles.postContainers}>
          <Text style={styles.postTitle}>title</Text>
          <TextInput
            style={styles.titleField}
            placeholder={'great deal on computers!!'}
            onChangeText={(title) => this.setState({postTitle: title})}
          />
        </View>


        {/* good/bad field */}
        <View style={styles.goodBadContainer}>
          {/* title */}
          <Text style={styles.postGB}>good/bad</Text>


          {/* good */}
          <View style={styles.goodView}>
            <RadioButton
              animation={'bounceIn'}
              outerColor={'#1b5e20'}
              innerColor={'#388e3c'}
              isSelected={this.state.postGoodBad}
              onPress={() => this.setState({postGoodBad: true})}
            />
            <Text style={styles.goodText}>Good</Text>
          </View>


          {/* bad */}
          <View style={styles.badView}>
            <RadioButton
              animation={'bounceIn'}
              outerColor={'#c62828'}
              innerColor={'#d32f2f'}
              isSelected={!this.state.postGoodBad}
              onPress={() => this.setState({postGoodBad: false})}
            />
            <Text style={styles.badText}>Bad</Text>
          </View>
        </View>


        {/* post content field */}
        <View style={styles.contentContainer}>
          <Text style={styles.postContent}>content</Text>
          <TextInput
            multiline={true}
            style={styles.contentField}
            onChangeText={(content) => this.setState({postContent: content})}
            placeholder={'Just found a great deal on computers!! All the computers are 15% off until September 2054'}
          />
        </View>


        {/* post link field */}
        <View style={styles.postContainers}>
          <Text style={styles.postLink}>link</Text>
          <TextInput
            style={styles.linkField}
            placeholder={'https://www.yoursitehere'}
            onChangeText={(link) => this.setState({postLink: link})}
          />
        </View>


        {/* upload button */}
        <TouchableOpacity style={styles.uploadBtn} onPress={this._createPost}>
          <Text style={styles.uploadText}>Upload Deal</Text>
        </TouchableOpacity>


        {/* nav tab bar */}
        <TabBar navigator={this.props.navigation} currentScreen={'Bad'} />
      </ScrollView>
    );
  }


  // view will load
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      _getMyData(user.uid).then((myData) => {
        this.setState({myUID: myData.uid, myName: myData.name});
      });
    });
  }


  // create deal
  _createPost() {
    const key = firebase.database().ref('p').push().key;      
    const postData = {
      uid: this.state.myUID,
      title: this.state.postTitle,
      goodBad: this.state.postGoodBad,
      content: this.state.postContent,
      link: this.state.postLink,
      timestamp: `${this.state.date}`,
      author: this.state.myName
    };


    firebase.database().ref().child(`users/${this.state.myUID}/myDeals/${key}`).set(postData);
    firebase.database().ref().child(`allDeals/${key}`).set(postData).then(() => {
      alert('Deal Uploaded!!');
    });
  }


  // navigate
  _navigate() {
    this.props.navigation.goBack();
  }
}


// styling
const styles = StyleSheet.create({

  // post
  postContainers: {
    height: 70,
    marginTop: 30,
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB'
  },
  postTitle: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '700'
  },
  titleField: {
    fontSize: 16,
    marginLeft: 5,
    color: '#616161',
    fontWeight: '700',
    width: width * 0.7
  },
  goodBadContainer: {
    height: 80,
    marginTop: 30,
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB'
  },
  postGB: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '700'
  },
  goodView: {
    right: 120,
    marginTop: 20,
    position: 'absolute'
  },
  goodText: {
    fontSize: 14,
    marginTop: 5,
    color: '#212121',
    fontWeight: '700'
  },
  badView: {
    right: 40,
    marginTop: 20,
    position: 'absolute'
  },
  badText: {
    fontSize: 14,
    marginTop: 5,
    color: '#212121',
    fontWeight: '700'
  },
  contentContainer: {
    height: 250,
    marginTop: 30,
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#F8F9FB'
  },
  postContent: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: '700'
  },
  contentField: {
    height: 200,
    fontSize: 16,
    color: '#616161',
    fontWeight: '700',
    alignSelf: 'center',
    width: width * 0.85
  },
  postLink: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '700'
  },
  linkField: {
    fontSize: 16,
    marginLeft: 5,
    color: '#616161',
    fontWeight: '700',
    width: width * 0.7
  },


  // upload btn
  uploadBtn: {
    height: 60,
    marginTop: 40,
    borderRadius: 30,
    marginBottom: 80,
    alignSelf: 'center',
    width: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50'
  },
  uploadText: {
    fontSize: 24,
    color: 'white'
  }
});


// export
export default Post;