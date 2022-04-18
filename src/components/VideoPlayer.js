import React from "react";
import useVideoPlayer from "../utils/hooks/useVideoPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faVolumeUp, faPause, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = (props) => {
    const testeVideo = "../uploads/videos/1645063930419-epic-2022-01-25_10.54.02.mp4";
    const videoElement = React.useRef(null);
    const {
        playerState,
        toggleFullScreen,
        toggleMute,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed
    } = useVideoPlayer(videoElement);

    return (
        <div className="video-wrapper">
            <video 
                src={testeVideo}
                ref={videoElement}
                onTimeUpdate={handleOnTimeUpdate}/>

            <div className="controls">
                <div className="actions">
                    <button onClick={togglePlay}>
                        {!playerState.isPlaying ? 
                            (<FontAwesomeIcon className="control-buttons" icon={faPlay} />) :
                            (<FontAwesomeIcon className="control-buttons" icon={faPause} />)
                        }
                    </button>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}/>

                <select 
                    className="velocity"
                    value={playerState.speed}
                    onChange={(e) => handleVideoSpeed(e)}>
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                </select>

                <button className="mute-btn" onClick={toggleMute}>
                    {!playerState.isMuted ? 
                        (<FontAwesomeIcon className="control-buttons" icon={faVolumeUp} />) :
                        (<FontAwesomeIcon className="control-buttons" icon={faVolumeXmark} />)
                    }
                </button>
            </div>
        </div>
    );
}

export default VideoPlayer;