// import axios from 'axios';
import React,{Component} from 'react'; 
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//     apiKey: '3b491503921247e8b965300f384d2118',
// });


class App extends Component { 

    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      base64Data:""
    }; 

    encodeImageFileAsURL=() => {
      if (this.state.selectedFile) {
        
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var srcData = fileLoadedEvent.target.result; // <--- data: base64
          this.setState({base64Data:srcData});
        }.bind(this)
        fileReader.readAsDataURL(this.state.selectedFile);
      }
    }
  
    handleApiCall = () => {
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
      
        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Key 3b491503921247e8b965300f384d2118'
          },
          body: raw
        };
        if(this.state.base64Data){
        fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/45fb9a671625463fa646c3523a3087d5/outputs", requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
  .catch(error => console.log('error', error));
        }
    }
     
    // On file select (from the pop up) 
    onFileChange = event => { 
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
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
                <input type="file" onChange={this.onFileChange} /> 
                {/* <button onClick={this.onFileUpload}> 
                  Upload! 
                </button>  */}
            </div> 
            {this.encodeImageFileAsURL()}
            {this.handleApiCall()}
          {this.fileData()} 
        </div> 
      ); 
    } 
  } 
  
  export default App; 