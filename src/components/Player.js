import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    songInfo,
    setSongInfo,
    isPlaying,
    setIsPlaying,
    audioRef,
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
}) => {
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
    useEffect(() => {
        const newSongs = songs.map((newSong) => {
            if (newSong.id === currentSong.id) {
                return {
                    ...newSong,
                    active: true,
                };
            } else {
                return {
                    ...newSong,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        
        if (direction === "skip-forward") {
           await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                 if (isPlaying) {
                     audioRef.current.play();
                 }
                return;
            }
           await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) {
            audioRef.current.play()
        }
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        type="range"
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    ></input>
                    <div style={trackAnim} className="animate-track"></div>
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                    onClick={() => skipTrackHandler("skip-back")}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="play"
                    icon={!isPlaying ? faPlay : faPause}
                    size="2x"
                    onClick={playSongHandler}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="skip=forward"
                    icon={faAngleRight}
                    size="2x"
                    onClick={() => skipTrackHandler("skip-forward")}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default Player;
