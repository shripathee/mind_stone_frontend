import React, { Component } from 'react';
import { sendRequest } from 'utilities/request';
import './styles.css';

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
      this.threads = threads;
      this.setState({
        isConversationLoaded: true
      });
    });
  }
  sendMessage(event) {
    event.preventDefault();
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
        <div key={thread.id} className="alert alert-primary">
          {thread.messages[0].text}
          <small class="font-italic float-right">- {thread.messages[0].author}</small>
        </div>
      )
    })
  }
  renderLoading() {
    return (
      <div>Loading...</div>
    )
  }
  renderEmptyState() {
    return (
      <div className="u-hv-centered display-1">Say hi!</div>
    )
  }
  render() {
    return (
     <div>
      {this.state.isConversationLoaded && (
        this.renderThreads(this.threads)
      )}
      {!this.state.isConversationLoaded && (
        this.renderLoading()
      )}
      {this.threads && !this.threads.length && (
        this.renderEmptyState()
      )}
      <footer class="message-editor">
        <form onSubmit={this.sendMessage.bind(this)}>
          <input placeholder="Add message" className="form-control" type="text" value={this.state.newMessage} onChange={this.handleNewMessageChange.bind(this)}/>
        </form>
      </footer>
     </div>
    );
  }
}