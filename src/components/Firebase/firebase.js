
// import app from 'firebase/app'
import "firebase/storage"
var app = require('firebase');
// import 'firebase/auth';
// import  'firebase/database'


const adminId="nVgraEnsTITif4XOTBQxwO9aeRX2"

  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };
class Firebase {
    constructor() {
      app.initializeApp(config);   
      this.auth = app.auth();
      this.db = app.database();
      this.storage = app.storage()
    }
   
    // *** Auth API ***
    //create new user
    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
   //sing In
    doSignInWithEmailAndPassword = (email, password) =>this.auth.signInWithEmailAndPassword(email, password);   
      
   //sing out
    doSignOut = () => {      
      this.auth.signOut();
      //console.log("singOut succses") 
     }
   //reset password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   //update password
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
      //* ------------Storage API------------**/
    //accses to storage roor  
    storage = () =>this.storage

    //**--------------Users API------------- */
    //get user data by id
    user = uid => this.db.ref(`users/${uid}`);
    //get all userd data
    users = () => this.db.ref('users');
    //newCard should be Object
    addReuest = (uid, newRequest) =>{ 
      const res =  this.db.ref(`users/${uid}/requests`).push(newRequest , function(error) {
        if (error) {
              console.log("New request create error")
        } else {
        console.log(" New request saved successfully!")        
        }}).key
        return res
    }
    //newCard should be Object
    saveReuest = (uid, newRequest) =>{ 
        this.db.ref(`users/${uid}/myRequests`).push(newRequest , function(error) {
        if (error) {          
          console.log("New myRequests create error")          
        } else {
          console.log(" New myRequests saved successfully!")             
        }})
        
    }
    //newCard should be Object
    saveToAdmin = ( newRequest) =>{ 
      const res = this.db.ref(`users/${adminId}/usersRequests`).push(newRequest , function(error) {
        if (error) {
              console.log("New usersRequests create error")
        } else {
        console.log(" New usersRequests saved successfully!")        
        }}).key
        return res
    }
    updateUserData = (user, data) =>{ 
      this.db.ref(`users/${user}/`).update(data , function(error) {
        if (error) {
              console.log("Data updated error")
        } else {
        console.log(" Data updated saved successfully!")        
        }})
    }
    


    //*----------Cards API------------- */
    //get all cards
    cards = () => this.db.ref('cards');
    //get card by id
    card = cardId => this.db.ref(`cards/${cardId}`);
    //add to cards storage
    addCard = (newCard) =>{ //newCard should be Object
      const res = this.db.ref('cards').push(newCard , function(error) {
        if (error) {
              console.log("New card create error")
        } else {
        console.log(" New card saved successfully!")        
        }}).key
        return res
    }
    //add to captain who post trip
    addCardToUser =(uid, newCard)=>{
      this.db.ref(`users/${uid}/myCards`).push(newCard , function(error) {
        if (error) {
              console.log("New myCard create error")
        } else {
        console.log(" New card myCard successfully!")        
        }})
    }
    //update card data
    updateCardData = (card, data) =>{ 
      this.db.ref(`cards/${card}/`).update(data , function(error) {
        if (error) {
              console.log("Card data updated error")
        } else {
          console.log(" Card data updated saved successfully!")        
        }})
    }
    updateCard=(cardId, userId, userCardId, data)=>{
      let response 
      this.db.ref(`cards/${cardId}/`).update(data , function(error) {
        if (error) {
              console.log("Card data updated error")
              response="error"
        } else {
          console.log(" Card data updated saved successfully!") 
          response="success"
        }})
      this.db.ref(`users/${userId}/myCards/${userCardId}`).update(data , function(error) {
          if (error) {
                console.log("Card data updated error")
                response="error"
          } else {
            console.log(" Card data updated saved successfully!")   
            response="success"     
          }})
          return response
   }
    deleteCardData = (userId,  userCardId, cardId,) =>{ 
      //update user card
      this.db.ref(`users/${userId}/myCards/${userCardId}`).remove( function(error) {
        if (error) {
              console.log("User card Delete error")
        } else {
        console.log(" user card Delete successfully!")        
        }})
      //update caprain request
      this.db.ref(`cards/${cardId}/`).remove( function(error) {
        if (error) {
            console.log("Data  card Delete error")
        } else {
          console.log(" Data  card Delete successfully!")        
        }})   

    }
    addMessageToUser = (userId, message)=>{
      this.db.ref(`users/${userId}/messages`).push(message , function(error) {
        if (error) {
              console.log("New message create error")
        } else {
        console.log(" New message successfully!")        
        }})

    }

    //---------Requests --------------
    //update request data
    updateRequestData = (userId, userRequestId, captainId, capRequestId, adminReqId, data) =>{ 
      //update user card
      this.db.ref(`users/${userId}/myRequests/${userRequestId}`).update(data , function(error) {
        if (error) {
              console.log("Data user card updated error")
        } else {
        console.log(" Data updated user card saved successfully!")        
        }})
      //update caprain request
      this.db.ref(`users/${captainId}/requests/${capRequestId}`).update(data , function(error) {
        if (error) {
            console.log("Data captain card updated error")
        } else {
          console.log(" Data captain card update saved successfully!")        
        }})
      //update admin card
      this.db.ref(`users/${adminId}/usersRequests/${adminReqId}`).update(data , function(error) {
        if (error) {
          console.log("Data admin card updated error")
        } else {
          console.log(" Data admin card update saved successfully!")        
        }})

    }
    deleteMessageFromUser=(userId, messageId)=>{
      this.db.ref(`users/${userId}/messages/${messageId}`).remove( function(error) {
        if (error) {
              console.log("Mesasge Delete error")
        } else {
        console.log("Message Delete successfully!")        
        }})
    }
    deleteRequestData = (userId, userRequestId, captainId, capRequestId, adminReqId) =>{ 
      //update user card
      this.db.ref(`users/${userId}/myRequests/${userRequestId}`).remove( function(error) {
        if (error) {
              console.log("Data user card Delete error")
        } else {
        console.log(" Data  user card Delete successfully!")        
        }})
      //update caprain request
      this.db.ref(`users/${captainId}/requests/${capRequestId}`).remove( function(error) {
        if (error) {
            console.log("Data captain card Delete error")
        } else {
          console.log(" Data captain card Delete successfully!")        
        }})
      //update admin card
      this.db.ref(`users/${adminId}/usersRequests/${adminReqId}`).remove(function(error) {
        if (error) {
          console.log("Data admin card Delete error")
        } else {
          console.log(" Data admin card Delete successfully!")        
        }})

    }



    
  }
   
  
  export default Firebase;