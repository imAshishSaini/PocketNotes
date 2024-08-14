import React from 'react'
import styles from './Home.module.css'
import notesImage from '../assets/image-removebg-preview.png'
import encrypt from '../assets/lock.png'

function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.heading}>
            <h1>Pocket Notes</h1>
            </div>
            <div className={styles.add}>
            <div className={styles.addIcon}>
                <p>+</p>
            </div>
            </div>
        </div>
        <div className={styles.right}>
            <img src={notesImage}/>
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.<br/>
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

            <div className={styles.msg}>
            <img src={encrypt}/> 
            <p>end-to-end encrypted</p>

            </div>
        </div>
    </div>
  )
}

export default Home