import React, { Component, useState,useEffect } from 'react';
import './Login.css';
import { Button, Form, FormGroup, Label, Input, FormText,Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router";
import { tokens } from '../../store/user';

const Login = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  function handleChangeUsername(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setUsername(value);
  };

  function handleChangePassword(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setPassword(value);
  };

  function handleSubmit(event) {
    // console.log('A name was submitted: ' + username);
    // console.log('A password was submitted: ' + password);
    let accessToken = '';
    let refreshToken = '';
    event.preventDefault();

    return axios.post('http://localhost:3001/api/auth/login', {
        username: username,
        password: password
    })
    .then((response) => {
        console.log(response);
        accessToken = response.data.token.accessToken;
        refreshToken = response.data.token.refreshToken;
        dispatch(tokens({accessToken,refreshToken}));
        // props.history.push('/')
        history.push({
          pathname:  "/",
          state: {
            response: 'messageFromServer'
          } 
       });
    })
    .catch((error)=> {
        console.log(error);
        // props.history.push('/login')
        history.push({
          pathname:  "/login",
          state: {
            response: 'messageFromServer'
          } 
       });
    });
  };

    return (
      <Container>
      <Row>
        <Col xs="6">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <br/>
            <Input type="text" name="username" id="username" placeholder="username" value={username} onChange={handleChangeUsername}/>
            <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={handleChangePassword}/>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
    </Container>
    )
}

export default Login;
