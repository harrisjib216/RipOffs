import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, FlatList, ScrollView, Image, WebView } from 'react-native';
import * as firebase from "firebase";
import { _getDeals } from './../components/loadData';
import Navbar from './../components/navbar';
import TabBar from './../components/tabbar';
const {width, height} = Dimensions.get('window');


// class
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myUID: '',
      deals: []
    }


    this._renderItem = this._renderItem.bind(this);
    this._openPost = this._openPost.bind(this);
    this._savePost = this._savePost.bind(this);
  }


  // render
  render() {
    return (
      <View style={styles.container}>
        {/* nav bar */}
        <Navbar navtitle={'HOME'} underlineWidth={60} />


        {/* list of posts */}
        <FlatList
          data={this.state.deals}
          contentContainerStyle={styles.postsList}
          renderItem={({item}) => this._renderItem(item)}
        />


        {/* nav tab bar */}
        <TabBar navigator={this.props.navigation} currentScreen={'Feed'} />
      </View>
    );
  }


  // will will load
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        const { navigate } = this.props.navigation;
        navigate('Login');
      }
      else {
        _getDeals().then((deals) => {
          this.setState({deals: deals, myUID: user.uid});
        });
      }
    });
  }

  
  // make post
  _renderItem(item) {
    var goodBad;
    if (item.goodBad == true) {
      goodBad = <Text style={styles.goodBG}>good</Text>;
    }
    else {
      goodBad = <Text style={styles.goodBB}>bad</Text>;
    }


    return (
      <View style={styles.postContainer}>
        {/* author, rating */}
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          {goodBad}
        </View>


        {/* title */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this._openPost(item.key, item.author, item.goodBad, item.title, item.content, item.link, item.timestamp, item.uid)}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </TouchableOpacity>


          <Text style={styles.postTime}>{item.timestamp}</Text>
        </View>


        {/* content */}
        <View style={{maxHeight: 150}}>
          <ScrollView>
            <Text style={styles.postContent}>{item.content}</Text>
          </ScrollView>
        </View>


        {/* link */}
        <WebView
          source={{uri: item.link}}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          decelerationRate={"normal"}
          automaticallyAdjustContentInsets={false}
        />


        {/* save button */}
        <TouchableOpacity style={styles.postSaveBtn} onPress={() => this._savePost(item.key, item.author, item.goodBad, item.title, item.content, item.link, item.timestamp, item.uid)}>
          <Image style={styles.postSaveImg} source={require('./../components/*images/saved.png')} />
        </TouchableOpacity>
      </View>
    );
  }


  // open post
  _openPost(key, author, goodBad, title, content, link, timestamp, uid) {
    const { navigate } = this.props.navigation;
    navigate('MoreInfo', {key: key, author: author, goodBad: goodBad, title: title, content: content, link: link, timestamp: timestamp, uid: uid});
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
  container: {
    width: width,
    height: height,
    alignItems: 'center'
  },


  // posts
  postsList: {
    marginTop: 10
  },
  postContainer: {
    height: 500,
    marginTop: 20,
    borderRadius: 10,
    shadowOpacity: 0.7,
    width: width * 0.90,
    alignSelf: 'center',
    shadowColor: '#212121',
    backgroundColor: '#e0e0e0',
    shadowOffset:{width: 0, height: 5}
  },
  postAuthor: {
    fontSize: 22,
    color: 'black',
    marginLeft: 10,
    fontWeight: '700'
  },
  goodBG: {
    right: 8,
    fontSize: 22,
    color: 'green',
    fontWeight: '700',
    position: 'absolute'
  },
  goodBB: {
    right: 8,
    color: 'red',
    fontSize: 22,
    fontWeight: '700',
    position: 'absolute'
  },
  postTitle: {
    fontSize: 15,
    marginTop: 3,
    marginLeft: 10,
    color: '#79838C',
    fontWeight: '600'
  },
  postTime: {
    right: 5,
    fontSize: 16,
    marginTop: 3,
    color: '#79838C',
    fontWeight: '600',
    position: 'absolute'
  },
  webview: {
    maxHeight: 275,
    marginTop: 10,
    alignSelf: 'center',
    width: width * 0.80
  },
  postContent: {
    paddingLeft: 10,
    paddingRight: 10
  },
  postSaveBtn: {
    right: 15,
    bottom: 15,
    position: 'absolute'
  },
  postSaveImg: {
    width: 40,
    height: 40
  }
});


// export
export default Feed;