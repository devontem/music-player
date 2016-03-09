
var React = require('react');
var ReactDOM = require('react-dom');
var MusicApp = require('./components/musicapp.jsx')
var SOUND_CLOUD_KEY = require('./config.jsx').SOUND_CLOUD_KEY;

ReactDOM.render(
	<MusicApp soundCloudKey={ SOUND_CLOUD_KEY } />,
	document.getElementById('app')
	); 