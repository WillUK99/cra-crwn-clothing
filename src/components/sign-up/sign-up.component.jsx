import React from 'react'

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import { auth, createUserProfileDoc } from "../../firebase/firebase.utils"

import "./sign-up.styles.scss"

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    handleSubmit = async (event) => {
        const { displayName, email, password, confirmPassword } = this.state

        //if password and confirmPassword dont match then alert user and returns

        if (password != confirmPassword) {
            alert("Ooops, those passwords don't match. Please try again.")
            return
        }

        try {
            /**
             * Creates a new user account with the given email and password.
             * 
             * Returns back userAuth object on the 'user' key.
             */
            const { user } = auth.createUserWithEmailAndPassword(email, password)

            // createing our user profile document... we use the {} sytax so we can spread in the data
            await createUserProfileDoc(user, { displayName })

            // reset our state
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp