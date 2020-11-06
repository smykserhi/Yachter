
import React, { useState } from 'react'; 

const UserList = ({ users, props }) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState();
    
    let urlArr = []
   const onchangeHandle = e =>{
       if(e.target.files[0]){
        setImage(e.target.files)
        //console.log(image)
       }
   }
   const handelOnLoad =()=>{
        const imgArr = [...image]
        imgArr.map((img, el)=>{    
            const upLoadTask = props.firebase.storage.ref(`images/${img.name}`).put(img)
            upLoadTask.on(
              "state_changed",
              snapshot =>{
                  let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)                  
                  setProgress(progress)
              },
              error =>{
                  console.log(error)
              },
              () =>{
               props.firebase.storage
                .ref("images")
                .child(img.name)
                .getDownloadURL()
                .then(url=>{
                    urlArr[el]=url  
                    console.log(urlArr)
                    setUrls(urlArr)                             
                })
                
           }
       )
    })
    
   }
   console.log("urls",urls)
   const handelDelete =() =>{
    const deleteTask = props.firebase.storage.ref(`images/${image.name}`)
    deleteTask.delete().then(function() {
        // File deleted successfully
        console.log("delete succses")
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log("delete error")
      });
   }
   
return(
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
          <button onClick={()=>{
              const res = props.firebase.addCard(
                {
                  userId: user.uid, 
                  title: "In The Trece Of Columbus", 
                  startDate : "1st october 2020",
                  endDate: 5,
                  imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85",
                  tripDesacription: 'Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!',
                  disLong: "Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!",
                  shipName: "Gambrinus",
                  portDeparture: "London",
                  fee: "Free",
                  portOfArival : "San Frans",
                  daysDis: [{dayHead: "day header", 
                            dayDis: "Day1 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day2 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day3 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day2 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            
                            ],
                  yatchPhoto: [{dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              ]
                })
                const addToUser = props.firebase.addCardToUser(user.uid,{
                  userId: user.uid, 
                  cardPostId: res,
                  title: "In The Trece Of Columbus", 
                  startDate : "1st october 2020",
                  endDate: 5,
                  imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85",
                  tripDesacription: 'Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!',
                  disLong: "Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!Eventually, I also got my Captain’s License and Master of Yachts 200T certification with a sailing endorsement. So this is an industry I know very well!",
                  shipName: "Gambrinus",
                  portDeparture: "London",
                  fee: "Free",
                  portOfArival : "San Frans",
                  daysDis: [{dayHead: "day header", 
                            dayDis: "Day1 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day2 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day3 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            {dayHead: "day header", 
                            dayDis: "Day2 discription", 
                            imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"},
                            
                            ],
                  yatchPhoto: [{dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              {dis: "photo discription",
                                imgUrl: "https://firebasestorage.googleapis.com/v0/b/test-7f1dd.appspot.com/o/images%2Fyacht-jobs-blog.jpg?alt=media&token=d493f346-3491-492f-9ca0-cfd4d0327b85"
                              },
                              ]
                })
              
              }}
                // props.firebase.user(user.uid).child('cards').push({ newData : "New data"} , function(error) {
                //       if (error) {
                //             console.log("error")
                //       } else {
                //       console.log(" Data saved successfully!")
                //       }})
                //} 
            >add</button>
          <button onClick={()=>
                props.firebase.user(user.uid).child('cards/-MKGF0ofRN3L7N8oIgN5').remove( function(error) {
                      if (error) {
                            console.log("error")
                      } else {
                      console.log(" Data removed successfully!")
                      }})
                } 
          >del</button>
         
        </li>
       
      ))}
      <input type="file" multiple accept="image/*" onChange={onchangeHandle} id="filehere"  ></input>
      <button onClick={handelOnLoad}>Add image  </button>
      <button onClick={handelDelete}>delete image  </button>
      
      <br/>
      <button onClick={()=>{
        console.log("urls",urls)
      }}>show urls</button>
      <progress value={progress} max="100"/>
          
    </ul>
  );
}

export default UserList