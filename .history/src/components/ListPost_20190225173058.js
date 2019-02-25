import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectCategory, fetchPosts, deletePost } from '../actions'
import sortBy from 'sort-by';
import { Container, Segment } from 'semantic-ui-react'

class ListPost extends Component {
    deletePost = (e, postId) => {
        e.preventDefault()
        const { deletePost } = this.props
        deletePost(postId)
    }
    componentDidUpdate(prevProps) {
        const { changeCategory, activeCategory } = this.props;
        if (activeCategory !== prevProps.activeCategory || activeCategory === null) {
            changeCategory(activeCategory);
        }
    }
    componentDidMount() {
        const { activeCategory, changeCategory, receivePosts } = this.props;
        changeCategory(activeCategory);
        receivePosts();
    }
    render() {
        const { posts } = this.props
        return (
            <Container>
                {posts.map(p =>
                    <Segment.Group key={p.id}>
                        <Segment>
                            <Post key={p.id} post={p} deletePost={this.deletePost} />
                        </Segment>
                    </Segment.Group>
                )}
            </Container>
        )
    }
}
function mapStateToProps(state, { match, orderBy, posts }) {
    return {
        posts: posts.sort(sortBy(`-${orderBy}`)),
        activeCategory: match.params.activeCategory
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCategory: (c) => dispatch(selectCategory(c)),
        receivePosts: () => dispatch(fetchPosts()),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPost))