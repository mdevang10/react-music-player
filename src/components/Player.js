import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const audioRef = useRef(null);

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime,
            duration,
        });
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                ></input>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="play"
                    icon={!isPlaying?faPlay:faPause}
                    size="2x"
                    onClick={playSongHandler}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="skip=forward"
                    icon={faAngleRight}
                    size="2x"
                ></FontAwesomeIcon>
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
            ></audio>
        </div>
    );
};

export default Player;