import { Summoner } from "./summoner.js";

let api = "RGAPI-defef8b1-768e-4e79-9efa-e89ced0056a9";
let users = [];
window.addEventListener('load', function() {
    getUsers();
})

document.getElementById('add').addEventListener('click', addUsers);

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

/*
This Function is used to grab a single summoner information using the api call. In order to keep the data
we store the summoner data in local storage
*/
function getSingleSummoner(name) {
    let newSummoner;
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    
    fetch(url)
    .then(response => response.json())
    .then(summonerInfo => {
        //console.log(summonerInfo)
        newSummoner = new Summoner(summonerInfo['id'], summonerInfo['name']);
        localStorage.setItem('userInfo', JSON.stringify(newSummoner))
    })
}

/*
This function will allow users to add summoners on their team and it is activated by placing the name of
a summoner onto the textbox this will grab usere info store it into local storage and store into an array
of summoners
*/
function addUsers() {
    // let name = document.getElementById("name").value;
    // const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    // getSingleSummoner(name)

    // setTimeout(function() {
    //     users.push(newSummoner)
    // }, 2000)
    // let newSummoner = new Summoner(info.id, info.name)
    let newSummoner;
    let name = document.getElementById('name').value
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + api;
    
    fetch(url)
    .then(response => response.json())
    .then(summonerInfo => {
        //console.log(summonerInfo)
        newSummoner = new Summoner(summonerInfo.id, summonerInfo.name);
        localStorage.setItem('userInfo', JSON.stringify(newSummoner))
        users.push[newSummoner]
    })
}

function getUsers() {
    if(users = localStorage.getItem("users")) {
        document.getElementById("users").innerHTML = users[0].name
    }
    else {
        document.getElementById("users").innerHTML = "You currently have no players on your team"
    }
}
