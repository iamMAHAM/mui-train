import React from 'react';
import {
  Avatar,
  Card,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DeleteOutline } from '@mui/icons-material';
import { blue, green, yellow } from '@material-ui/core/colors';
import { red } from '@mui/material/colors';

const useStyle = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      return note.language === 'javascript'
        ? yellow[200]
        : note.language === 'typescript'
        ? blue[300]
        : note.language === 'C'
        ? red[300]
        : green[100];
    },
  },
});
export default function NoteCard({ note, deleteNote }) {
  const classes = useStyle(note);
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.language?.slice(0, 1)?.toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => deleteNote(note.id)}
            >
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.language}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
