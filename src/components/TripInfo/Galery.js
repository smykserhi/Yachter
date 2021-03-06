import React,{ useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
    justifyContent: "flex-start",
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        alignItems: "center"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: "row",
    },    
    width: "100%",
    padding: "1vh 0"
  },  
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: "4",
    justifyContent: "space-around", 
  },
  content: {
    flexGrow: "4",
  },
  cover: {    
    [theme.breakpoints.down('sm')]: {
      height: "40vw",
      width: "60vw",
    },
    [theme.breakpoints.up('md')]: {
      height: "20vw",
      width: "30vw",
    },
  },
  image: {
    width: "100%",
    height: "100%"

  },
  //Galery classes
  galeryRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },  
}));

export default function Galery({card}) {
    const classes = useStyles();    
    const [url, setUtl] = useState(null);  
    const [dis, setDis] = useState(null);  
    let tileData = [ ];   
    //change image main image in galerry
    const handleOnClick=(e)=>{        
        setUtl(e.target.src)       
     }
    // show all images in gallery
    card.yatchPhoto && card.yatchPhoto.map((el, index)=>{                   
      tileData.push({
        img: el,
        title: `Photo ${index+1}`,
        author: `Photo ${index+1}`
      })        
     })     
     useEffect(() => {  
       //track main photo       
        if(url === null && card.yatchPhoto ){
            setUtl(card.yatchPhoto[0])
            setDis(card.shipName)           
        }        
      });
  return (
     <Box>
        <Paper  className={classes.root}>            
          <Box className={classes.details}>                    
            <Typography className={classes.component} component="h6" variant="h5">
                        {dis}
            </Typography>
          </Box> 
          <Box  className={classes.cover}>
            <img className={classes.image} src={url} title="Day foto" />
          </Box>                      
        </Paper>
         <div className={classes.galeryRoot}>
            <GridList className={classes.gridList} cols={2.5}>
                {tileData.map((tile, index) => (
                  <GridListTile onClick={handleOnClick}  key={index}>
                      <img src={tile.img} alt={tile.title} />                   
                  </GridListTile>
                ))}
            </GridList>
        </div>
     </Box>
  );
}
