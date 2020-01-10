import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class AllPost extends Component {
    state = {
        allPost: []
    }

    componentDidMount = () => {
        this.refreshPage()
    }

    refreshPage = async () => {
        const getAllPost = await axios.get('/api/v1/post')
        this.setState({ allPost: getAllPost.data })
        console.log(this.state.allPost)
    }

    render() {
        return (
            <div className="App">
                <div className="listOfPost">
                    {this.state.allPost.map((post) => {
                        return (
                            <div key={post.id} className="singleVideoContainer">
                                <Link to={`/singlepost/${post.id}`} >
                                    <img src={`http://img.youtube.com/vi/${post.video_link}/mqdefault.jpg`} alt=' ' className='videoThumbnail' />
                                    <img src="https://www.friidesigns.com/wp-content/uploads/2018/11/white-play-icon-png-6.png" alt="play icon" className="overlay" />
                                    {/* <i className="material-icons overlay" >
                                        play_arrow
                                    </i> */}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default AllPost;