var React = require('react');
var SearchComponent = require('./search.jsx');
var TrackSelector = require('./trackSelector.jsx');
var Playlist = require('./playlist.jsx');
var _ = require('lodash');

var MusicApp = React.createClass({

	getInitialState: function(){
		// initialize soundCloud API
		SC.initialize({
			client_id: this.props.soundCloudKey
		});

		return {
			queriedTracks: [],
			playlistTracks: []
		}
	},

	addToPlaylist: function(track){
		if (!this.state.playlistTracks.includes(track)){
			// changes a state variable, call forceUpdate() to save changes
			this.state.playlistTracks.push(track);
			this.forceUpdate();
			Materialize.toast('Adding '+track.title, 3000, 'rounded')
		}
	},

	removeSong: function(removeTrack){
		var context = this;
		// console.log('inside main removeSong=>', removeTrack)
		if(removeTrack){
			for (var i=0; i < context.state.playlistTracks.length; i++){
				// console.log(context.state.playlistTracks[i].id, removeTrack.id, context.state.playlistTracks[i].id === removeTrack.id)
				if (context.state.playlistTracks[i].id === removeTrack.id){
					// console.log('TRUE', context.state.playlistTracks[i].id, removeTrack.id)
					context.state.playlistTracks.splice(i, 1);
					context.state.playlistTracks = context.state.playlistTracks
					this.forceUpdate();
					Materialize.toast('Removed '+removeTrack.title, 3000, 'rounded')
					return;
				}
			}
		}
	},

	updateSearchResults: function(tracks){
		this.setState({ 
			queriedTracks: tracks
		});
	},

	render: function(){
		var queriedTracks = this.state.queriedTracks;
		var playlistTracks = this.state.playlistTracks;
		var hidden = "center";

		// makes the intro message hidden on first search
		if (queriedTracks.length > 0){
			hidden += " hidden";
		}
		console.log('hidden', hidden, queriedTracks)

		return (
			<section>

				<div className="container row">
					<section className="col s8 z-depth-1 main-right">
						<article className="text-center">
							<SearchComponent onSearchResults={ this.updateSearchResults }/>
						</article>

						<article className={ hidden }>
					   <div className="row">
					        <div className="col s12">
					          <div className="card blue-grey darken-1">
					            <div className="card-content white-text">
					              <span className="card-title">Welcome!</span>
					              <p>This is mixtape. It's super easy to use. <br/>
					            	Search for songs, click to add them to the playlist. <br/> Click play. Repeat.</p>
					            </div>
					          </div>
					        </div>
					      </div>
						</article>

						<article className="text-center">
							<TrackSelector tracks={ queriedTracks } onTrackSelected={ this.addToPlaylist }/>
						</article>
					</section>
					<section className="col s4">
						<Playlist tracks={ playlistTracks } removeSong={ this.removeSong }/>
					</section>
				</div>

				<footer className="fixed-footer">
				
				</footer>
			</section>
			);
	}
});

module.exports = MusicApp;