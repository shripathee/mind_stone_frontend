import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
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
        isConversationLoaded: true,
      });
      setTimeout(this.fetchConversation.bind(this), 2000);
    });
  }
  sendMessage(event) {
    event.preventDefault();
    let message = this.state.newMessage;
    sendRequest(`/conversations/${this.conversationId}/`, 'PATCH', {
      message
    }).then(() => {
      this.fetchConversation();
      this.setState({
        newMessage: ''
      });
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
          <div class="float-right">
            - <small class="font-weight-bold">{thread.messages[0].author}</small>
            &nbsp;
            <small class="font-italic">
              <Moment fromNow>{thread.messages[0].timestamp}</Moment>
            </small>
          </div>
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
  renderTopBar() {
    return (
      <div className="top-bar text-right">
        <Link to={`/groups/${this.entityId}/edit`}>Edit Group</Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.isGroup && (
          this.renderTopBar()
        )}
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
            <input placeholder="Add message" className="form-control" type="text" value={this.state.newMessage} onChange={this.handleNewMessageChange.bind(this)} />
          </form>
        </footer>
      </div>
    );
  }
}