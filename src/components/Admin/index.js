import React, { Component  } from 'react'; 

import { withAuthorization } from '../Session';
import UserList from "./data"

class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
      userData: {},
      logintest: {},
      image: {}
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });    
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();      
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,        
      });
    });
    this.props.firebase.user(this.props.id).on('value', snapshot => {
      const usersObject = snapshot.val();
      //console.log("user Object",usersObject)  
      this.setState({
        userData: usersObject,        
      });
    });    
  }
  
  componentWillUnmount() {
    this.props.firebase.users().off();
    this.props.firebase.user().off()
    //this.props.firebase.logintest().off()
  }
 
  render() {
    
    const { users, loading } = this.state;    
    return (
      <div>
        <h1>Admin {this.props.id}</h1>
        {loading && <div>Loading ...</div>} 
        <UserList users={users} props={this.props} />
      </div>
    );
  }
}





//        } 
// export default withFirebase(AdminPage);
 
// const condition = authUser =>
//   authUser && !!authUser.roles[ROLES.ADMIN];
const condition = authUser => authUser != null;
export default withAuthorization(condition)(AdminPage);