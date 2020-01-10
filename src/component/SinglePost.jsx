import React, { Component } from 'react';
import axios from 'axios'
import { Link, Router } from 'react-router-dom'

class SinglePost extends Component {
    state = {
        singlePost: {
            username: '',
            title: '',
            description: '',
            video_link: '',
            comments: [],
            likes: []
        },
        allPost: [],
        singleComment: {
            username: '',
            content: '',
            post: Number(this.props.match.params.id)
        },
        singleLike: {
            isLike: true,
            post: Number(this.props.match.params.id)
        }
    }
    componentDidMount = () => {
        this.getAllPost()
        this.getSinglePost()
    }
    getSinglePost = async () => {
        const allComments = await axios.get(`/api/v1/post/${this.props.match.params.id}`)
        this.setState({ singlePost: allComments.data })
    }
    getAllPost = async () => {
        const getAll = await axios.get('/api/v1/post')
        this.setState({ allPost: getAll.data })
    }

    handleChange = (event) => {
        event.preventDefault()
        const prevState = { ...this.state.singleComment }
        prevState[event.target.name] = event.target.value
        this.setState({ singleComment: prevState })
    }

    createNewComment = async (event) => {
        event.preventDefault();
        const postSingleComment = {
            username: this.state.singleComment.username,
            content: this.state.singleComment.content,
            post: this.state.singleComment.post
        }
        await axios.post('/api/v1/comment/', postSingleComment)
        await this.getSinglePost()
    }

    likeBtnToggle = async (event) => {
        event.preventDefault();
        await this.setState({ isLike: !this.state.isLike })
        await console.log(this.state.isLike)
        const postSingleLike = {
            isLike: this.state.singleLike.isLike,
            post: this.state.singleLike.post
        }
        if (this.state.isLike === true) {
            await axios.post('/api/v1/like/', postSingleLike)
        }
        await console.log(Error)
        await this.getSinglePost()
    }

    ComponentWillReceiveProps = () => {
        this.getAllPost()
        this.getSinglePost()
    }

    render() {
        let currentVideo = this.state.allPost.filter((test) => {
            return test.title !== this.state.singlePost.title
        })
        let renderVideo = currentVideo.map((test2, i) => {
            return (
                <div key={i} className="singleVideoContainerInSinglePost">
                    <a href={`/singlepost/${test2.id}`} >
                        <img src={`http://img.youtube.com/vi/${test2.video_link}/mqdefault.jpg`} alt=' ' className='videoThumbnailInSinglePost' />
                        <img src="https://www.friidesigns.com/wp-content/uploads/2018/11/white-play-icon-png-6.png" alt="play icon" className="overlay" />
                    </a>
                </div>
            )
        })

        let count = this.state.singlePost.likes.filter(like => like.isLike === true)
        let numberOfLikes = count.length

        return (
            <div>
                <iframe src={`https://www.youtube.com/embed/${this.state.singlePost.video_link}?autoplay=1`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                    className='singleVideo'
                />
                <div className="singlePostBelowIframe">
                    <div className="leftSection">
                        <div className="titleAndLikeBtn">
                            <h2>{this.state.singlePost.title}</h2>
                            <div className="likeBtnNumberDiv">
                                <i onClick={this.likeBtnToggle} className={this.state.isLike ? 'material-icons filled' : 'material-icons empty'}>
                                    favorite
                                </i>
                                <div>
                                    {numberOfLikes}
                                </div>
                            </div>
                        </div>
                        <h4>{this.state.singlePost.username}</h4>
                        <div className="singlePostDescription">
                            <p>{this.state.singlePost.description}</p>
                        </div>
                        <div id="postComment">
                            <form onSubmit={this.createNewComment}>
                                <input type="text" placeholder="username" name="username" onChange={this.handleChange} value={this.state.singleComment.username} className="txtUsername" />
                                <div className="commentAndSubmitBtn">
                                    <input type="text" placeholder="Add a comment..." name="content" onChange={this.handleChange} value={this.state.singleComment.content} className="txtComment" />
                                    <button type="submit" className="submitBtn"> Comment </button>
                                </div>
                            </form>
                        </div>
                        <div className="listOfCommentsDiv">
                            {this.state.singlePost.comments.map((comment) => {
                                return (
                                    <div key={comment.id} className="listOfComments">
                                        <h3>{comment.username}</h3>
                                        <p>{comment.content}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="rightSection">
                        {renderVideo}
                    </div>
                </div>
            </div>
        );
    }
}

export default SinglePost;