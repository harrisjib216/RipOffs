import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, ScrollView, WebView } from 'react-native';
import * as firebase from "firebase";
import Navbar from './../components/navbar';
import TabBar from './../components/tabbar';
const {width, height} = Dimensions.get('window');


// class
class Bad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myUID: '',
    }


    this._goBack = this._goBack.bind(this);
    this._savePost = this._savePost.bind(this);
  }


  // render
  render() {
    const {state} = this.props.navigation;
    return (
      <ScrollView>
        {/* nav bar */}
        <View style={styles.navbar}>
          {/* back button */}
          <TouchableOpacity style={styles.backBtn} onPress={this._goBack}>
            <Image style={styles.backImg} source={require('./../components/*images/left.png')}/>
          </TouchableOpacity>


          {/* title */}
          <Text style={styles.welcomeLabel}>MORE INFO</Text>


          {/* underline */}
          <View style={styles.underline}/>
        </View>


        {/* post title */}
        <Text style={styles.postTitle}>{this.props.title}</Text>


        {/* author and date */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.postAuthor}>{state.params.author}</Text>
          <Text style={styles.postDate}>{state.params.timestamp}</Text>
        </View>


        {/* deal type */}
        <View style={{flexDirection: 'row', marginTop: 5, width: width}}>
          <Text style={styles.postDealType}>Deal type: </Text>
          <Text style={state.params.goodBad ? styles.postGG : styles.postGB}>good {state.params.goodBad}</Text>
        </View>


        {/* post content */}
        <Text style={styles.contentTitle}>Content</Text>
        <View style={styles.postContainer}>
          <Text style={styles.postContent}>{state.params.content}</Text>
        </View>


        {/* deal webview */}
        <Text style={styles.websiteTitle}>Website</Text>
        <View style={{width: width * 0.95, backgroundColor: '#bbdefb', alignSelf: 'center', borderRadius: 20}}>
          <WebView
            source={{uri: state.params.link}}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            decelerationRate={"normal"}
            automaticallyAdjustContentInsets={false}
          />
        </View>


        {/* save button */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => this._savePost(state.params.key, state.params.author, state.params.goodBad, state.params.title, state.params.content, state.params.link, state.params.timestamp, state.params.uid)}>
          <Text style={styles.saveText}>Save Deal</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }


  // load data
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({myUID: user.uid});
    });
  }


  // back btn
  _goBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }


  // save post
  _savePost(key, author, goodBad, title, content, link, timestamp, uid) {
    const postDeal = {
      author: author,
      content: content,
      goodBad: goodBad,
      link: link,
      timestamp: timestamp,
      title: title,
      uid: uid
    };


    firebase.database().ref().child(`users/${this.state.myUID}/savedDeals/${key}`).set(postDeal)
    .then(() => {
      alert('Success!!');
    });
  }
}


// styling
const styles = StyleSheet.create({
  // navbar
  navbar: {
    height: 80,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92B0CE'
  },
  backBtn: {
    top: 20,
    left: 10,
    position: 'absolute'
  },
  backImg: {
    width: 40,
    height: 40
  },
  welcomeLabel: {
    fontSize: 32,
    color: 'white',
    fontWeight: '700'
  },
  underline: {
    height: 5,
    width: 110,
    marginTop: 3,
    backgroundColor: '#D6DFE3'
  },

  
  // title
  postTitle: {
    fontSize: 38,
    marginTop: 20,
    marginLeft: 20,
    color: '#2F3030',
    fontWeight: '800'
  },


  // author && date
  postAuthor: {
    fontSize: 26,
    marginLeft: 20,
    color: 'black',
    fontWeight: '700'
  },
  postDate: {
    right: 20,
    fontSize: 18,
    color: '#79838C',
    fontWeight: '600',
    position: 'absolute'
  },


  // type
  postDealType: {
    fontSize: 22,
    marginLeft: 20,
    color: '#79838C',
    fontWeight: '600'
  },
  postGG: {
    fontSize: 22,
    color: 'green',
    marginLeft: 2,
    fontWeight: '600'
  },
  postGB: {
    color: 'red',
    fontSize: 22,
    marginLeft: 2,
    fontWeight: '600'
  },


  // content
  contentTitle: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 20,
    color: '#79838C',
    fontWeight: '600'
  },
  postContainer: {
    marginTop: 10,
    borderRadius: 20,
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#bbdefb'
  },
  postContent: {
    fontSize: 16,
    marginTop: 8,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#212121',
    fontWeight: '600'
  },


  // webview
  websiteTitle: {
    fontSize: 24,
    marginTop: 40,
    marginLeft: 20,
    color: '#79838C',
    fontWeight: '600'
  },
  webview: {
    marginTop: 10,
    height: height,
    alignSelf: 'center',
    width: width * 0.90
  },


  // save btn
  saveBtn: {
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
  saveText: {
    fontSize: 24,
    color: 'white'
  }
});


// export
export default Bad;