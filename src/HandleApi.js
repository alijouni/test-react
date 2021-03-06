import {useEffect} from 'react';
import Clarifai from 'clarifai';

const HandleApi = ({ base64Data})=> {
    
    
        useEffect(() => {
        
            const app = new Clarifai.App({
                apiKey: '3b491503921247e8b965300f384d2118',
            });
            
            app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', base64Data)
                .then(result => {
                    console.log(result.outputs[0].data);
                })
                .catch(error => console.log('error', error));
        
        
        
        }, [base64Data]);
    

    return(true)
    


       
    
}

export default HandleApi