import { LightningElement } from 'lwc';
import searchWithSpotify from '@salesforce/apex/SpotifyIntegration.searchWithSpotify';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class SpotifyIntegratinWithSalesforce extends LightningElement {
    searchTracker;

    changeHandler(event) {
        this.searchTracker = event.target.value;
    }

    async searchtrack() {
        // let isValid = this.validInput();
        // if (isValid) {
            try {
                let responseString = await searchWithSpotify({
                    trackName: this.searchTracker
                })
                console.log('type of : ',responseString);
            } catch (exception) {
                this.showToast('Error', 'Something went Wrong', 'error');
            }
        // }

        // let responseString = await searchWithSpotify({
        //     trackName: this.searchTracker
        // })
        // console.log('type of : ',responseString);
        //let response = JSON.parse(responseString);
        // console.log('response: ', response);
        // let parsedResponse = structuredClone(response);

        // console.log('Parsed Response:', parsedResponse);
        // console.log(parsedResponse.tracks);
        // let parsedResponse = JSON.parse(JSON.stringify(response));
        // console.log(parsedResponse); 
        // let cleanResponse = cloneDeep(responseString);
        // console.log('Lodash Cleaned Response:', cleanResponse);           
    

    }

    validInput() {
        let isValid = true;
        let element = this.template.querySelecter('lightning-input');
        if (!element.checkValidity()) {
            element.reportValidity();
            isValid = false;
        }
        return isValid;
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    
}