import React from 'react'
import styles from './NoNotesSelected.module.css'
import notesImage from '../assets/notes.png'
import encrypt from '../assets/lock.png'

function NoNotesSelected() {
    return (
        <div className={styles.container}>
            <img src={notesImage} />
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.<br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

            <div className={styles.msg}>
                <img src={encrypt} />
                <p>end-to-end encrypted</p>

            </div>
        </div>
    )
}

export default NoNotesSelected