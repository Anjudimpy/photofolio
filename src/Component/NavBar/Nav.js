import { useState } from "react"
import styles from "./Nav.module.css"

export default function NavBar({handleBack}){

    return(
        <>
        <div className={styles.navbarContainer}>
         <div className={styles.navLogo} onClick={handleBack}>
         <img src="logo.png"/>
         </div>
         <h3 className={styles.navLogo} onClick={handleBack}>PhotoFolio</h3> 
        </div>
        </>
    )
}