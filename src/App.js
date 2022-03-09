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
    /**
     * 'auth.onAuthStateChange' is a method on the auth library from firebase -> Adds an observer (subscribes) to the users sign-in state.
     * 
     * Returns a function which if called later on in the componentWillUnmount will then close the subscription
     */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // console.log(userAuth)
  
      if (userAuth) { // see if user is actually signed in
        const userRef = await createUserProfileDoc(userAuth) // pass the current logged in user and get userReference from userAuth

        userRef.onSnapshot((snapshot) => { // setting currentUser state with the returned snapshots id and data
          // console.log(snapshot)
          // console.log(snapshot.id)
          // console.log(snapshot.data())

          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data() // returns the data in which we stored in the db in firebase.utils 
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
        {/* passing the current user state to the header */}
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
