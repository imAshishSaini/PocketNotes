import { useEffect, useState } from 'react'
import styles from './App.module.css'
import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'
import CreateNoteModal from './components/CreateNoteModal'
import NoNotesSelected from './components/NoNotesSelected'

function App() {
  
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  const [selectedNote, setSelectedNote] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const handleSelectedNote = (note) => {
    setSelectedNote(note)
  }

  const handleAddNote = () => {
    setShowModal(true)
  }

  const handleCreateNote = (noteName, noteColor) => {
    const newNote = {
      id: noteName,
      sections: [],
      color: noteColor,
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setShowModal(false);
  }

  const handleNoteUpdated = (updatedNote) => {
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  }
  

  return (
    <div className={styles.container}>
      {(!isMobile || (isMobile && !selectedNote)) && <LeftSection notes={notes} onNoteClick={handleSelectedNote} onAddNote={handleAddNote}/>}
      {(!isMobile || (isMobile && selectedNote)) && (selectedNote ? <RightSection note={selectedNote} onNoteUpdated={handleNoteUpdated}/> : <NoNotesSelected/>)}
      {showModal && <CreateNoteModal showModal={() => setShowModal(false)} onAddNote={handleCreateNote}/>}
    </div>
  )
}

export default App