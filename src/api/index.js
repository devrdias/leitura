const header = {
	headers: {
		Authorization: 'auth-token',
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};

export function fetchCategoriesAPI() {
	return fetch('/categories', header);
}

export function fetchAllPostsAPI() {
	return fetch('/posts', header);
}

export function fetchPostDetailAPI(postId) {
	return fetch(`/posts/${postId}`, header);
}

export function fetchCommentsAPI(postId) {
	return fetch(`/posts/${postId}/comments`, header);
}

export function addComment(comment) {
	return fetch(`/comments`, {
		method: 'POST',
		...header,
		body: JSON.stringify(comment)
	});
}
export function updateCommentAPI(comment) {
	return fetch(`/comments/${comment.id}`, {
		method: 'PUT',
		...header,
		body: JSON.stringify(comment)
	});
}
export function insertPostAPI(post) {
	return fetch(`/posts`, {
		method: 'POST',
		...header,
		body: JSON.stringify(post)
	});
}
export function updatePostAPI(postId, post) {
	return fetch(`/posts/${postId}`, {
		method: 'PUT',
		...header,
		body: JSON.stringify(post)
	});
}
export function registerVotePost(postId, vote) {
	return fetch(`/posts/${postId}`, {
		method: 'POST',
		...header,
		body: JSON.stringify(vote)
	});
}

export function registerVoteComment(commentId, vote) {
	return fetch(`/comments/${commentId}`, {
		method: 'POST',
		...header,
		body: JSON.stringify(vote)
	});
}
export function deleteCommentAPI(commentId) {
	return fetch(`/comments/${commentId}`, {
		method: 'DELETE',
		...header
	});
}
export function deletePostAPI(commentId) {
	return fetch(`/posts/${commentId}`, {
		method: 'DELETE',
		...header
	});
}
