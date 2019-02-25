import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form,Select } from 'semantic-ui-react'
import { insertPost, updatePost } from '../actions'
import uuid from 'uuid'


const initialState = {
    post: {
        title: '',
        author: '',
        body: '',
        category: 'react'
    }
}
class ModalPost extends Component {
    state = initialState
    handleSubmit = (e) => {
        e.preventDefault()
        const { insertPost, updatePost, close } = this.props
        const { post } = this.state
        console.log(post)
        const isNewPost = typeof post.id === "undefined"
        if(isNewPost){
            post.id = post.id || uuid.v1()
            post.timestamp = new Date().getTime()
            insertPost(post)
        }else{
            updatePost(post.id,{
                title:post.title,
                body:post.body
            })
        }        
        e.target.reset()
        this.setState(initialState)
        close()
    }
    handleChange(field, value) {
        this.setState((prevState) => (
            {
                post: {
                    ...prevState.post,
                    [field]: value
                }
            }
        ));
    }
    componentDidUpdate(){
        if(this.state.post.id !== this.props.post.id){
            this.setState({
                post:{
                    ...this.props.post
                }
            });
        }
    }
    render() {
        const { open, categories, close } = this.props
        const { post } = this.state
        const isNewPost = typeof post.id === "undefined"
        return (

            <Modal open={open} onClose={close} closeIcon>
                <Modal.Header>
                    Post
                </Modal.Header>
                <Modal.Content>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.Input required label='Author' disabled={!isNewPost} placeholder='Author' name='author' value={post.author} onChange={(e) => this.handleChange('author', e.target.value)} />
                        <Form.Input required label='Title' placeholder='Title' name='title' value={post.title} onChange={(e) => this.handleChange('title', e.target.value)} />
                        <Form.Field required control={Select} disabled={!isNewPost} label='Categories' options={categories} placeholder='Categories' value={post.category}  onChange={(e,{value}) => this.handleChange('category', value)} />
                        <Form.TextArea required label='Text' placeholder='Text' name='body' value={post.body} onChange={(e) => this.handleChange('body', e.target.value)} />
                        <Button negative onClick={(e) => {e.preventDefault(); close()}}>
                            Cancel
                        </Button>
                        <Button primary>
                            Save
                         </Button>
                    </Form>

                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>

            </Modal>

        )
    }
}
function mapStateToProps({ categories, showModal, posts }, { postId }) {
    return {
        categories:categories.map(c => ({ key: c.name, text: c.name, value: c.name })),
        post: posts[postId] || {}
    }
}
function mapDispatchToProps(dispatch) {
    return {
        insertPost: (post) => dispatch(insertPost(post)),
        updatePost: (postId,post) => dispatch(updatePost(postId,post)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPost)