import React,{useState} from 'react';
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
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    //padding : "30px",
    borderRadius: "15px",
    //overflow: "scroll"
    //width: "85%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    //margin: theme.spacing(1),
    width: "100%",
  },
  switch:{
    display: "flex",
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));
const inputProps = {
  //step: 300,
  maxLength: 5
  
};
export default function ModalForm(props) {
  const classes = useStyles();
  const ages = new Array()
  for(let i=21; i<100;i++) ages.push(i)
  //console.log(age)
  //const [age, setAge] = React.useState(21);
  const handleOnChangeSelect = (e)=>{
    //setAge(e.target.value)
    props.onChange(e)
  }
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
                //autoFocus
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
                //autoFocus
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
                //autoFocus
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
                //maxLength={3}
                //inputProps={{ maxLength: 3 }}
                onInput = {(e) =>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                }}
                //inputProps={inputProps}
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
                  onChange={handleOnChangeSelect}
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
        </form>
      </div>      
    </Container>
  );
}