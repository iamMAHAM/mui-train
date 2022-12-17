import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import useStyles from '../styles/useStyles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [language, setLanguage] = useState('c');
  const navigate = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (!title) {
      setTitleError(true);
    }
    if (!details) setDetailsError(true);

    if (!title || !details) return;
    console.log('there is no error now ...');
    fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, details, language }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(()=>navigate.push('/'))
  };

  useEffect(() => {
    console.log(language);
  }, [language]);
  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component={'h2'}
        gutterBottom
      >
        Creates a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          type={'text'}
          onChange={(e) => setTitle(e.target.value)}
          label="note title"
          value={title}
          fullWidth
          variant="outlined"
          required
          className={classes.field}
          error={titleError}
        />
        <TextField
          type={'text'}
          onChange={(e) => setDetails(e.target.value)}
          label="Detail"
          fullWidth
          variant="outlined"
          value={details}
          required
          multiline
          minRows={5}
          error={detailsError}
          className={classes.field}
        />
        <FormControl className={classes.field}>
          <FormLabel>Category</FormLabel>
          <RadioGroup
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <FormControlLabel
              control={<Radio />}
              label="python"
              value={'python'}
            />
            <FormControlLabel control={<Radio />} label="C" value="c" />
            <FormControlLabel
              control={<Radio />}
              label="javascript"
              value="javascript"
            />
            <FormControlLabel
              control={<Radio />}
              label="typescript"
              value="typescript"
            />
          </RadioGroup>
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          endIcon={<AccountBalanceIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
