import React, { Component } from "react";
import axios from "axios";

const API_KEY = "AIzaSyCTVv4KYWNay7JbqX5w_o6V1nsCtXcXfXw";

class YouTubeVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            searchQuery: "",
            inputValue: "",
        };
    }

    fetchVideos = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`, {
                    params: {
                        key: API_KEY,
                        q: this.state.searchQuery,
                        part: "snippet",
                        type: "video",
                        maxResults: 50
                    }
                }
            );
            this.setState({ videos: response.data.items });
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
        }
    };

    handleSearch = () => {
        this.setState({ searchQuery: this.state.inputValue }, () => {
            this.fetchVideos();
        });
    };

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    renderSearchUI = () => {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch} >Search</button>
                <ul>
                    {this.state.videos.map(video => (
                        <li key={video.id.videoId}>
                            <h3>{video.snippet.title}</h3>
                            <iframe 
                                width="560" 
                                height="315" 
                                src={`https://www.youtube.com/embed/${video.id.videoId}`} 
                                title={video.snippet.title}
                                allowFullScreen
                            ></iframe>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.renderSearchUI()}
            </div>
        );
    }
}

export default YouTubeVideos;
