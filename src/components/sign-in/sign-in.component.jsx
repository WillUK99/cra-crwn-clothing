import React from "react"

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import { signInWithGoogle } from "../../firebase/firebase.utils"

import "./sign-in.styles.scss"

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ email: "", password: "" })
    }

    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({ [name]: value })
    }

    render() {
        const { email, password } = this.state

        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email address</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        label="Email"
                        required value={email}
                        handleChange={this.handleChange} />

                    <FormInput
                        type="password"
                        name="password"
                        label="Password"
                        required value={password}
                        handleChange={this.handleChange} />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton> 
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn