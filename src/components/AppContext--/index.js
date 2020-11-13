import React, {Component} from 'react';


 
const AppContext = React.createContext(null);

export class AppProvider extends Component  {
    
    state = {
        message: false
    }
    setMessage = (val)=>{
        console.log("Autirization", val)        
        this.setState({message : val   })
    }
    render(){
        console.log("appdata", this.state.autorised)
        return(
            <AppContext.Provider value = {{
                data:{
                    autorised : this.state.autorised
                },
                actions:{
                    setAutorised : this.setAutorised
                }
            }}>
                {this.props.children} {/*This alows all childrens get acceses  */}
            </AppContext.Provider>
        )
    }
} 
export const AppConsumer = AppContext.Consumer
//export default withFirebase(AppProvider)

