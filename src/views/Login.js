import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as viewActions from './actions';
import {validation} from "../components/constants/validation";
import Forms from "../components/ui/forms/Forms";
import LoginError from "../components/ui/loginMessage/LoginMessage";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 100%;
    margin: auto;
    margin-top: 20vh;
    text-align: center;

    @media screen and (max-width: 700px) {
        flex-direction: column;
        width: 90vw;
    }        
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;

    @media screen and (max-width: 700px) {
        font-size: 16px;
    }          
`;

const LoginDescription = styled.label``;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const LoginButton = styled.button`
    height: 30px;
    width: 70px;
    margin-left: auto;
    margin-right: 0;
    color: #ffffff;
    background: #333333;
    border-radius: 2px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    
    &:hover {
        background: #444444;
    }    
`;

class Login extends Component {
    state = {
        loginForm: {
            username: {
                formType: 'input',
                description: 'Username or email',
                formConfig: {
                    type: 'text',
                    name: 'username',
                    placeholder: 'Write your username or email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
            password: {
                formType: 'input',
                description: 'Password',
                formConfig: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false
            }
        }, formIsValid: false,
    };

    userInputHandler = (event) => {
        event.preventDefault();
        const updatedLoginForm = {...this.state.loginForm};
        const updatedForm = {...updatedLoginForm[event.target.name]};
        updatedForm.value = event.target.value;
        updatedForm.valid = validation(event.target.value, updatedForm.validation);
        updatedLoginForm[event.target.name] = updatedForm;

        let isValid = true;
        for (let i in updatedLoginForm) {
            isValid = updatedLoginForm[i].valid && isValid;
        }

        this.setState({loginForm: updatedLoginForm, formIsValid: isValid});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.loginForm.username.value;
        const password = this.state.loginForm.password.value;

        if (this.state.formIsValid) {
            this.setState({error: false});
            this.props.login(username, password);
        } else {
            this.setState({error: true});
        }
    };

    render() {
        const loginFormInputs = [];

        for (let key in this.state.loginForm) {
            loginFormInputs.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        return (
            <Container>
                <Title>Welcome</Title>
                <LoginDescription>Login with your <b>username/email</b></LoginDescription>
                <FormContainer>
                    {loginFormInputs.map(input => (
                        <Forms
                            key={input.id}
                            formType={input.config.formType}
                            formConfig={input.config.formConfig}
                            value={input.config.value}
                            valid={input.config.valid}
                            changed={(event) => this.userInputHandler(event)}/>
                    ))}
                    <LoginButton onClick={(event) => this.handleSubmit(event)}>Login</LoginButton>
                </FormContainer>
                <LoginError/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.viewState.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(viewActions.login(username, password)),
        logout: () => dispatch(viewActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);