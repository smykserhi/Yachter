import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
export default function DeleteConfirmation(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container  direction="row"   justify="center"  alignItems="center"spacing={3}>
        <Grid container  direction="row"   justify="center" item xs={12}>
          <Typography variant="h4" gutterBottom>
            Delete this item
          </Typography>
        </Grid>
        <Grid container  direction="row"   justify="center" item xs={6}>
          <Button onClick={props.yesDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </Grid>
        <Grid container  direction="row"   justify="center" item xs={6}>
          <Button onClick={props.noDelete} variant="contained" color="secondary">
            No
          </Button>
        </Grid>
        
      </Grid>
    </div>
  );
}
