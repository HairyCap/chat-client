import React, { Component } from "react";
import { getMsgsQuery, addMsgMutation } from "../Queries/Queries";
import { graphql, compose } from "react-apollo";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.me,
      content: ""
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    setTimeout(this.props.scroll, 200);
  }
  focusInput = () => {
    this.inputRef.current.focus();
  };
  update = e => {
    const state = { ...this.state };
    state.content = e.target.value;
    this.setState(state);
    console.log(this.props);
  };

  send = e => {
    e.preventDefault();
    if (this.state.content) {
      this.props
        .addMsgMutation({
          variables: {
            userId: this.state.userId,
            content: this.state.content
          },
          refetchQueries: [{ query: getMsgsQuery }]
        })
        .then(res => console.log(res));
        this.setState({content:""});
    }
  };

  render() {
    return (
      <form className="msg">
        <input
          type="text"
          onChange={this.update}
          //手机键盘跳出，视图大小调整后滚动,在移动端FireFox测试200毫秒延迟成功率较高（Mi6）
          onFocus={() => setTimeout(this.props.scroll, 200)}
          //手机键盘点击输入框，滚动到底部
          onClick={() => this.props.scroll()}
          value={this.state.content}
          ref={this.inputRef}
        />
        <button onClick={this.send}>
          <span>send</span>
        </button>
      </form>
    );
  }
}

export default compose(
  graphql(getMsgsQuery, { name: "getMsgsQuery" }),
  graphql(addMsgMutation, { name: "addMsgMutation" })
)(InputForm);
