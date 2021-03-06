import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Alert from '@material-ui/lab/Alert';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    margin: 10
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const borderProps = {    
    mt: 5,
    border: 1,
    style: { width: '95%', height: '0px' },
    height: 10,
    
  };
const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: "center",   
        margin: "5vh 0",
        backgroundColor: theme.palette.background.paper,    
        padding: "2vh 0",
        borderRadius: "15px",
        [theme.breakpoints.down('sm')]: {
            width: "80%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "95%",
        },
        [theme.breakpoints.up('md')]: {
            width: "60%",
        } 
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    top:{
        width: "80%"
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    input: {
        display: 'none',
    },
    addBytton:{
        marginRight:"10px",      
    },
    addPhotoButton:{
        [theme.breakpoints.up('sm')]: {
            justifyContent : "flex-start"
        },
        [theme.breakpoints.down('sm')]: {
        justifyContent : "flex-end"
      },
    }
}));

const AddTripTemplate= (props)=> {
    const userId = props.match.params.userId    
    const dayDisTemplate = {dayDis: "", imgUrl: null }   
    let tempArr=[]
    const classes = useStyles();
    const [shipName, setShipName] = React.useState("");
    const [passangers, setPassangers] = React.useState(1);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [portDeparture, setPortDeparture] = React.useState("");
    const [portOfArival, setPortOfArival] = React.useState();
    const [tripDesacription, setTripDesacription] = React.useState();
    const [title, setTitle] = React.useState();
    const [fee, setFee] = React.useState("");
    const [mainImgUrl, setMainImgUrl] = React.useState(null);  
    const [daysDis, setDaysDis] = React.useState([dayDisTemplate]);
    const [yatchPhoto, setYatchPhoto] = React.useState([null]);
    const [message , setMessage] = React.useState(null)
    const [progress, setProgress] = React.useState(0)   
    //validator for daysDis arrey of objects
    const dayDisValidator = ()=> {
        let res
        daysDis.map(el=>{
            if(el.dayDis !== "" && el.imgUrl !== null) res = true
            else res = false
        })
        return res
   }
   //Validation expration for form
    const validation = shipName !== "" &&  startDate !== ""&& endDate !== "" && portDeparture !== "" && title !== "" && fee !== "" && mainImgUrl !== null && yatchPhoto[0] !== null && dayDisValidator()

    //function recive image and function where save image url
    const saveImage=(img, func, arr=null, index=null)=>{
        const imgArr = [...img]
        if(imgArr.length > tempArr.length){
            while(imgArr.length > tempArr.length){
                tempArr.push("")
            }
        }        
        imgArr.map((img, el)=>{    
            const upLoadTask = props.firebase.storage.ref(`images/${img.name}`).put(img)
            upLoadTask.on(
                "state_changed",
                snapshot =>{
                    let prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)                  
                    setProgress(prog)                  
                },
                error =>{
                    console.log(error)
                },
                () =>{
                    props.firebase.storage
                        .ref("images")
                        .child(img.name)
                        .getDownloadURL()
                        .then(url=>{                    
                            if(arr !== null ){  // save in dayysDis object   {dayDis , imgUrl}                      
                                if(index !== null){
                                arr[index].imgUrl= url  
                                func([...arr])
                            }                                              
                            else { //other imgUrl
                                tempArr[el]= url                             
                                func(tempArr)  
                            }                        
                        }else func(url) //if array and index did not passed to function
                        })
                
                    }
            )
        })
    
    } 
    // save data to variable
    const onchangeHandler = (e)=>{    
        if(e.target.name === "Ship name") setShipName(e.target.value)
        else if(e.target.name === "Passgers") setPassangers(e.target.value)
        else if(e.target.name === "Start date") setStartDate(e.target.value)
        else if(e.target.name === "End date") setEndDate(e.target.value) 
        else if(e.target.name === "Port departure") setPortDeparture(e.target.value) 
        else if(e.target.name === "Port of arival") setPortOfArival(e.target.value)
        else if(e.target.name === "Trip description") setTripDesacription(e.target.value)
        else if(e.target.name === "Title") setTitle(e.target.value)
        else if(e.target.name === "Fee") setFee(e.target.value)    
    }
    //save data to daysDis arrey of objects [{dayDis, imgUrl}]
    const HandleOnchangeDayDis = (e,index) =>{      
        let tempDaysDis = daysDis
        tempDaysDis[index].dayDis = e.target.value
        setDaysDis([...tempDaysDis])
    }
    //click add image icon
    const handleAddImage =(e)=>{        
        if(e.target.name === "mainImage") saveImage(e.target.files, setMainImgUrl)
        else if(e.target.name === "yatchPhoto") saveImage(e.target.files, setYatchPhoto, yatchPhoto )
        else { saveImage(e.target.files, setDaysDis, daysDis, e.target.name )    //save to daysDis arrey        
        }
    }
    //save button
    const handleOnSave = ()=>{
        const response = {
            shipName,
            passangers,
            startDate,        
            endDate,
            portDeparture,
            portOfArival,
            tripDesacription,
            title,
            fee,
            imgUrl: mainImgUrl,
            daysDis,
            yatchPhoto
        }    
        const newResponse = {...response, userId}
        const cardPostId = props.firebase.addCard(newResponse)
        props.firebase.addCardToUser(userId, {...newResponse, cardPostId  })
        setMessage("success")
        setTimeout(() => {
            props.history.push(ROUTES.ACCOUNT)     
        }, 2000);
    }
    //add day button
    const handleAddDay=(e)=>{
        let tempDaysDis = daysDis 
        tempDaysDis.push(dayDisTemplate)
        setDaysDis([...tempDaysDis])    
    }
    //delete day button
    const handleDeleteDay =(e)=>{
        let tempDays= daysDis
        tempDays.splice(e,1)  // delete element with e index      
        setDaysDis([...tempDays])
    }
    //on close 
    const handleCancel=()=>{
        props.history.push(ROUTES.ACCOUNT)  
    }    
    return (
        <div className={classes.root}>
            <Grid container direction="column"  justify="center"  alignItems="center" spacing={3}>
                <Grid item container  justify="center" xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Add new trip
                    </Typography>  
                </Grid>
                <Grid container  justify="center" item xs={12}>
                    <Grid className={classes.top} container  direction="row"  >
                        <Grid item  container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width1"
                                label="Title"
                                name="Title"
                                required={true}
                                style={{ margin: 8 }}
                                defaultValue={title}
                                fullWidth
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item  container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width2"
                                label="Fee $"
                                name="Fee"
                                type="number"
                                style={{ margin: 8 }}
                                required={true}
                                defaultValue={fee}
                                fullWidth
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item  container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width3"
                                label="Ship name"
                                name="Ship name"
                                style={{ margin: 8 }}
                                required={true}
                                defaultValue={shipName}
                                fullWidth
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item container  justify="center" md={6} xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Passgers</InputLabel>
                                <Select
                                    name="Passgers"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={passangers}
                                    onChange={onchangeHandler}
                                    label="Passgers"
                                    required={true}
                                    >
                                    <MenuItem value={1}>1 </MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container  justify="center" item md={6} xs={12}>
                            <TextField
                                id="outlined-full-width4"
                                label="Start date"
                                name="Start date"
                                style={{ margin: 8 }}
                                fullWidth
                                required={true}
                                defaultValue={startDate}
                                onChange={onchangeHandler}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        
                        </Grid>
                        <Grid item container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width5"
                                label="End date"
                                name="End date"
                                style={{ margin: 8 }}
                                fullWidth
                                required={true}
                                defaultValue={endDate}
                                onChange={onchangeHandler}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/> 
                        </Grid>
                        <Grid item container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width6"
                                label="Port departure"
                                name="Port departure"
                                style={{ margin: 8 }}
                                required={true}
                                fullWidth
                                defaultValue={portDeparture}
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item container  justify="center" md={6} xs={12}>
                            <TextField
                                id="outlined-full-width7"
                                label="Port of arival"
                                name="Port of arival"
                                style={{ margin: 8 }}
                                required={true}
                                fullWidth
                                defaultValue={portOfArival}
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item container  justify="center"xs={12}>
                            <TextField
                                id="outlined-full-width8"
                                label="Trip description"
                                name= "Trip description"
                                style={{ margin: 8 }}
                                multiline={true}
                                required={true}
                                rows="2"
                                fullWidth
                                defaultValue={tripDesacription}
                                onChange={onchangeHandler}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"/>
                        </Grid>
                        <Grid item container  justify="flex-end" alignItems="center" xs={12}>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name="mainImage" onChange={handleAddImage}/>
                            <Typography variant="subtitle1" gutterBottom>
                                {mainImgUrl === null ? "Add photo" : "Change photo"} 
                            </Typography>
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    {mainImgUrl === null ? <PhotoCamera color="error" fontSize="large" /> : <PhotoCamera color="action" fontSize="large"/>} 
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>
                    <Box  border={1} borderColor="text.primary" {...borderProps} />           
                </Grid>
                <Grid item container  justify="center" xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Trip planer
                    </Typography>  
                </Grid>
                <Grid container  justify="center" item xs={12}>
                    {daysDis.map((day,index)=>(
                        <Grid key={index} className={classes.top} container  direction="row"  >                
                            <Grid item  container  justify="center" alignItems="center" md={1} xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Day {index+1}
                                </Typography>
                            </Grid>
                            <Grid item  container  justify="center" md={6} xs={12}>
                                <TextField                            
                                    label="Day Discription"
                                    name="DayDis"
                                    style={{ margin: 8 }}
                                    multiline={true}
                                    rows="1"
                                    fullWidth
                                    onChange={(e)=>HandleOnchangeDayDis(e,index)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item container  className={classes.addPhotoButton} alignItems="center" md={5} xs={12}>                                    
                                <input accept="image/*" className={classes.input} id={`icon-button-file${index}`} type="file" name={index} onChange={handleAddImage}/>
                                <Typography variant="subtitle1" gutterBottom>
                                    {daysDis[index].imgUrl === null ? "Add photo" : "Change photo"} 
                                </Typography>
                                <label htmlFor={`icon-button-file${index}`}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        {daysDis[index].imgUrl === null ? <PhotoCamera color="error" fontSize="large" /> : <PhotoCamera color="action" fontSize="large"/>} 
                                    </IconButton>                        
                                </label>  
                                <label className={classes.hover}  onClick={()=>handleDeleteDay(index)} name={index} >
                                    <IconButton color="primary"   aria-label="upload picture" component="span">
                                            {index > 0 ? <HighlightOffIcon  color="action" fontSize="large" />  : ""} 
                                    </IconButton> 
                                </label>
                            </Grid>
                        </Grid> 
                    ))}
                    <Grid item container justify="flex-end" alignItems="center" md={11} xs={12}> 
                        <Grid className={classes.addBytton} item container  justify="flex-end" alignItems="center" xs={12} >
                            <Typography variant="subtitle1" gutterBottom>
                                Add day 
                            </Typography>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleAddDay}>
                                <AddCircleIcon fontSize="large" />
                            </IconButton>   
                        </Grid>                                            
                    </Grid> 
                    <Box  border={1} borderColor="text.primary" {...borderProps} /> 
                </Grid>
                <Grid item container  justify="flex-end" alignItems="center"  xs={11}>                                       
                    <input accept="image/*" className={classes.input} id={`icon-button-fil`} type="file" multiple name="yatchPhoto" onChange={handleAddImage}/>
                    <Typography variant="subtitle1" gutterBottom>
                        {yatchPhoto[0] === null ? "Add yatch photo" : "Change yatch photo"} 
                    </Typography>
                    <label htmlFor={`icon-button-fil`}>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            {yatchPhoto[0] === null ? <PhotoCamera color="error" fontSize="large" /> : <PhotoCamera color="action" fontSize="large"/>} 
                        </IconButton>                        
                    </label>                          
                </Grid>  
                {message && message !== null ?  <Alert severity={message}>Trip saved successfully</Alert> : ""}                
                <Grid container alignItems="center" justify="center" item xs={10} spacing={3}>
                    <Grid item container justify="center" alignItems="center" xs={6} >
                        <Button type="submit" disabled={!validation} fullWidth={true} onClick={handleOnSave} variant="contained" color="secondary">
                            Save trip
                        </Button>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" xs={6} onClick={handleCancel}>
                        <Button  fullWidth={true} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </Grid> 
                </Grid> 
            </Grid>
            {progress>0 && progress<100 ? <BorderLinearProgress variant="determinate" value={progress} /> :""}
        </div>
  );
}

const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(AddTripTemplate);