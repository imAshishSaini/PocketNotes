import React, { useState } from 'react'
import styles from './CreateNoteModal.module.css'

const colors = ['#d892f8', '#ff66b3', '#53e7f3', '#ff9478', '#0066ff', '#5c85f2']

function CreateNoteModal({ showModal, onAddNote }) {
  const [noteName, setNoteName] = useState('')
  const [noteColor, setNoteColor] = useState(colors[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (noteName.trim()) {
      onAddNote(noteName, noteColor)
      setNoteName('')
      setNoteColor(colors[0])
    } else {
      alert('Please enter a group name')
    }
  }


  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3>Create New Group</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.data}>
            <h3>Group Name</h3>
            <input type="text" placeholder='Enter group name' value={noteName} onChange={e => setNoteName(e.target.value)}></input>
          </div>
          <div className={styles.data}>
            <h3>Choose colour</h3>
            <div className={styles.option}>
              {
                colors.map(color => (
                  <div key={color} className={`${styles.color} ${noteColor === color ? styles.selected : ''}`} style={{ backgroundColor: color }} onClick={() => setNoteColor(color)}></div>
                ))
              }
            </div>
          </div>
          <button type="submit" className={styles.createButton}>Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNoteModal