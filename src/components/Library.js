import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    setSongs,
    libraryStatus,
}) => {
    return (
        <div className={`library ${libraryStatus && 'active-library'}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        key={song.id}
                        songs={songs}
                        setSongs={setSongs}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                    ></LibrarySong>
                ))}
            </div>
        </div>
    );
};

export default Library;
