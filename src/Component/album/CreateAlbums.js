import { useEffect, useState } from "react"
import styles from "./Album.module.css"


export  default function CreateAlbums(props){
   
    const{albumName, setAlbumName, handleSbumit} = props;
   
    function handleAlbumClear(){
       setAlbumName("");
    }

    return(
      <>
      <div className={styles.createAlbumsContainer}>
        <form onSubmit={handleSbumit}>
        <h2>Create an album</h2>
        <div className={styles.createAlbums}>
            <input placeholder="Album Name"  value={albumName} onChange={(e)=>setAlbumName(e.target.value)}/>
              <button className={styles.clearBtn} onClick={handleAlbumClear}>Clear</button>
           <button className={styles.createBtn} >Create</button>
           </div>
           </form>
        </div>
          </>
    )
}