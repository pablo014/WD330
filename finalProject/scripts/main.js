import { Summoner } from "./summoner.js";
let api = "RGAPI-842298e3-51df-49b7-819f-6e6cf18e0579";
let users = [];
window.addEventListener('load', function() {
    getUsers();
})
document.getElementById('add').addEventListener('click', addUsers);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function addUsers() {
    let name = document.getElementById("name").value;
    let newSummoner;
    let response = "this didnt work"
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if(this.readyState == 4 && this.status == 200) {
    //         response = JSON.parse(this.responseText)
    //         newSummoner = new Summoner(response.id, response.name)
    //         //alert (newSummoner.name)
    //         //sleep(3000)
    //         //users.push(newSummoner)
    //         // localStorage.setItem('users', users)
    //     }
    // }
    // xhttp.open("GET", url, true)
    // xhttp.onload = function() {
    //     // response = JSON.parse(this.responseText)
    //     // newSummoner = new Summoner(response.id, response.name)
    //     alert (newSummoner.name)
    //     users.push(newSummoner)
    // }
    // xhttp.send()
    fetch(url)
    .then(response => response.json())
    .then(summonerInfo => {
        console.log(summonerInfo)
        newSummoner = new Summoner(summonerInfo['id'], summonerInfo['name']);
        // users.push[newSummoner]
        //localStorage.setItem('users', newSummoner)
    })
    .then(
        console.log(newSummoner)
    )
}

function getUsers() {
    if(users = localStorage.getItem("users")) {
        document.getElementById("users").innerHTML = users[0].name
    }
    else {
        document.getElementById("users").innerHTML = "You currently have no players on your team"
    }
}

// function getSummonerInfo(summoner) {
//     let newSummoner;
//     const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summoner +"?api_key=" + api;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             let response = JSON.parse(this.responseText)
//             console.log(response.id)
//             newSummoner = new Summoner(response.id, response.name)
//             return newSummoner;
//         }
//     }
//     xhttp.open("GET", url, true);
//     xhttp.send()
// }