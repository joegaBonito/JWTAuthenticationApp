import React, { Component } from 'react';
import './Search.css';
import { Button, Form, FormGroup, Input,Container, Row, Col } from 'reactstrap';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Container>
      <Row>
        <Col xs="6">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <br/>
            <Input type="text" name="searchForCompany" id="searchForCompany" placeholder="Enter MID or Phone Number" value={this.state.value} onChange={this.handleChange}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    </Row>
    </Container>
    )
  }
}

export default Search;
