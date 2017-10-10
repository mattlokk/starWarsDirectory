window.dataService = window.dataService || { };
var RootUrl = 'https://swapi.co/api';

dataService.getCollection = function(endpoint, page){
    var url = RootUrl + '/' + endpoint + '/?page=' + page;
    //this "fetch" command is a very new addition to modern browsers. Not yet supported in IE/Edge
    //the traditional way of making AJAX calls required a lot more lines of code
    return fetch(url, { method: 'GET' }).then(function (response) {
        return response.json();
    }).then(function (body) {
        return body;
    });
};

dataService.getSingle = function(endpoint, id){
    var url = RootUrl + '/' + endpoint + '/' + id;
    return fetch(url, { method: 'GET' }).then(function (response) {
        return response.json();
    }).then(function (body) {
        return body;
    });
};
