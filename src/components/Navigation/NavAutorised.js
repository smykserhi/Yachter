import React, { useState, useEffect } from "react"
import { AppBar, Toolbar } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {withFirebase} from "../Firebase"
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import DirectionsBoatRoundedIcon from '@material-ui/icons/DirectionsBoatRounded';
import * as ROUTES from '../../constants/routes';
import {useHistory } from "react-router-dom";

const useStyles = makeStyles({    
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: "center",
      marginLeft: "auto",
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    },
    button:{        
        marginRight: "2rem"        
    },
    links:{
      marginLeft: "auto",
    }
  });

  const NavAutorised = (props) => {
    const history = useHistory()
    const navLinks = props.links 
    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)  
    const classes = useStyles();

    useEffect(() => {
      if(loading){ // the same as componentDidMount
        props.firebase.auth.W && props.firebase.user(props.firebase.auth.W).on('value', snapshot => {
          const userObject = snapshot.val();      
          setUser(userObject)
          setLoading(false)          
        });
        return ()=>{ // rge same as componentWillUnmount
          props.firebase.user().off()
        }
      }      
    });
    return (
      <AppBar position="static" color="secondary">
        <Toolbar >
            <IconButton onClick={()=> history.push(ROUTES.MAIN)} edge="start" color="inherit" aria-label="home">
                <DirectionsBoatRoundedIcon fontSize="large" />
            </IconButton>            
            <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex} // this
                >
                { user&& user.messages ?
                  <ListItem>                
                    <IconButton onClick={()=> history.push(ROUTES.ACCOUNT)}  edge="start" color="inherit" aria-label="home">
                      <Badge badgeContent={Object.keys(user.messages).length} color="error">
                        <MailIcon  />
                      </Badge>
                    </IconButton>               
                  </ListItem>                 
                 :""}           {/* <a href={path} key={title} className={classes.linkText}  > */}     
                {navLinks.map(({ title, path }) => (                   
                      <ListItem className={classes.linkText} key={title} onClick={()=> history.push(path)}  button >                      
                        {props.logInIcon ?<Box mx={2}  > {props.logInIcon}</Box>  : ""}                                       
                        <ListItemText primary={title} />
                      </ListItem>                    
                ))}
            </List>           
            <div  className={classes.button}>                
                {props.button ? props.button : ""}
            </div>            
          </Toolbar>
      </AppBar>
    )
  }
export default withFirebase(NavAutorised)
