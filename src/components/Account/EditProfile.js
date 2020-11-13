import React ,{useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

const experianceArr = []
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
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  formControl: {
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
  const [setUp, setSetUp] = React.useState(true)
  //save input data to variable
  const onShangeHandler=(e) =>{
    if(e.target.name === "username") setUsername(e.target.value)
    else if(e.target.name === "experiance")  setExperiance(e.target.value)
    else if(e.target.name === "captain")  setCaptain(e.target.checked)
  }
  //on submit create response and call props function
  const onSubmit =(e)=>{
    const responce = {username, experiance, captain }   
    props.onSubmit(responce)
    e.preventDefault()
  }
  // this function execute every time when component mount to page like componentDidMount
  useEffect(() => {    
    if(props.requestParam && setUp){ // if request patam exist and setUp 
      setUsername(props.requestParam.username)
      setCaptain(props.requestParam.captain)
      setExperiance(props.requestParam.experiance)
      setSetUp(false)
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
                  onChange={onShangeHandler}
                  label="experiance">
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
            className={classes.submit}>
            Save changes
          </Button>          
        </form>
      </div>      
    </Container>
  );
}