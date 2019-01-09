import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, FlatList, TextInput, WebView, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from "firebase";
import { _getDealsMade, _getMyData } from './../components/loadData';
import TabBar from './../components/tabbar';
const {width, height} = Dimensions.get('window');


// class
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDeals: [],
      myUID: '',
      myEmail: '',
      myName: ''
    }


    this._removeDeal = this._removeDeal.bind(this);
    this._renderMine = this._renderMine.bind(this);
    this._openPost = this._openPost.bind(this);
  }


  // render
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
       
        {/* profile container square && oval */}
        <Image style={styles.badgeCont} source={require('./../components/*images/badge.png')}/>
        <Image style={[styles.rankImg, {borderColor: this.state.profileColor}]} source={{uri: 'https://cdn2.iconfinder.com/data/icons/seo-flat-6/128/23_Page_Rank_Badge-256.png'}}/>


        {/* my name */}
        <TouchableOpacity disabled={true}>
          <Text style={[styles.nameLabel, {color: this.state.profileColor}]}>{this.state.myName}</Text>
        </TouchableOpacity>


        {/* my stuff label */}
        <Text style={styles.mystuffLabel}>My Stuff</Text>


        {/* my email */}
        <TouchableOpacity style={styles.infoContainer1} disabled={true}>
          <Text style={styles.infoLabels}>email</Text>
          <Text style={styles.infoText}>{this.state.myEmail}</Text>
        </TouchableOpacity>


        {/* my password */}
        <TouchableOpacity style={styles.infoContainer2} disabled={true}>
          <Text style={styles.infoLabels}>password</Text>
          <Text style={styles.infoText}>**********</Text>
        </TouchableOpacity>


        {/* my deals */}
        <Text style={styles.mydealsLabel}>My Deals</Text>
        <FlatList
          horizontal={true}
          data={this.state.myDeals}
          contentContainerStyle={styles.postsList}
          renderItem={({item}) => this._renderMine(item)}
        />


        {/* terms && conditions */}
        <Text style={styles.termsLabel}>Terms and Conditions</Text>
        <View style={styles.termsContainer}>
          <ScrollView>
            <Text style={styles.termsText}>
              End-User License Agreement ("Agreement")
              Last updated: July 1, 2017

              Please read this End-User License Agreement ("Agreement") carefully before clicking the "I Agree" button, downloading or using RipOff ("Application").

              By clicking the "I Agree" button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this Agreement.

              If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and do not download or use the Application.

              License

              RipOff grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.

              Restrictions

              I agree not to and agree not to permit others to:

              a) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application or make the Application available to any third party.
              b) create hateful, discriminatory, slanderous, derogatory, unprofessional, obnoxious, offensive, and otherwise libelous comments and/or posts that can and/or will defame reputations or character, and that are in violation of individual Civil Rights protections

              Modifications to Application

              RipOff reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.

              Term and Termination

              This Agreement shall remain in effect until terminated by you or RipOff. 

              RipOff may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.

              This Agreement will terminate immediately, without prior notice from RipOff, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your desktop.

              Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your desktop.

              Severability

              If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

              Amendments to this Agreement

              RipOff reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 10 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

              Contact Information

              If you have any questions about this Agreement, please contact us.
            </Text>
          </ScrollView>
        </View>


        {/* nav tab bar */}
        <TabBar navigator={this.props.navigation} currentScreen={'Bad'} />
      </ScrollView>
    );
  }


  // view will load
  componentWillMount() {
    const user = firebase.auth().currentUser;
    _getMyData(user.uid).then((data) => {
      this.setState({
        myUID: user.uid,
        myEmail: user.email,
        myName: data.name
      });
    });


    _getDealsMade(user.uid).then((deals) => {
      if (deals.length <= 6) {
        // blue
        this.setState({myDeals: deals, profileColor: '#283593'});
      }
      else if (deals.length >= 7) {
        // purple
        this.setState({myDeals: deals, profileColor: '#5e35b1'});
      }
      else if (deals.length >= 14) {
        // green
        this.setState({myDeals: deals, profileColor: '#388e3c'});
      }
      else if (deals.length >= 20) {
        // red
        this.setState({myDeals: deals, profileColor: '#d32f2f'});
      }
      else if (deals.length >= 30) {
        // white
        this.setState({myDeals: deals, profileColor: '#eeeeee'});
      }
      else if (deals.length >= 50) {
        // gold
        this.setState({myDeals: deals, profileColor: '#FFD700'});
      }
    });
  }


  // my deals
  _renderMine(item) {
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
        <Text style={styles.postTitle}>{item.title}</Text>
        

        {/* content */}
        <Text style={styles.postContent}>{item.content}</Text>


        {/* link  */}
        <TouchableOpacity onPress={() => this._openLink(item.link)}>
          <Text style={styles.postLink}>{item.link}</Text>
        </TouchableOpacity>


        {/* save button */}
        <TouchableOpacity style={styles.postDeleteBtn} onPress={() => this._removeDeal(item.key)}>
          <Image style={styles.postDeleteImg} source={require('./../components/*images/delete.png')} />
        </TouchableOpacity>
      </View>
    );
  }


  // open link
  _openPost() {
  }


  // delete deal
  _removeDeal(key) {
    firebase.database().ref().child(`users/${this.state.myUID}/savedDeals/${key}`).remove()
    .then(() => {
      alert('Successfully Deleted!!');
    });
  }
}


// styling
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  badgeCont: {
    width: width,
    height: width / 1.3
  },
  rankImg: {
    width: 150,
    height: 150,
    padding: 10,
    borderWidth: 8,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: -height * 0.27
  },
  nameLabel: {
    fontSize: 38,
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: height * 0.10
  },


  // edit info
  mystuffLabel: {
    fontSize: 28,
    marginTop: 50,
    marginLeft: 20,
    color: '#757575',
    fontWeight: '700'
  },
  infoContainer1: {
    height: 70,
    marginTop: 20,
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB'
  },
  infoContainer2: {
    height: 70,
    marginTop: 2,
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB'
  },
  infoLabels: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
    fontWeight: '700'
  },
  infoText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#757575',
    fontWeight: '600'
  },


  // change
  changeCont: {
    marginTop: 40,
    alignSelf: 'center',
    width: width * 0.90,
    height: height * 0.65,
    backgroundColor: '#F8F9FB'
  },
  cancelBtn: {
    top: 5,
    left: 5,
    position: 'absolute'
  },
  cancelImg: {
    width: 35,
    height: 35
  },
  changeLabel: {
    fontSize: 26,
    marginTop: 8,
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center'
  },
  oldLabel: {
    fontSize: 25,
    color: '#283593',
    fontWeight: '700'
  },
  oldText: {
    fontSize: 22,
    marginLeft: 5,
    color: '#757575',
    fontWeight: '600'
  },
  newInput: {
    height: 65,
    fontSize: 20,
    marginTop: 40,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    alignSelf: 'center',
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  confirmInput: {
    height: 65,
    fontSize: 20,
    marginTop: 30,
    borderWidth: 3,
    paddingLeft: 15,
    borderRadius: 30,
    alignSelf: 'center',
    width: width * 0.75,
    borderColor: '#92B0CE'
  },
  confirmBtn: {
    bottom: 0,
    height: 60,
    width: width * 0.90,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#5982EE'
  },
  confirmText: {
    fontSize: 22,
    color: 'white'
  },


  // my deals
  mydealsLabel: {
    fontSize: 28,
    marginTop: 40,
    marginLeft: 20,
    color: '#757575',
    fontWeight: '700'
  },
  postsList: {
    marginLeft: 10
  },
  postContainer: {
    height: 275,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    width: width * 0.90,
    backgroundColor: '#e0e0e0'
  },
  postAuthor: {
    fontSize: 22,
    color: 'black',
    marginLeft: 10,
    fontWeight: '700',
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
    fontSize: 16,
    marginTop: 3,
    marginLeft: 10,
    color: '#616161',
    fontWeight: '600'
  },
  postContent: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  postLink: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#039be5'
  },
  postDeleteBtn: {
    right: 15,
    bottom: 15,
    position: 'absolute'
  },
  postDeleteImg: {
    width: 40,
    height: 40
  },


  // terms && cond
  termsLabel: {
    fontSize: 28,
    marginTop: 40,
    marginLeft: 20,
    color: '#757575',
    fontWeight: '700'
  },
  termsContainer: {
    height: 400,
    marginTop: 10,
    marginBottom: 80,
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#F8F9FB'
  },
  termsText: {
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 12
  }
});


// export
export default Profile;