import React, { useState, useEffect } from "react"
import { AppBar, Toolbar } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {withFirebase} from "../Firebase"
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
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
    const navLinks = props.links 
    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)  
    const classes = useStyles();
    const [mails, setMails]= useState(props.mails)

    useEffect(() => {
      //console.log("Props", props.firebase.auth.W && props.firebase.user(props.firebase.auth.W))
      if(loading){
        props.firebase.auth.W && props.firebase.user(props.firebase.auth.W).on('value', snapshot => {
          const userObject = snapshot.val();      
          setUser(userObject)
          //console.log(userObject.messages)
          setLoading(false)          
        });
        return ()=>{
          props.firebase.user().off()
        }
      }
      //console.log(user&& user.messages)
      
    });
    return (
      <AppBar position="static" color="secondary">
        <Toolbar >
            <IconButton href="/" edge="start" color="inherit" aria-label="home">
                <Home fontSize="large" />
            </IconButton>
            {props.mails? <p>test</p>:""}
            <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex} // this
                >
                { user&& user.messages ?
                <ListItem>
                {props.mails? <p>test</p>:""}
                  <Badge badgeContent={Object.keys(user.messages).length} color="error">
                    <MailIcon />
                  </Badge>
                </ListItem>
                 
                 :""}
               
                {navLinks.map(({ title, path }) => (
                    <a href={path} key={title} className={classes.linkText}  >
                    <ListItem button>
                      
                        {props.logInIcon ?<Box mx={2}> {props.logInIcon}</Box>  : ""}
                                       
                      <ListItemText primary={title} />
                    </ListItem>
                    </a>
                ))}
                </List>
            {/* Add code end */}
            <div  className={classes.button}>
                
                {props.button ? props.button : ""}
            </div>
            
            </Toolbar>
      </AppBar>
    )
  }
export default withFirebase(NavAutorised)
//coment