import React from "react";

const LibrarySong = ({
    audioRef,
    songs,
    setSongs,
    song,
    setCurrentSong,
    isPlaying,
}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        const newSongs = songs.map((newSong) => {
            if (newSong.id === song.id) {
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
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    return (
        <div
            className={`library-song ${song.active && "selected"}`}
            onClick={songSelectHandler}
        >
            <img src={song.cover} alt={song.name}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
