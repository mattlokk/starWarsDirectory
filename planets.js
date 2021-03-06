var Planets;
var SelectedTile;
var planetDetail;
var PageIndex;


function load(){ //This gets called 1 time - when the page is first loaded. It is invoked by the "onload" event on the <body>
    planetDetail = document.getElementById('planetDetail');
    PageIndex = 1;
    update();    
}

function update(){
    dataService.getCollection("planets", PageIndex).then(function(data){    
        Planets = data;
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
    if (PageIndex * 10 >= Planets.count){
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
    else if (PageIndex * 10 >= Planets.count){
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
    for (var i = 1; ((i-1) * 10) < Planets.count; i++){
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

    var gridBody = document.getElementById('planetGrid');
    while (gridBody.firstChild) { gridBody.removeChild(gridBody.firstChild); }
    if (Planets.results){
        for (var i = 0; i < Planets.results.length; i++){
            planet = Planets.results[i];
            var planetTile = document.createElement("div");
            planetTile.planetId = i;
            planetTile.className = "planetTile";
            planetTile.innerText = planet.name;
            planetTile.addEventListener("click", function(){
                if (SelectedTile) { SelectedTile.className = "planetTile"; }
                this.className += " selected";
                SelectedTile = this;
                selectplanet(this.planetId);
            });
            gridBody.appendChild(planetTile);
        }
    }
}

function selectplanet(id){
    planetDetail.innerText = Planets.results[id].name;
}