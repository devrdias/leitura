import React, { Component } from 'react';
import Post from './Post'
import { Container, Button, Icon, Divider } from 'semantic-ui-react';
import { fetchPostDetail, selectCategory, fetchComments, sendVotePost, deletePost } from '../actions'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import ListComments from './ListComments';



class PostDetail extends Component {
    deletePost = (e, postId) => {
        e.preventDefault()
        const { deletePost, history } = this.props
        deletePost(postId)
        history.push('/')
    }
    componentDidMount() {
        const { postId, receivePostDetail, changeCategory, receiveComments, post } = this.props
        if (typeof post !== "undefined") {
            receivePostDetail(postId)
            receiveComments(postId)
        }

        changeCategory(null);
    }
    render() {
        const { history, post } = this.props
        if (typeof post === "undefined") {
            return <Redirect to='/404' />;
        }
        return (

            <Container>
                <Post post={post} deletePost={this.deletePost} />
                <Divider />
                <Container>
                    <Button primary onClick={(e) => history.goBack()}><Icon name='left arrow' />Back</Button>
                </Container>
                <ListComments />
            </Container >
        )
    }

}

function mapStateToProps({ posts }, { match }) {
    return {
        postId: match.params.postId,
        post: posts[match.params.postId],
    }
}
function mapDispatchToProps(dispatch) {
    return {
        receivePostDetail: (postId) => dispatch(fetchPostDetail(postId)),
        changeCategory: (c) => dispatch(selectCategory(c)),
        receiveComments: (postId) => dispatch(fetchComments(postId)),
        registerVotePost: (postId, option) => dispatch(sendVotePost(postId, option)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail));