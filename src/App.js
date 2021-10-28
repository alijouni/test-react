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

  
  encodeImageFileAsURL = () => {

    function getBase64(file, onLoadCallback) {
      return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function() { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      });
  }
    if (this.state.selectedFile) {
      var promise = getBase64(this.state.selectedFile);
      promise.then(result=>this.setState({base64Data:result,selectedFile:null})
      );
    }
    if(this.state.base64Data){console.log(this.state.base64Data);}
  }

    handleApiCall = () => {
      if(this.state.base64Data){
      const raw = JSON.stringify({
        "user_app_id": {
          "user_id": "er1pq34lbyad",
          "app_id": "test-react"
      },
        "inputs": [
          {
            "data": {
              "image": {
                "base64": this.state.base64Data
              }
            }
          }
        ]
      });
      
      //if(this.state.base64Data){console.log(this.state.base64Data);}
        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': '3b491503921247e8b965300f384d2118'
          },
          body: raw
        };
        
          app.models.predict('aaa03c23b3724a16a56b629203edc62c', requestOptions)
  .then(response => response.text())
          .then(result => {
            console.log(JSON.parse(result, null, 2).outputs[0].data);
            //this.setState({base64Data:null})
          })
            .catch(error => console.log('error', error));
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
          {/* {this.handleApiCall()} */}
        </div> 
      ); 
    } 
  } 
  
  export default App; 