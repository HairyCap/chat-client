import React, { Component } from "react";
import "./App.css";
import InputForm from "./Components/InputForm";
import Message from "./Components/Message";
import ApolloCliten from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloCliten({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.chat = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.state = {
      me: "5c2f843debc59d32d4497086"
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chat.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    // console.log(this.props);
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="chatContent">
            <Message me={this.state.me} scroll={this.scrollToBottom} />
            <div id="refDiv" className="refDiv" ref={this.chat} />
          </div>
          <InputForm me={this.state.me} scroll={this.scrollToBottom} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
