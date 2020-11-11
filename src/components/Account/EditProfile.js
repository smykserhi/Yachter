import React ,{useEffect} from 'react';
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
  for(let i=0; i<11;i++) experianceArr.push(i)

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

export default function EditProfile(props) {
  const classes = useStyles();
  const [experiance, setExperiance] = React.useState(0);
  const [username, setUsername] = React.useState();
  const [captain, setCaptain] = React.useState(true);
  // const experianceOnChange = (e)=>{
  //   setExperiance(e.target.value)
  //   //props.onChange(e)
  //   //console.log("Set expriance to ", e.target.value)
  // }
  //console.log(props.user&& "Useer",props.user)
  // const onChangeHandle=(e)=>{
  //   if(e.target.id === "username" ) setUsername(e.target.value)
  //   if(e.target.id === "captain" ) setCaptain(e.target.checked)

  // }
  const onShangeHandler=(e) =>{
    //props.onChange(e)
    //console.log(e.target.name)
    if(e.target.name === "username") setUsername(e.target.value)
    else if(e.target.name === "experiance")  setExperiance(e.target.value)
    else if(e.target.name === "captain")  setCaptain(e.target.checked)
  }
  const onSubmit =(e)=>{
    const responce = {username, experiance, captain }
    //console.log("responce obj", responce)
    props.onSubmit(responce)
    e.preventDefault()
  }
  useEffect(() => {
    //console.log("props",props.requestParam && props.requestParam)
    if(props.requestParam){
      setUsername(props.requestParam.username)
      setCaptain(props.requestParam.captain)
      setExperiance(props.requestParam.experiance)
    }
    
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                //sautoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={username || ""}
                onChange={onShangeHandler}
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
                  onChange={onShangeHandler}
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
                    checked={captain}
                    id="captain"
                    onChange={onShangeHandler}
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
            //disabled={props.isInvalid}
          >
           Save changes
          </Button>          
        </form>
      </div>      
    </Container>
  );
}