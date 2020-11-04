import * as React from "react"
import { AppBar, Toolbar } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import {Box} from "@material-ui/core"

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
    
    const classes = useStyles();
    return (
      <AppBar position="static" color="secondary">
        <Toolbar >
            <IconButton href="/" edge="start" color="inherit" aria-label="home">
                <Home fontSize="large" />
            </IconButton>
            {/* Add code */}
            <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex} // this
                >
               
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
export default NavAutorised
//coment