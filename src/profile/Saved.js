import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, WebView, Dimensions, FlatList, Image } from 'react-native';
import * as firebase from "firebase";
import { _getSavedDeals } from './../components/loadData';
import Navbar from './../components/navbar';
import TabBar from './../components/tabbar';
const {width, height} = Dimensions.get('window');


// class
class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myUID: '',
      savedDeals: []
    }


    this._renderItem = this._renderItem.bind(this);
    this._removeDeal = this._removeDeal.bind(this);
    this._openPost = this._openPost.bind(this);
  }


  // render
  render() {
    return (
      <View style={styles.container}>
        {/* nav bar */}
        <Navbar navtitle={'SAVED DEALS'} />


        {/* list of posts */}
        <FlatList
          data={this.state.savedDeals}
          contentContainerStyle={styles.postsList}
          renderItem={({item}) => this._renderItem(item)}
        />


        {/* nav tab bar */}
        <TabBar navigator={this.props.navigation} currentScreen={'Bad'} />
      </View>
    );
  }


  // will will load
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      _getSavedDeals(user.uid).then((deals) => {
        this.setState({savedDeals: deals, myUID: user.uid});
      });
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
        <Text style={styles.postContent}>{item.content}</Text>


        {/* link */}
        <WebView
          source={{uri: 'https://www.youtube.com'}}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          decelerationRate={"normal"}
          automaticallyAdjustContentInsets={false}
        />


        {/* save button */}
        <TouchableOpacity style={styles.postDeleteBtn} onPress={() => this._removeDeal(item.key)}>
          <Image style={styles.postDeleteImg} source={require('./../components/*images/delete.png')} />
        </TouchableOpacity>
      </View>
    );
  }


  // open post
  _openPost(key, author, goodBad, title, content, link, timestamp, uid) {
    const { navigate } = this.props.navigation;
    navigate('MoreInfo', {key: key, author: author, goodBad: goodBad, title: title, content: content, link: link, timestamp: timestamp, uid: uid});
  }


  // delete deal
  _removeDeal(key) {
    firebase.database().ref().child(`users/${this.state.myUID}/savedDeals/${key}`).remove()
    .then(() => {
      _getSavedDeals(this.state.myUID).then((deals) => {
        this.setState({savedDeals: deals});
      });
      alert('Successfully Deleted!!');
    });
  }
}


// styling
const styles = StyleSheet.create({
  container: {
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
    height: 85,
    marginTop: 10,
    alignSelf: 'center',
    width: width * 0.80
  },
  postContent: {
    paddingLeft: 10,
    paddingRight: 10
  },
  postDeleteBtn: {
    right: 15,
    bottom: 15,
    position: 'absolute'
  },
  postDeleteImg: {
    width: 40,
    height: 40
  }
});


// export
export default Saved;