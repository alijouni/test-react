// import axios from 'axios';
import React, { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '3b491503921247e8b965300f384d2118',
});

class App extends Component {
 
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      base64Data: null
  };

  // shouldComponentUpdate(nextProps,nextState) {
  //   // Rendering the component only if 
  //   // passed props value is changed
  
  //   if (nextState.selectedFile !== this.state.selectedFile) {
  //     return true;
  //   } else {
  //       return false;
  //   }
  // }

  encodeImageFileAsURL = () => {

    console.log('Attempt')
    
    function getBase64(file, onLoadCallback) {
      return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function() { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
  }
  if(this.state.selectedFile){
      console.log(this.state.selectedFile)
      var promise = getBase64(this.state.selectedFile);
      promise.then(data=>data.replace(/^data:image\/[a-z]+;base64,/, ""))
      .then(result=>{
        this.setState({selectedFile:null,base64Data:result});
      console.log("SET STATE");
      console.log(this.state.base64Data);
      if(this.state.selectedFile){
      app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.base64Data)
      .then(result => {
        console.log(result.outputs[0].data);
      })
        .catch(error => console.log('error', error));
    }   
      }
      )
    }
    
  

     
    }
     
    // On file select (from the pop up) 
  onFileChange = event => {
      // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
    }; 
     

    render() { 
      return ( 
        <div> 
            <h1> 
              GeeksforGeeks 
            </h1> 
            <h3> 
              File Upload using React! 
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                {/* <button onClick={this.onFileUpload}> 
                  Upload! 
                </button>  */}
          </div>
          {this.encodeImageFileAsURL()}
        </div> 
      ); 
    } 
  } 
  
  export default App; 