import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectCategory, fetchPosts } from '../actions'
import { Form, Container } from 'semantic-ui-react'
import ListPost from './ListPost';

class Category extends Component {
    state = {
        orderBy: 'voteScore'
    }
    orderOptions = [
        { key: 'v', text: 'Score', value: 'voteScore' },
        { key: 't', text: 'Date', value: 'timestamp' },
    ]
    sortBy = (e, { value }) => {
        this.setState({ orderBy: value });
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
        const { orderBy } = this.state
        return (
            <Container>
                <Container textAlign='right'>
                    {posts.length > 0 &&
                        <Form>
                            <Form.Select inline options={this.orderOptions} onChange={this.sortBy} placeholder='Order By' value={orderBy} label='Order By: ' />
                        </Form>
                    }
                </Container>
                <ListPost orderBy={this.state.orderBy} posts={posts} />
            </Container>
        )
    }
}
function mapStateToProps({ posts }, { match }) {
    return {
        posts: Object.keys(posts).map((key) => posts[key]).filter(p => !p.deleted).filter(p => !match.params.activeCategory || p.category === match.params.activeCategory),
        activeCategory: match.params.activeCategory
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeCategory: (c) => dispatch(selectCategory(c)),
        receivePosts: () => dispatch(fetchPosts()),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Category))