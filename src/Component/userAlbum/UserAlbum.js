// import { useEffect, useRef, useState } from "react";
// import styles from "./userAlbum.module.css";
// import { doc, addDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function UserAlbum({ selectedAlbum, handleBack }) {
//   const [imageName, setImageName] = useState({ imgTitle: "", imgLink: "" });
//   const [images, setImages] = useState([]);
//   const [showSearchInput, setShowSearchInput] = useState(false);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const inputRef = useRef(null);
//   const [editImage, setEditImage] = useState(null);
//   const [searchImage, setSearchImage] = useState("");
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
 
//   async function fetchImagesByAlbum(albumId) {
//     if (!albumId) return;
//     try {
//       const q = query(collection(db, "album_images"), where("albumId", "==", albumId));
//       const querySnapshot = await getDocs(q);
//       const fetchedImages = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setImages(fetchedImages);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   }

//   useEffect(() => {
//     fetchImagesByAlbum(selectedAlbum);
//   }, [selectedAlbum]);

//   function handleSearchInput() {
//     setShowSearchInput((prev) => !prev);
//     setSearchImage("");
//   }

//   useEffect(() => {
//     if (showSearchInput) {
//       inputRef.current.focus();
//     }
//   }, [showSearchInput]);

//   function handleUploadForm() {
//     setShowUploadForm((prev) => !prev);
//     setEditImage(null);
//     setImageName({ imgTitle: "", imgLink: "" });
//   }

//   const deleteImg = async (id) => {
//     const docRef = doc(db, "album_images", id);
//     await deleteDoc(docRef);
//     setImages(images.filter((image) => image.id !== id));
//   };

//   async function addOrUpdateImage(e) {
//     e.preventDefault();
//     if (!imageName.imgTitle || !imageName.imgLink) return;

//     if (editImage) {
//       const docRef = doc(db, "album_images", editImage.id);
//       await updateDoc(docRef, {
//         img_name: imageName.imgTitle,
//         img: imageName.imgLink,
//       });

//       setImages(images.map((img) => (img.id === editImage.id ? { ...img, img_name: imageName.imgTitle, img: imageName.imgLink } : img)));
//       setEditImage(null);
//     } else {
//       const newImage = {
//         img_name: imageName.imgTitle,
//         img: imageName.imgLink,
//         albumId: selectedAlbum,
//       };
//       const docRef = await addDoc(collection(db, "album_images"), newImage);
//       setImages([{ id: docRef.id, ...newImage }, ...images]);
//     }
//     setImageName({ imgTitle: "", imgLink: "" });
//     setShowUploadForm(false);
//   }

//   const filterImages = images.filter((img)=>
//     img.img_name.toLowerCase().includes(searchImage.toLocaleLowerCase())
//   );

//   function handleImageClick(index) {
//     setSelectedImageIndex(index);
//   }

//   function handleNextImage() {
//     setSelectedImageIndex((prevIndex) => 
//       prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
//     );
//   }
  
//   function handlePrevImage() {
//     setSelectedImageIndex((prevIndex) => 
//       prevIndex > 0 ? prevIndex - 1 : prevIndex
//     );
//   }
  

//   function closeImageViewer() {
//     setSelectedImageIndex(null);
//   }

//   return (
//     <div className={styles.albumDetails}>
//       {showUploadForm && (
//         <UploadImage
//           selectedAlbum={selectedAlbum}
//           addOrUpdateImage={addOrUpdateImage}
//           imageName={imageName}
//           setImageName={setImageName}
//           editImage={editImage}
//         />
//       )}

//       <div className={styles.photoContainer}>
//         <div className={styles.photoContainerHead}>
//           <div style={{ display: "flex" }}>
//             <button className={styles.backBtn} onClick={handleBack}>
//               <img src="back.png" alt="back btn" />
//             </button>
//             <h2 className={styles.photoTitle}>Images in {selectedAlbum}</h2>
//           </div>
//         </div>
//         <div className={styles.searchBar}>
//           {showSearchInput && 
//           <input placeholder="Search..." 
//           ref={inputRef} 
//           value={searchImage}
//           onChange={(e)=>setSearchImage(e.target.value)}
//           />}
//           <img
//             src={showSearchInput ? "close.png" : "search.png"}
//             alt="search Icon"
//             className={styles.searchImg}
//             onClick={handleSearchInput}
//           />
//           <button className={styles.addImagesBtn} onClick={handleUploadForm}>
//             {showUploadForm ? "Cancel" : "Add Image"}
//           </button>
//         </div>
//       </div>

//       <div className={styles.imageCardContainer}>
//         {filterImages.length > 0 ? (
//          filterImages.map((img, index) => (
//             <div key={img.id} onMouseOver={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)}>
//               <div className={styles.updateDaleteContainer}
//                style={{ display: hoveredIndex === index ? "flex" : "none" }}
//              >

//                 <img src="updateIcon.png" alt="updateIcon"
               
//                  onClick={() => {
//                    setEditImage(img); 
//                    setShowUploadForm(true);
//                    setImageName({ imgTitle: img.img_name, imgLink: img.img });
//                     }} />

//                 <img className={styles.deleteIcon} src="deleteIcon.png" alt="deleteIcon" 
//                 onClick={() => deleteImg(img.id)} />
                
//               </div>
//               <div className={styles.imageCard} onClick={() => handleImageClick(index)}>
//                 <img src={img.img} alt={img.img_name} />
//                 <p>{img.img_name}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No images added yet.</p>
//         )}
//       </div>
//        {selectedImageIndex !== null && (
//            <div>
//                 <div className={styles.imageViewer}>
//                 <button className={styles.navButton} onClick={handlePrevImage}>&lt;</button>
//                 <img src={images[selectedImageIndex].img} alt={images[selectedImageIndex].img_name} className={styles.largeImage} />
//                 <button className={styles.navButton} onClick={handleNextImage}>&gt;</button>
//               </div>
//                <button className={styles.closeButton} onClick={closeImageViewer}>X</button> 
//   </div>
              
//             )}
//     </div>
//   );
// }

// function UploadImage({ editImage, addOrUpdateImage, imageName, setImageName }) {
//   return (
//     <form onSubmit={addOrUpdateImage} className={styles.imageUploadContainer}>
//       <h2>{editImage ? "Update Image" : "Add Image"}</h2>
//       <input
//         placeholder="Title"
//         value={imageName.imgTitle}
//         onChange={(e) => setImageName({ ...imageName, imgTitle: e.target.value })}
//       />
//       <input
//         placeholder="Image URL"
//         type="file"
//         value={imageName.imgLink}
//         onChange={(e) => setImageName({ ...imageName, imgLink: e.target.value })}
//       />
//       <div className={styles.buttons}>
//         <button type="button" className={styles.clearBtn} onClick={() => setImageName({ imgTitle: "", imgLink: "" })}>
//           Clear
//         </button>
//         <button type="submit" className={styles.createBtn}>
//           {editImage ? "Update" : "Add"}
//         </button>
//       </div>
//     </form>
//   );
// }
import { useEffect, useRef, useState } from "react";
import styles from "./userAlbum.module.css";
import { doc, addDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function UserAlbum({ selectedAlbum, handleBack }) {
  const [imageName, setImageName] = useState({ imgTitle: "", imgLink: "" });
  const [images, setImages] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const inputRef = useRef(null);
  const [editImage, setEditImage] = useState(null);
  const [searchImage, setSearchImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  async function fetchImagesByAlbum(albumId) {
    if (!albumId) return;
    try {
      const q = query(collection(db, "album_images"), where("albumId", "==", albumId));
      const querySnapshot = await getDocs(q);
      const fetchedImages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  useEffect(() => {
    fetchImagesByAlbum(selectedAlbum);
  }, [selectedAlbum]);

  function handleSearchInput() {
    setShowSearchInput((prev) => !prev);
    setSearchImage("");
  }

  useEffect(() => {
    if (showSearchInput) {
      inputRef.current.focus();
    }
  }, [showSearchInput]);

  function handleUploadForm() {
    setShowUploadForm((prev) => !prev);
    setEditImage(null);
    setImageName({ imgTitle: "", imgLink: "" });
  }

  const deleteImg = async (id) => {
    const docRef = doc(db, "album_images", id);
    await deleteDoc(docRef);
    setImages(images.filter((image) => image.id !== id));
  };

  async function addOrUpdateImage(e) {
    e.preventDefault();
    if (!imageName.imgTitle || !imageName.imgLink) return;

    if (editImage) {
      const docRef = doc(db, "album_images", editImage.id);
      await updateDoc(docRef, {
        img_name: imageName.imgTitle,
        img: imageName.imgLink,
      });

      setImages(images.map((img) => (img.id === editImage.id ? { ...img, img_name: imageName.imgTitle, img: imageName.imgLink } : img)));
      setEditImage(null);
    } else {
      const newImage = {
        img_name: imageName.imgTitle,
        img: imageName.imgLink,
        albumId: selectedAlbum,
      };
      const docRef = await addDoc(collection(db, "album_images"), newImage);
      setImages([{ id: docRef.id, ...newImage }, ...images]);
    }
    setImageName({ imgTitle: "", imgLink: "" });
    setShowUploadForm(false);
  }

  const filterImages = images.filter((img) =>
    img.img_name.toLowerCase().includes(searchImage.toLocaleLowerCase())
  );

  function handleImageClick(index) {
    setSelectedImageIndex(index);
  }

  function handleNextImage() {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  }

  function handlePrevImage() {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  }

  function closeImageViewer() {
    setSelectedImageIndex(null);
  }

  return (
    <div className={styles.albumDetails}>
      {showUploadForm && (
        <UploadImage
          selectedAlbum={selectedAlbum}
          addOrUpdateImage={addOrUpdateImage}
          imageName={imageName}
          setImageName={setImageName}
          editImage={editImage}
        />
      )}

      <div className={styles.photoContainer}>
        <div className={styles.photoContainerHead}>
          <div style={{ display: "flex" }}>
            <button className={styles.backBtn} onClick={handleBack}>
              <img src="back.png" alt="back btn" />
            </button>
            <h2 className={styles.photoTitle}>Images in {selectedAlbum}</h2>
          </div>
        </div>
        <div className={styles.searchBar}>
          {showSearchInput && (
            <input
              placeholder="Search..."
              ref={inputRef}
              value={searchImage}
              onChange={(e) => setSearchImage(e.target.value)}
            />
          )}
          <img
            src={showSearchInput ? "close.png" : "search.png"}
            alt="search Icon"
            className={styles.searchImg}
            onClick={handleSearchInput}
          />
          <button className={styles.addImagesBtn} onClick={handleUploadForm}>
            {showUploadForm ? "Cancel" : "Add Image"}
          </button>
        </div>
      </div>

      <div className={styles.imageCardContainer}>
        {filterImages.length > 0 ? (
          filterImages.map((img, index) => (
            <div
              key={img.id}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={styles.updateDaleteContainer}
                style={{ display: hoveredIndex === index ? "flex" : "none" }}
              >
                <img
                  src="updateIcon.png"
                  alt="updateIcon"
                  onClick={() => {
                    setEditImage(img);
                    setShowUploadForm(true);
                    setImageName({ imgTitle: img.img_name, imgLink: img.img });
                  }}
                />
                <img
                  className={styles.deleteIcon}
                  src="deleteIcon.png"
                  alt="deleteIcon"
                  onClick={() => deleteImg(img.id)}
                />
              </div>
              <div className={styles.imageCard} onClick={() => handleImageClick(index)}>
                <img src={img.img} alt={img.img_name} />
                <p>{img.img_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No images added yet.</p>
        )}
      </div>

      {selectedImageIndex !== null && (
        <div>
          <div className={styles.imageViewer}>
            <button className={styles.navButton} onClick={handlePrevImage}>
              &lt;
            </button>
            <img
              src={images[selectedImageIndex].img}
              alt={images[selectedImageIndex].img_name}
              className={styles.largeImage}
            />
            <button className={styles.navButton} onClick={handleNextImage}>
              &gt;
            </button>
          </div>
          <button className={styles.closeButton} onClick={closeImageViewer}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

function UploadImage({ editImage, addOrUpdateImage, imageName, setImageName }) {
  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageName({ ...imageName, imgLink: fileURL }); // Set imgLink to the local file URL
    }
  };

  return (
    <form onSubmit={addOrUpdateImage} className={styles.imageUploadContainer}>
      <h2>{editImage ? "Update Image" : "Add Image"}</h2>
      <input
        placeholder="Title"
        value={imageName.imgTitle}
        onChange={(e) => setImageName({ ...imageName, imgTitle: e.target.value })}
      />


     <input
  type="file"
  id="fileInput"
  onChange={handleFileChange}
  className={styles.customFileInput}
/>


      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => setImageName({ imgTitle: "", imgLink: "" })}
        >
          Clear
        </button>
        <button type="submit" className={styles.createBtn}>
          {editImage ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
