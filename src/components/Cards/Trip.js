import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsBoatRoundedIcon from '@material-ui/icons/DirectionsBoatRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 245,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Trip(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
const { userId, uid, title, startDate, daysAmount, imgUrl, disShort,disLong} = props.card
//console.log(props.card)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //return userId and cardId
 const handleEdit=()=>{   
   //console.log("Card",props.card.cardPostId)
    const response = {userId: userId, cardId : props.cardId, cardPostId: props.card.cardPostId }
    props.handleEdit(response)
 }
 const handleDelete=()=>{   
  const response = {userId: userId, cardId : props.cardId, cardPostId: props.card.cardPostId }
  props.handleDelete(response)
}
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={            
          <Avatar aria-label="recipe" className={classes.avatar}>
          {< DirectionsBoatRoundedIcon/>}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title= {title}
        subheader= {startDate}
      />
      <CardMedia
        className={classes.media}
        image={imgUrl}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {disShort}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.editMode 
          ? 
          <Grid container   direction="row"  justify="space-around">
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<EditIcon />}
                //href={`/trip-info/${uid}`}
                onClick={handleEdit}
              >
                  Edit
            </Button>   
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                //href={`/trip-info/${uid}`}
                onClick={handleDelete}
              >
                  Delete
            </Button> 
          </Grid> 
          : 
          <Grid container   direction="row"  justify="space-between">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<SendRoundedIcon />}
              href={`/trip-info/${uid}`}
            >
                Send request
            </Button>        
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>}
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {disShort}
          </Typography>
          <Typography paragraph>
            {disLong}
          </Typography>
          
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
