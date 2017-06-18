// Create a new Component Should Produce some HTML
//Take this component's Genertaed HTML and put in Page i.e. in DOM
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetails from './components/video_detail';
import _ from 'lodash';

const API_KEY='AIzaSyC0YtYNTnWRAsO2k0yFgTpKOVfs4VMpSpk';
class App extends Component{

    constructor(props){
        super(props);
        this.state={
                videos:[],
                selectedVideo:null
        };

        this.videoSearch("pune");
    }
    videoSearch(term){
        YTSearch({key:API_KEY,term:term},(videos)=> {
            this.setState({
                videos:videos,
                selectedVideo:videos[0]
            });
        });
    }
    render()
    {
        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div>
                <SearchBar
                    onSearchTermChange={videoSearch}
                />
                <VideoDetails
                    video={this.state.selectedVideo}
                />
                <VideoList
                    onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.querySelector('.container'));
