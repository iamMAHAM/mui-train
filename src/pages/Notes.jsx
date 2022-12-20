import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then((res) => res.json())
      .then((data) => setNotes([...data]));
  }, []);

  const deleteNote = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setNotes((old) => old.filter((n) => n.id !== id));
      });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12} md={6} lg={4}>
            {' '}
            <NoteCard note={note} deleteNote={deleteNote} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
