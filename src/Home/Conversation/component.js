import React, { Component } from 'react';
import { sendRequest } from 'utilities/request';

export default class Conversation extends Component {
  constructor(props) {
    super(props);
    let entityId = props.match.params.id;
    this.entityId = entityId;
    this.isGroup = window.location.href.includes('groups');
    this.state = {
      newMessage: '',
      isConversationLoaded: false
    }
  }
  componentDidMount() {
    this.fetchConversation();
  }
  fetchConversation() {
    let params = `${this.isGroup ? 'group_id' : 'user_id'}=${this.entityId}`;
    sendRequest(`/conversations/?${params}`).then((conversation) => {
      this.conversationId = conversation.id;
      let { threads } = conversation;
      this.threads = threads
      this.setState({
        isConversationLoaded: true
      });
    });
  }
  sendMessage() {
    let message = this.state.newMessage;
    sendRequest(`/conversations/${this.conversationId}/`, 'PATCH', {
      message
    }).then(() => {
      this.fetchConversation();
    });
  }
  handleNewMessageChange(event) {
    this.setState({
      newMessage: event.target.value
    });
  }
  renderThreads(threads) {
    return threads.map((thread) => {
      return (
        <div className="thread">
          {thread.messages[0]}
        </div>
      )
    })
  }
  renderLoading() {
    return (
      <div>Loading...</div>
    )
  }
  render() {
    return (
     <div>
      Conversation
      {(this.state.isConversationLoaded) && (
        this.renderThreads(this.threads)
      )}
      {(!this.state.isConversationLoaded) && (
        this.renderLoading()
      )}
      <footer>
        Add message
        <input type="text" value={this.state.newMessage} onChange={this.handleNewMessageChange.bind(this)}/>
      </footer>
      <button onClick={this.sendMessage.bind(this)}>Send</button>
     </div>
    );
  }
}