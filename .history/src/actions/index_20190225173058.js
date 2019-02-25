import { fetchCategoriesAPI, fetchAllPostsAPI, fetchPostDetailAPI, fetchCommentsAPI, addComment, registerVotePost, registerVoteComment, deleteCommentAPI, updateCommentAPI, insertPostAPI, updatePostAPI, deletePostAPI } from '../api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        payload: comments.reduce((acc, val) => ({
            ...acc,
            [val.id]: { ...val }
        }), {})
    };
}

function receiveSingleComment(comment) {
    return {
        type: RECEIVE_COMMENTS,
        payload: { [comment.id]: { ...comment } }
    };
}

function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    };
}

export function selectCategory(activeCategory) {
    return {
        type: SELECT_CATEGORY,
        activeCategory
    };
}

export function receiveSinglePost(post) {
    return {
        type: RECEIVE_POSTS,
        payload: { [post.id]: { ...post } }
    };
}

function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        payload: posts.reduce((acc, p) => (
            {
                ...acc,
                [p.id]: { ...p }
            }
        ), {})
    };
}

export const fetchCategories = () => dispatch => (
    fetchCategoriesAPI().then((response) => response.json())
        .then((responseJson) => (dispatch(receiveCategories(responseJson.categories))
        )))


export const fetchPosts = () => dispatch => (
    fetchAllPostsAPI().then((response) => response.json())
        .then((responseJson) => (dispatch(receivePosts(responseJson))
        )))
export const fetchPostDetail = (postId) => dispatch => (
    fetchPostDetailAPI(postId).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveSinglePost(responseJson))
        )))
export const fetchComments = (postId) => dispatch => (
    fetchCommentsAPI(postId).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveComments(responseJson))
        )))
export const insertComment = (comment) => dispatch => (
    addComment(comment).then((response) => response.json())
        .then((responseJson) => {
            dispatch(receiveSingleComment(responseJson))
            dispatch(fetchPostDetail(responseJson.parentId))
        }))
export const sendVotePost = (postId, option) => dispatch => (
    registerVotePost(postId, option).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveSinglePost(responseJson))
        )))
export const sendCommentVote = (commentId, option) => dispatch => (
    registerVoteComment(commentId, option).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveSingleComment(responseJson))
        )))
export const deleteComment = (commentId) => dispatch => (
    deleteCommentAPI(commentId).then((response) => response.json())
        .then((responseJson) => {
            dispatch(receiveSingleComment(responseJson))
            dispatch(fetchPostDetail(responseJson.parentId))
        }))
export const updateComment = (comment) => dispatch => (
    updateCommentAPI(comment).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveSingleComment(responseJson)))))
export const insertPost = (post) => dispatch => (
    insertPostAPI(post).then((response) => response.json())
        .then((responseJson) => {
            dispatch(receiveSinglePost(responseJson))
        }))
export const updatePost = (postId, post) => dispatch => (
    updatePostAPI(postId, post).then((response) => response.json())
        .then((responseJson) => (dispatch(receiveSinglePost(responseJson)))))
export const deletePost = (postId) => dispatch => (
    deletePostAPI(postId).then((response) => response.json())
        .then((responseJson) => {
            dispatch(receiveSinglePost(responseJson))
        }))