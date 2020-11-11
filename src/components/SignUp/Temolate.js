import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch'
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const experianceArr = new Array()
  for(let i=1; i<11;i++) experianceArr.push(i)
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding : "30px",
    borderRadius: "15px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    //margin: theme.spacing(1),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  switch:{
    display: "flex",
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

export default function SignUpTemplate(props) {
  const classes = useStyles();
  const [experiance, setExperiance] = React.useState(1);
  const experianceOnChange = (e)=>{
    setExperiance(e.target.value)
    props.onChange(e)
    //console.log("Set expriance to ", e.target.value)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={props.onChange}
              />
            </Grid>            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                //id="password"
                autoComplete="current-password"
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordTwo"
                label="Password one more time"
                type="password"
                //id="password "
                autoComplete="current-password"
                onChange={props.onChange}
              />
            </Grid>  
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Trips*</InputLabel>
                <Select
                  labelId="experiance"
                  id="experiance"
                  value={experiance}
                  name="experiance"
                  //type="number"
                  onChange={experianceOnChange}
                  label="experiance"
                  >
                  {experianceArr.map(el =>(<MenuItem key={el} value={el}>{el}</MenuItem>))}  
                  <MenuItem key={11} value="more then 10">More then 10 trips</MenuItem>                
                </Select>
              </FormControl>

            </Grid> 
            <Grid item xs={6}>
              <Box className={classes.switch}>
                <Typography variant="subtitle2" component="label"> A'm captain</Typography>
                <Switch
                    checked={props.captain}
                    id="captain"
                    onChange={props.onChange}
                    name="captain"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Box>     
            </Grid>     
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={props.isInvalid}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>      
    </Container>
  );
}