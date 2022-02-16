import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component'
import HomePage from "./pages/homepage/homepage.component"
import SignInPage from "./pages/signUp-signIn/signUp-signIn.component"
import ShopPage from "./pages/shop/shop.component"

import { auth, createUserProfileDoc } from "./firebase/firebase.utils"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  
      if (userAuth) { // see if user is actually signing in
        const userRef = await createUserProfileDoc(userAuth) // get userReference from userAuth we passed in
        

        userRef.onSnapshot((snapshot) => { // setting currentUser state with the returned snapshots id and data
          // console.log(snapshot)
          // console.log(snapshot.data())

          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state)
          })
        })
      } else {
        this.setState({ currentUser: userAuth }) // if user logs out, set currentUser to null (userAuth will return null if not logged in)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
