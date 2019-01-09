import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import firebaseApp from './src/components/firebaseCodes';
import { DrawerNavigator } from 'react-navigation';
import Login from './src/auth/Login';
import SignUp from './src/auth/SignUp';
import Bad from './src/feed/Bad';
import Feed from './src/feed/Feed';
import Good from './src/feed/Good';
import MoreInfo from './src/feed/MoreInfo';
import Post from './src/post/Post';
import Profile from './src/profile/Profile';
import Saved from './src/profile/Saved';



// class
export default class RipOffs extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Feed navigation={ navigation } />
    );
  }
}


// routings
const Routes = DrawerNavigator({
  Feed: {screen: Feed},
  Login: {screen: Login},
  SignUp: {screen: SignUp},
  Good: {screen: Good},
  Bad: {screen: Bad},
  MoreInfo: {screen: MoreInfo},
  Profile: {screen: Profile},
  Saved: {screen: Saved},
  Post: {screen: Post}
});


// export
AppRegistry.registerComponent('RipOffs', () => Routes);