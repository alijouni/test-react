// import axios from 'axios';
import React, { Component } from 'react';
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//     apiKey: '3b491503921247e8b965300f384d2118',
// });

const initialState = {
  selectedFile: null,
  base64Data:""
}
class App extends Component {
 
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      base64Data:""
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

    console.log(this.state.base64Data);
  }

  
    handleApiCall = () => {
      const raw = {
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
      };
      
      console.log(this.state.base64Data);
        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': '3b491503921247e8b965300f384d2118'
          },
          body: raw
        };
        if(this.state.base64Data){
        fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
  .then(response => response.text())
          .then(result => {
            console.log(JSON.parse(result, null, 2).outputs[0].data);
            this.state = initialState;
          })
            .catch(error => console.log('error', error));
        }
    }
     
    // On file select (from the pop up) 
  onFileChange = event => {
      // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
    //  this.encodeImageFileAsURL();
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      // axios.post("api/uploadfile", formData); 
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>Test: {this.state.selectedFile.webkitRelativePath}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
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
                <input type="file" onChange={this.onFileChange ,this.encodeImageFileAsURL} /> 
                {/* <button onClick={this.onFileUpload}> 
                  Upload! 
                </button>  */}
          </div>
        </div> 
      ); 
    } 
  } 
  
  export default App; 