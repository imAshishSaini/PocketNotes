import React, { useState } from 'react';
import styles from './LeftSection.module.css';

const LeftSection = ({ notes, onNoteClick, onAddNote }) => {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const noteIconText = (text) => {
    const words = text.split(' ').filter(word => word.length > 0)
    if(words.length === 0) 
      return ''
    const firstLetter = words[0][0].toUpperCase()
    if(words.length === 1)
      return firstLetter
    const lastLetter = words[words.length - 1][0].toUpperCase()

    return `${firstLetter}${lastLetter}`
  }

  const handleNoteClick = (note) => {
    setSelectedNoteId(note.id);
    onNoteClick(note);
  };

  return (
        <div className={styles.container}>
            <div className={styles.heading}>
            <h1>Pocket Notes</h1>
            </div>
            <div className={styles.add} onClick={onAddNote}>
            <div className={styles.addIcon}>
                <p>+</p>
            </div>
            </div>

      <div className={styles.notesList}>
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${styles.note} ${note.id === selectedNoteId ? styles.selectedNote : ''}`}
            
            onClick={() => handleNoteClick(note)}
          >
            <div className={styles.noteIcon} style={{ backgroundColor: note.color }}>
              {noteIconText(note.id)}
            </div>
            <div className={styles.noteText}><b>{note.id}</b></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
