var Ships;
var SelectedTile;
var ShipDetail;
var PageIndex;


function load(){ //This gets called 1 time - when the page is first loaded. It is invoked by the "onload" event on the <body>
    ShipDetail = document.getElementById('shipDetail');
    PageIndex = 1;
    update();    
}

function update(){
    dataService.getCollection("starships", PageIndex).then(function(data){    
        Ships = data;
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
    if (PageIndex * 10 >= Ships.count){
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
    else if (PageIndex * 10 >= Ships.count){
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
    for (var i = 1; ((i-1) * 10) < Ships.count; i++){
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

    var gridBody = document.getElementById('shipsGrid');
    while (gridBody.firstChild) { gridBody.removeChild(gridBody.firstChild); }
    if (Ships.results){
        for (var i = 0; i < Ships.results.length; i++){
            ship = Ships.results[i];
            var shipTile = document.createElement("div");
            shipTile.shipId = i;
            shipTile.className = "shipTile";
            shipTile.innerText = ship.name;
            shipTile.addEventListener("click", function(){
                if (SelectedTile) { SelectedTile.className = "shipTile"; }
                this.className += " selected";
                SelectedTile = this;
                selectship(this.shipId);
            });
            gridBody.appendChild(shipTile);
        }
    }
}

function selectship(id){
    shipDetail.innerText = Ships.results[id].name;
}