import React, { Component } from 'react';
import axios from 'axios'

class testComponent extends Component {
    state = {
        singleComment: {
            username: '',
            content: '',
            post: Number(4)
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const prevState = { ...this.state.singleComment }
        prevState[event.target.name] = event.target.value
        this.setState({ singleComment: prevState })
    }

    createNewComment = (event) => {
        event.preventDefault();
        const postSingleComment = {
            username: this.state.singleComment.username,
            content: this.state.singleComment.content,
            post: this.state.singleComment.post
        }
        axios.post('/api/v1/comment/', postSingleComment)
            .then((res) => {
                console.log(res);
            }, (error) => {
                console.log(error);
            });

    }
    render() {
        return (
            <div>
                <form onSubmit={this.createNewComment} id="postComment">
                    <input type="text" placeholder="username" name="username" onChange={this.handleChange} value={this.state.singleComment.username} />
                    <input type="text" placeholder="Add a comment..." name="content" onChange={this.handleChange} value={this.state.singleComment.content} />
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
}

export default testComponent;