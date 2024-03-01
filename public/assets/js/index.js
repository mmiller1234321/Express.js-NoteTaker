document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.querySelector('.note-form');
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const clearBtn = document.querySelector('.clear-btn');
  const noteList = document.querySelector('#list-group');

  let activeNote = {};

  // Function to fetch notes from the server
  const getNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      renderNoteList(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Function to save a note to the server
  const saveNote = async (note) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Function to delete a note from the server
  const deleteNote = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Function to render the list of notes
  const renderNoteList = (notes) => {
    noteList.innerHTML = '';
    notes.forEach((note) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.setAttribute('data-note-id', note.id);
      li.innerHTML = `
        <span>${note.title}</span>
        <i class="fas fa-trash-alt float-end delete-note"></i>
      `;
      noteList.appendChild(li);
    });
  };

  // Function to render the active note
  const renderActiveNote = () => {
    if (activeNote.id) {
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      noteTitle.value = '';
      noteText.value = '';
    }
  };

  // Event listener for clicking on a note
  noteList.addEventListener('click', (event) => {
    if (event.target.matches('.list-group-item')) {
      const noteId = event.target.getAttribute('data-note-id');
      activeNote = { ...notes.find((note) => note.id === noteId) };
      renderActiveNote();
    } else if (event.target.matches('.delete-note')) {
      const noteId = event.target.parentElement.getAttribute('data-note-id');
      deleteNote(noteId);
      getNotes();
    }
  });

  // Event listener for saving a note
  saveNoteBtn.addEventListener('click', async () => {
    const newNote = {
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
    };
    if (!newNote.title || !newNote.text) return;
    const savedNote = await saveNote(newNote);
    getNotes();
    renderActiveNote();
  });

  // Event listener for creating a new note
  newNoteBtn.addEventListener('click', () => {
    activeNote = {};
    renderActiveNote();
  });

  // Event listener for clearing the note form
  clearBtn.addEventListener('click', () => {
    activeNote = {};
    renderActiveNote();
  });

  // Initialize the application
  getNotes();
});
