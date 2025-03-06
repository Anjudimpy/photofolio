import { useState } from "react";
import styles from "./Album.module.css";

export default function Album({ albums,handleSelectAlbum,showCreateAlbums, setShowCreateAlbums }) {


  function handleAlbums() {
    setShowCreateAlbums((prev) => !prev);
  }

  return (
    <div className={styles.albumContainer}>

      
      <div className={styles.albums}>
        <h2>Your Albums</h2>
        <button
          onClick={handleAlbums}
          style={{
            color: showCreateAlbums ? "red" : "",
            border: showCreateAlbums ? "2px solid red" : "",
          }}
        >
          {showCreateAlbums ? "Cancel" : "Add Album"}
        </button>
      </div>

      <div className={styles.albumCardContainer}>
        {albums.map((album, i) => (
          <div
            className={styles.albumCard}
            key={i}
            onClick={() => handleSelectAlbum(album)} 
          >
            <div className={styles.cardImg}>
              <img src="img.png" alt="Album" />
            </div>
            {album.albumName}
          </div>
        ))}
      </div>
    </div>
  );
}
