// import axios from 'axios';
import React, { Component } from 'react';
import HandleApi from './HandleApi';
import EncodeImage from './EncodeImage';


class App extends Component {
 
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      base64Data: null,
  };

  encodeImageAsUrl = (data) => {
    this.setState({ selectedFile: null, base64Data: data });
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
        
        </div>
        <EncodeImage
          selectedFile={this.state.selectedFile}
          base64Data={this.state.base64Data}
          encodeImageAsUrl={this.encodeImageAsUrl}>
        </EncodeImage>
        {this.state.base64Data !== null ?
          < HandleApi
            base64Data={this.state.base64Data}
            selectedFile={this.state.selectedFile}
          ></HandleApi>
          :<div></div>
    }
        </div> 
      ); 
    } 
  } 
  
  export default App; 