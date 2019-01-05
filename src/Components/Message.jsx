import React, { Component } from "react";
import { getMsgsQuery, addMsgMutation } from "../Queries/Queries";
import { graphql } from "react-apollo";

function MyMsg(props) {
  return (
    <div className="msg2">
      <span className="placeHolder" />
      <p className="text-me">{props.msg.content}</p>
    </div>
  );
}

function YourMsg(props) {
  return (
    <div className="msg2">
      <p className="text-you">{props.msg.content}</p>
      <span className="placeHolder" />
    </div>
  );
}

class Message extends Component {
  componentDidUpdate() {
    this.props.scroll();
  }

  render() {
    console.log(this.props);
    const data = this.props.data;
    //console.log(data);
    // NetworkStatus {
    //   loading = 1,
    //   setVariables = 2,
    //   fetchMore = 3,
    //   refetch = 4,
    //   poll = 6,
    //   ready = 7,
    //   error = 8,
    // }
    return data.loading
      ? "loading..."
      : data.msgs.map(m => {
          return m.userId === this.props.me ? (
            <MyMsg msg={m} key={m.id} />
          ) : (
            <YourMsg msg={m} key={m.id} />
          );
        });
  }
}

export default graphql(getMsgsQuery)(Message);
