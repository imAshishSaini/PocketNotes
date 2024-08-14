import React, { useState } from 'react';
import styles from './RightSection.module.css'
import formatDateAndTime from '../utils/formatDateAndTime'
import enableBtn from '../assets/enableBtn.png'
import disableBtn from '../assets/disableBtn.png'

const RightSection = ({ note, onNoteUpdated }) => {
  const [newSection, setNewSection] = useState('')
  const [isEnabled, setIsEnabled] = useState(false)
  const noteIconText = (text) => {
    const words = text.split(' ').filter(word => word.length > 0)
    if (words.length === 0)
      return ''
    const firstLetter = words[0][0].toUpperCase()
    if (words.length === 1)
      return firstLetter
    const lastLetter = words[words.length - 1][0].toUpperCase()

    return `${firstLetter}${lastLetter}`
  }

  const handleAddNote = () => {
    if (newSection.trim()) {
      const newSectionAdd = {
        id: note.sections.length + 1,
        text: newSection.trim(),
        time: new Date().toLocaleString(),
      }
      const updated = {
        ...note,
        sections: [...note.sections, newSectionAdd],
      }
      onNoteUpdated(updated)
      setNewSection('')
    }
  }

  const dateTime = (timeStamp) => {
    const { date, time } = formatDateAndTime(timeStamp)
    return `${date} . ${time}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.note}>
          <div className={styles.noteIcon} style={{ backgroundColor: note.color }}>
            {noteIconText(note.id)}
          </div>
          <div className={styles.noteText}><b>{note.id}</b></div>
        </div>
      </div>

      <div className={styles.text}>
        {note.sections.map((section) => (
          <div className={styles.notesSection}  key={section.id}>
            <p>{section.text}</p>
            <p className={styles.timeStamp}>{dateTime(section.time)}</p>
          </div>
        ))}
      </div>

      <div className={styles.textArea}>
        <textarea type='text' className={styles.textInput} placeholder='Enter your text here...........' value={newSection} onChange={(e) => setNewSection(e.target.value)} />
        <button type="button" className={styles.createButton} onClick={handleAddNote}><img src={newSection.trim() ? enableBtn : disableBtn}/></button>

      </div>
    </div>
  );
};

export default RightSection;
