var RootUrl;
var People;
var SelectedTile;
var PersonDetail;
var PageIndex;

function load(){
    RootUrl = 'https://swapi.co/api';
    PersonDetail = document.getElementById('personDetail');
    PageIndex = 1;
    update();
}

function update(){
    getData("people").then(function(data){    
        People = data;
        bind();
    });
}

function prevPage(){
    PageIndex --;
    document.getElementById('nextPage').disabled = false;
    if (PageIndex == 1){
        document.getElementById('prevPage').disabled = true;
    }
    update();
}

function nextPage(){
    PageIndex ++;
    document.getElementById('prevPage').disabled = false;
    if (PageIndex * 10 >= People.count){
        document.getElementById('nextPage').disabled = true;
    }
    update();
}

function navToPage(){
    PageIndex = this.value;
    if (PageIndex == 1){
        document.getElementById('prevPage').disabled = true;
        document.getElementById('nextPage').disabled = false;
    }
    else if (PageIndex * 10 >= People.count){
        document.getElementById('nextPage').disabled = true;
        document.getElementById('prevPage').disabled = false;
    }
    else{
        document.getElementById('nextPage').disabled = false;
        document.getElementById('prevPage').disabled = false;
    }
    update();
}

function bind(){
    var pageLinks = document.getElementById('pageLinks');
    while (pageLinks.firstChild) { pageLinks.removeChild(pageLinks.firstChild); }
    for (var i = 1; ((i-1) * 10) < People.count; i++){
        var pageLink = document.createElement("li");
        pageLink.value = i;
        pageLink.innerText = i;
        if (i == PageIndex) {
            pageLink.className = "selected";
        }
        else{
            pageLink.addEventListener("click", navToPage);
        }
        pageLinks.appendChild(pageLink);
    }

    var gridBody = document.getElementById('personGrid');
    while (gridBody.firstChild) { gridBody.removeChild(gridBody.firstChild); }
    if (People.results){
        for (var i = 0; i < People.results.length; i++){
            person = People.results[i];
            var personTile = document.createElement("div");
            personTile.personId = i;
            personTile.className = "personTile";
            personTile.innerText = person.name;
            personTile.addEventListener("click", function(){
                if (SelectedTile) { SelectedTile.className = "personTile"; }
                this.className += " selected";
                SelectedTile = this;
                selectPerson(this.personId);
            });
            gridBody.appendChild(personTile);
        }
    }
}

function selectPerson(id){
    PersonDetail.innerText = People.results[id].name;
}

function getData(endpoint, id){
    var url = RootUrl + '/' + endpoint;
    if (id){
        url += '/' + id;
    }
    else{
        url += '/?page=' + PageIndex;
    }
    return fetch(url, { method: 'GET' }).then(function (response) {
        return response.json();
    }).then(function (body) {
        return body;
    });
}