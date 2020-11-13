import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    marginTop : "auto"
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation color="secondary" value={value} onChange={handleChange} className={classes.root}>     
      <BottomNavigationAction target="_blank" href="https://www.facebook.com/" rel="noopener" label="Facebook" value="Facebook" icon={<FacebookIcon fontSize="large" />} />
      <BottomNavigationAction target="_blank" href="https://www.instagram.com/" label="Instagram" value="Instagram" icon={<InstagramIcon fontSize="large"/>} />
      <BottomNavigationAction target="_blank" href="https://twitter.com/" label="Twitter" value="Twitter" icon={<TwitterIcon fontSize="large"/>} />
    </BottomNavigation>
  );
}
