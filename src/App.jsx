// import { useEffect, useState } from 'react'
// import styles from './App.module.css'
// import LeftSection from './components/LeftSection'
// import RightSection from './components/RightSection'
// import CreateNoteModal from './components/CreateNoteModal'
// import NoNotesSelected from './components/NoNotesSelected'

// function App() {
  
//   const [notes, setNotes] = useState(() => {
//     const savedNotes = localStorage.getItem('notes')
//     return savedNotes ? JSON.parse(savedNotes) : []
//   })

//   const [selectedNote, setSelectedNote] = useState(null)
//   const [showModal, setShowModal] = useState(false)

//   useEffect(() => {
//     localStorage.setItem('notes', JSON.stringify(notes))
//   }, [notes])

//   const handleSelectedNote = (note) => {
//     setSelectedNote(note)
//   }

//   const handleAddNote = () => {
//     setShowModal(true)
//   }

//   const handleCreateNote = (noteName, noteColor) => {
//     const newNote = {
//       id: noteName,
//       sections: [],
//       color: noteColor,
//     };
//     setNotes([...notes, newNote]);
//     setSelectedNote(newNote);
//     setShowModal(false);
//   }

//   const handleNoteUpdated = (updatedNote) => {
//     const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
//     setNotes(updatedNotes);
//     setSelectedNote(updatedNote);
//   }
  

//   return (
//     <div className={styles.container}>
//       <LeftSection notes={notes} onNoteClick={handleSelectedNote} onAddNote={handleAddNote}/>
//       <div className={styles.right}>
//       {selectedNote ? <RightSection note={selectedNote} onNoteUpdated={handleNoteUpdated}/> : <NoNotesSelected/>}
//       </div>
//       {showModal && <CreateNoteModal showModal={() => setShowModal(false)} onAddNote={handleCreateNote}/>}
//     </div>
//   )
// }

// export default App



import { useEffect, useState } from 'react';
import styles from './App.module.css';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import CreateNoteModal from './components/CreateNoteModal';
import NoNotesSelected from './components/NoNotesSelected';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // State to track mobile view
  const [isNoteDetailView, setIsNoteDetailView] = useState(false); // State to track if in note detail view

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectedNote = (note) => {
    setSelectedNote(note);
    if (isMobileView) {
      setIsNoteDetailView(true); // Switch to detail view on mobile
    }
  };

  const handleAddNote = () => {
    setShowModal(true);
  };

  const handleCreateNote = (noteName, noteColor) => {
    const newNote = {
      id: noteName,
      sections: [],
      color: noteColor,
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setShowModal(false);
    if (isMobileView) {
      setIsNoteDetailView(true);
    }
  };

  const handleNoteUpdated = (updatedNote) => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  const handleBackToList = () => {
    setIsNoteDetailView(false); // Go back to list view on mobile
  };

  return (
    <div className={styles.container}>
      {isMobileView && isNoteDetailView ? (
        // Show the note detail view full screen on mobile
        <div className={styles['right-section']}>
          <button onClick={handleBackToList} className={styles.backButton}>
            Back
          </button>
          {selectedNote && <RightSection note={selectedNote} onNoteUpdated={handleNoteUpdated} />}
        </div>
      ) : (
        // Default layout (side-by-side for desktop or list view for mobile)
        <>
          <div className={styles['left-section']}>
            <LeftSection notes={notes} onNoteClick={handleSelectedNote} onAddNote={handleAddNote} />
          </div>
          <div className={styles['right-section']}>
            {selectedNote ? (
              <RightSection note={selectedNote} onNoteUpdated={handleNoteUpdated} />
            ) : (
              !isMobileView && <NoNotesSelected />
            )}
          </div>
        </>
      )}
      {showModal && <CreateNoteModal showModal={() => setShowModal(false)} onAddNote={handleCreateNote} />}
    </div>
  );
}

export default App;
