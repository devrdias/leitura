import React,{Component} from 'react';
import { Segment, Label,Button,Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'
import { sendVotePost } from '../actions'
import { connect } from 'react-redux';
import ModalPost from './ModalPost'

class Post extends Component {
  state = {
    isModalOpened: false,
    postClicked: undefined
  }
  sendVote = (e,postId,option) => {   
    e.preventDefault(); 
    const { registerVotePost } = this.props
    registerVotePost(postId, { option })
  }
  editPost = (e, postId) => {   
    e.preventDefault()
    this.setState({
      isModalOpened: true,
      postClicked: postId
    });
  }
  render() {
    const { post, deletePost } = this.props   
    return (
  <div>
      <ModalPost postId={this.state.postClicked} open={this.state.isModalOpened} close={() => this.setState({ isModalOpened: false })} />
      <Button.Group floated='right'>
        <Button primary icon onClick={(e) => this.sendVote(e, post.id, 'upVote')} >
          <Icon name='thumbs up'  />
        </Button>
        <Button primary icon onClick={(e) => this.sendVote(e, post.id, 'downVote')}>
          <Icon name='thumbs down'  />
        </Button>
        <Button primary icon onClick={(e) => this.editPost(e, post.id)}>
          <Icon name='edit' />
        </Button>
        <Button primary icon  onClick={(e) => deletePost(e, post.id)}>
          <Icon name='trash' />
        </Button>
      </Button.Group>
      <Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
      <Segment.Group key={post.id}>
        <Segment>{post.body}</Segment>
        <Segment.Group horizontal>
          <Segment> <Label>
            Author
      <Label.Detail>{post.author}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Category
      <Label.Detail>{post.category}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Comments
      <Label.Detail>{post.commentCount}</Label.Detail>
          </Label></Segment>
          <Segment> <Label>
            Score
      <Label.Detail>{post.voteScore}</Label.Detail>
          </Label></Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
    )
  }
}
function mapStateToProps(state, { post }) {
  return {
      post
  }
}
function mapDispatchToProps(dispatch) {
  return {
    registerVotePost: (postId, option) => dispatch(sendVotePost(postId, option))
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post))