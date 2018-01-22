// Sample nodejs code for videos.getRating

function videosGetRating(auth, requestData) {
  var service = google.youtube('v3');
  var parameters = removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  service.videos.getRating(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}

//See full code sample for authorize() function code.
authorize(JSON.parse(content), {'params': {'id': 'Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI',
                 'onBehalfOfContentOwner': ''}}, videosGetRating);