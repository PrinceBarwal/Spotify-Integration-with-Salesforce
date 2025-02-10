import { LightningElement } from 'lwc';
import searchWithSpotify from '@salesforce/apex/SpotifyIntegration.searchWithSpotify';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class SpotifyIntegratinWithSalesforce extends LightningElement {
    searchTracker;
    displayResult = false;
    trackData = '';
    trackURL = '';  

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
                let response = JSON.parse(responseString);
                let parsedResponse = structuredClone(response);
                this.displayResult = true;
                this.trackData = parsedResponse.tracks.items[0];
                this.trackURL = this.trackData.album.images[0].url;
                console.log('Parsed Response:', parsedResponse);
            } catch (exception) {
                this.showToast('Error', 'Something went Wrong', 'error');
            }
                 
        // }

    }

    // validInput() {
    //     let isValid = true;
    //     let element = this.template.querySelecter('lightning-input');
    //     if (!element.checkValidity()) {
    //         element.reportValidity();
    //         isValid = false;
    //     }
    //     return isValid;
    // }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    get artistName(){
        let artistNameArr = this.trackData.artists.map(currItem => currItem.name);
        return artistNameArr.join(', ');
    }

    
}