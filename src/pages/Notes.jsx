import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/notes')
      .then((res) => res.json())
      .then((data) => setNotes([...data]));
  }, []);

  useEffect(() => console.log(notes), [notes]);
  return (
    <Container>
      <Grid container>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12} md={6} lg={4}>
            {' '}
            <Paper>{note.title}</Paper>{' '}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
