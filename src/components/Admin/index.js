import React, { Component } from 'react'; 

import { withAuthorization } from '../Session';
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
      userData: {}
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
    //console.log(this.props.firebase.user(this.props.id))
    // this.props.firebase.logintest().on('value', snapshot => {
    //  console.log("snapshot.val();" , snapshot.val())
    // })
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      //console.log("users Object",usersObject)
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
      //sconsole.log("user Object",usersObject)
      // const usersList = Object.keys(usersObject).map(key => ({
      //   ...usersObject[key],
      //   uid: key,
      // }));
      this.setState({
        userData: usersObject,
        
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }
 
  render() {
    
    const { users, loading } = this.state;
    console.log("userData", this.state.userData)
    return (
      <div>
        <h1>Admin {this.props.id}</h1>
        {loading && <div>Loading ...</div>} 
        <UserList users={users} />
      </div>
    );
  }
}
const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);
 
// export default withFirebase(AdminPage);
 
// const condition = authUser =>
//   authUser && !!authUser.roles[ROLES.ADMIN];
const condition = authUser => authUser != null;
export default withAuthorization(condition)(AdminPage);