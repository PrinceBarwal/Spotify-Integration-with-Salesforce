public  class SpotifyIntegration {
    @AuraEnabled
    public static void searchWithSpotify(String trackName){
        Http http = new Http();

        HttpRequest request = new HttpRequest();

        request.setMethod('GET');
        String encodedURL = EncodingUtil.urlEncode(trackName, 'UTF-8');
        // https://api.spotify.com/v1/search?q=daspercito&type=track&limit=1&offset=1
        request.setEndpoint('callout:Spotify/v1/search?q='+encodedURL+'&type=track&limit=1&offset=1');

        try{
            HttpResponse response = http.send(request);
            System.debug(response.getStatus());
            System.debug(response.getBody());
            System.debug(response.getStatusCode());
        }catch(Exception ex){
            System.debug(ex.getMessage());
        }

    }
}