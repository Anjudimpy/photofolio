import { useState, useEffect } from "react";
import Album from "./Component/album/Album";
import NavBar from "./Component/NavBar/Nav";
import UserAlbum from "./Component/userAlbum/UserAlbum";
import CreateAlbums from "./Component/album/CreateAlbums";
import { db } from "./firebase"; 
import { doc, collection, addDoc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";


function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showCreateAlbums, setShowCreateAlbums] = useState(false);
  const[albumName, setAlbumName] = useState("");

  useEffect(() => {
       const unsub = onSnapshot(collection(db,"albums"),(snapShot)=>{
           const albumList = snapShot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data()
            }
           })
           setAlbums(albumList);
           
    })
  }, []);

  async function handleSbumit(e) {
    e.preventDefault();
    if (albumName.trim()) {
      const newAlbum = {
        albumName: albumName,
        createOn: new Date(),
      };
  
      const docRef = await addDoc(collection(db, "albums"), newAlbum);
  
      setAlbums([{ id: docRef.id, ...newAlbum }, ...albums]);
  
      setAlbumName("");
    }
  }
  

  function handleSelectAlbum(album) {
    setShowCreateAlbums(false);
    setSelectedAlbum(album.albumName);
  }

  function handleBack() {
    setSelectedAlbum(null);
  }

  return (
    <div className="App">
      <NavBar handleBack={handleBack}/>
      {showCreateAlbums && (
        <CreateAlbums albums={albums} setAlbums={setAlbums} albumName={albumName} setAlbumName={setAlbumName} handleSbumit={handleSbumit} />
      )}

      {selectedAlbum ? (
        <UserAlbum selectedAlbum={selectedAlbum} handleBack={handleBack} />
      ) : (
        <Album
          albums={albums}
          handleSelectAlbum={handleSelectAlbum}
          showCreateAlbums={showCreateAlbums}
          setShowCreateAlbums={setShowCreateAlbums}
        />
      )}
    </div>
  );
}

export default App;
