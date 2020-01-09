import React, {useRef, useEffect} from 'react';

const App: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);


	useEffect(() => {
		const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

		if (videoRef.current && MediaSource.isTypeSupported(mimeCodec)) {
			const myMediaSource = new MediaSource();
			const url = URL.createObjectURL(myMediaSource);

			videoRef.current.src = url;

			myMediaSource.addEventListener('sourceopen', () => {
				const videoSourceBuffer = myMediaSource.addSourceBuffer(mimeCodec);

				videoSourceBuffer.addEventListener('error', console.log);

				// this is just an express route that return an mp4 file using `res.sendFile`
				fetch('https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.mp4').then((response) => {
					return response.arrayBuffer();
				}).then((videoData) => {
					videoSourceBuffer.appendBuffer(videoData);
				});
			});
		}
	});

	return (
		<video ref={videoRef} controls />
	);
}

export default App;
