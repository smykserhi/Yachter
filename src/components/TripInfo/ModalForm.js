import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch'
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: "15px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
  switch:{
    display: "flex",
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

export default function ModalForm(props) {
  const classes = useStyles();
  const ages = []
  for(let i=21; i<100;i++) ages.push(i)
  
  return (
    <Container mx={"auto"} component="span" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DirectionsBoatIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fill up this form
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={props.first_name}                
                onChange={props.onChange}
              />
            </Grid>  
            <Grid item  md={6} sm={12}>
              <TextField
                autoComplete="fname"
                name="last_name"
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                value={props.last_name} 
                onChange={props.onChange}
              />
            </Grid>    
            <Grid item  md={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                value={props.address} 
                onChange={props.onChange}
              />
            </Grid>
            <Grid item  md={6} sm={12}>   
            <TextField
                autoComplete="fname"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                value={props.city} 
                onChange={props.onChange}
              />
            </Grid>  
            <Grid item  md={6} sm={12}>
              <TextField
                autoComplete="fname"
                name="zip_code"
                variant="outlined"
                required
                fullWidth
                type="number"
                id="zip_code"
                label="Zip code"
                value={props.zip_code} 
                onInput = {(e) =>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5) //max length 5 
                }}
                onChange={props.onChange}
              />
            </Grid>   
            <Grid item  md={6} sm={12}>
              <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Age*</InputLabel>
                <Select
                  labelId="age"
                  id="age"
                  value={props.age}
                  name="age"
                  type="number"
                  onChange={props.onChange}
                  label="Age"
                  >
                  {ages.map(el =>(<MenuItem key={el} value={el}>{el}</MenuItem>))}                  
                </Select>
              </FormControl>
            </Grid> 
            <Grid item  md={6} sm={12}>
              <Box className={classes.switch}>
                <Typography variant="subtitle2" component="label"> Agre share my data with captain</Typography>
                <Switch
                    checked={props.share_data}
                    id="share_data"
                    onChange={props.onChange}
                    name="share_data"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Box>              
              <Box className={classes.switch}>
                <Typography variant="subtitle2" component="label"> I want help captain in that trip</Typography>
                <Switch
                    checked={props.want_help}
                    id="want_help"
                    onChange={props.onChange}
                    name="want_help"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Box>
            </Grid> 
            <Grid item  md={6} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phobe"
                name="phone"
                type="number"
                value={props.phone}
                autoComplete=""
                onInput = {(e) =>{ //set up max value for TextField
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                }}
                onChange={props.onChange}
              />
            </Grid>        
            <Grid item  md={6} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={props.email}
                autoComplete="email"
                onChange={props.onChange}
              />
            </Grid>                  
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={6} xs={11}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={props.isInvalid}
                >
                Send Request
              </Button> 
            </Grid>
            <Grid item md={6} xs={11}>
              <Button
                onClick={props.onClose}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}                
                >
                Close
            </Button> 
            </Grid>
          </Grid> 
        </form>
      </div>      
    </Container>
  );
}