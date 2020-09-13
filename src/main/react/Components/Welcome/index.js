import React, { Component } from "react";
import axios from 'axios'

class Welcome extends Component {
  componentDidMount(){
    axios.get('/api/user')
  }
  render() {
    return <div>Welcome</div>;
  }
}

export default Welcome;
