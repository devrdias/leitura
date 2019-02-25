import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Comment, Segment, Button, Form,Label} from 'semantic-ui-react';
import uuid from 'uuid'
import { fetchComments, insertComment,sendCommentVote,deleteComment,updateComment } from '../actions'
import { withRouter } from 'react-router-dom'

const initialState = {
    comment:{
        author:'',
        body:''
    }
}

class ListComments extends Component {
    state = initialState
    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        const { postId, addComment,updateComment } = this.props
        const { comment } = this.state
        const isNewComment = typeof comment.id === "undefined"
        comment.id = comment.id || uuid.v1()
        comment.timestamp = new Date().getTime();
        comment.parentId = postId;
        if(isNewComment){
            addComment(comment)
        }else{
            updateComment(comment)
        }        
        this.setState(initialState);
    }
    sendVote = (e, commentId,option) => {
        const { registerCommentVote } = this.props
        registerCommentVote(commentId, { option })
    }
    deleteComment = (e, commentId) => {
        const { deleteComment } = this.props
        deleteComment(commentId)
    }
    handleChange(field,value) {   
        this.setState((prevState) => (
            {
                comment: {
                    ...prevState.comment,
                    [field]:value
                }
            }
        ));
    }
    render() {
        const { comments } = this.props;
        const { comment } = this.state
        return (
            <div style={{ marginTop: '3rem' }}>
                <h4>Comments</h4>
                <Segment>
                    <Comment.Group>
                        {comments.map(c => (
                            <Comment key={c.id}>
                                <Comment.Content>
                                    <Comment.Author as='a'>{c.author}</Comment.Author>
                                    <Comment.Metadata>                                    
                                        <div>{new Date(c.timestamp).toLocaleDateString()} {new Date(c.timestamp).toLocaleTimeString()}</div>
                                        <Label color='grey' circular>{c.voteScore}</Label>
                                    </Comment.Metadata>
                                    <Comment.Text>{c.body}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={(e) => this.sendVote(e,c.id, 'upVote')}>Like</Comment.Action>
                                        <Comment.Action onClick={(e) => this.sendVote(e,c.id, 'downVote')}>Dislike</Comment.Action>
                                        <Comment.Action onClick={(e) => this.deleteComment(e,c.id)}>Delete</Comment.Action>
                                        <Comment.Action onClick={(e) => this.setState({comment:c})}>Edit</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        ))
                        }
                    </Comment.Group>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.Input required label='Author' placeholder='Author' name='author' value={comment.author} onChange={(e) => this.handleChange('author',e.target.value)}/>
                        <Form.TextArea required label='Comment' placeholder='Comment' name='body'  value={comment.body} onChange={(e) => this.handleChange('body',e.target.value)}/>
                        <Button content='Save' labelPosition='left' icon='edit' primary />
                    </Form>
                </Segment>
            </div>
        )
    }
}
function mapStateToProps({ comments,posts }, { match }) {
    return {
        comments: Object.keys(comments).map((key) => comments[key]).filter((c) => c.parentId === match.params.postId && !c.deleted),
        postId: match.params.postId,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receiveComments: (postId) => dispatch(fetchComments(postId)),
        addComment: (comment) => dispatch(insertComment(comment)),
        registerCommentVote: (commentId,option) => dispatch(sendCommentVote(commentId,option)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        updateComment: (comment) => dispatch(updateComment(comment)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListComments))