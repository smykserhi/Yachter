import React from 'react'; 
import { withAuthorization } from '../Session';
import Cards from "../Cards"
 
const HomePage = () => (
  <h1>Home page</h1>
  //<Cards/>
);
 //coment
const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(HomePage);