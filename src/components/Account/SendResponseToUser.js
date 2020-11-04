import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function SendResponseToUser(props) {
  const classes = useStyles();
  const [message, setMessage] = useState()

  const onchangeHandler=(e)=>{
    setMessage(e.target.value)
  }

  return (
    <div className={classes.root}>
      <Grid container  direction="row"   justify="center"  alignItems="center"spacing={3}>
        <Grid container  direction="row"   justify="center" item xs={12}>
        <TextField
          id="outlined-full-width"
          label="Message"
          style={{ margin: 8 }}
          placeholder="Your Message"
          //helperText="Full width!"
          fullWidth
          margin="normal"
          onChange={onchangeHandler}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"/>
        </Grid>
        <Grid container  direction="row"   justify="center" item xs={6}>
            <Button onClick={()=>props.send(message)} variant="contained" color="secondary">
                Send
            </Button>
        </Grid>
        <Grid container  direction="row"   justify="center" item xs={6}>
            <Button onClick={props.cancel} variant="contained" color="secondary">
                Cancel
            </Button>
        </Grid>
        
      </Grid>
    </div>
  );
}
