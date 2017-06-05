import React from 'react';

import Message from './Message';

class MessageList extends React.Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(this.props.messages);
  }

  render() {
    let myArray = [];
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {

      for(let key in message) {
        myArray.push(message[key]);
      }
      console.log(myArray);
    });
    const displayMessages = myArray.map((msg) => {
      const stepOne = msg.split(":");
      const messageData = stepOne.toString().split('","');
        return (
          <Message
            username={this.props.userInfo}
            message={messageData[2]}
            fromMe={this.props.messages.fromMe} />
        );
      });
    return (
      <div className='messages' id='messageList'>
        { displayMessages }
      </div>
    );
  }
}

MessageList.defaultProps = {
  messages: [],
};

export default MessageList;