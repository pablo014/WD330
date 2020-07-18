import { Summoner } from "./summoner.js";

let api = "RGAPI-5d699c14-3b1e-4c58-ba92-bbdc322e28b6";


window.addEventListener('load', function() {
    let users = JSON.parse(localStorage.getItem('team'))
    updateUsers(users)
    displayUsers(users);
})

document.getElementById('add').addEventListener('click', addUsers);



/*
This Function is used to grab a single summoner information using the api call. In order to keep the data
we store the summoner data in local storage
*/
function getSingleSummoner(name) {
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    const rankUrl = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
    const matchUrl = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/"
    
    fetch(url)
    .then(response => response.json())
    .then(summonerInfo => {
        fetch(rankUrl + summonerInfo.id + "?api_key=" + api)
        .then(response => response.json())
        .then(rankInfo => {
            if (rankInfo.length == 0){
                let template = new Summoner(summonerInfo.id, summonerInfo.accountId, summonerInfo.name, 'NA', 0, 0)
                localStorage.userInfo = JSON.stringify(template)
            }
            else if (rankInfo.length == 1) {
                if(rankInfo[0].queueType == 'RANKED_SOLO_5x5') {
                    let template = new Summoner(summonerInfo.id, summonerInfo.accountId, summonerInfo.name, 'NA', 0, 0, rankInfo[0].tier, rankInfo[0].wins, rankInfo[0].losses)
                    localStorage.userInfo = JSON.stringify(template)
                }
                else {
                    let template = new Summoner(summonerInfo.id, summonerInfo.accountId, summonerInfo.name, rankInfo[0].tier, rankInfo[0].wins, rankInfo[0].losses)
                    localStorage.userInfo = JSON.stringify(template)
                }
            }
            else {
                let template = new Summoner(summonerInfo.id, summonerInfo.accountId, summonerInfo.name, rankInfo[0].tier, rankInfo[0].wins, rankInfo[0].losses, rankInfo[1].tier, rankInfo[1].wins, rankInfo[1].losses)
                localStorage.userInfo = JSON.stringify(template)
            }
            
            // fetch(matchUrl + summonerInfo.accountId + "?endIndex=20&beginIndex=0&api_key=" + api)
            // .then(response => response.json)
            // .then(matchInfo => {
            //     console.log(JSON.stringify(matchInfo))
            //     let template = new Summoner(summonerInfo.accountId, summonerInfo.name, rankInfo[0].tier, matchInfo)
            //     localStorage.userInfo = JSON.stringify(template)
            // })
        }
        )
    })
}

/*
This function will allow users to add summoners on their team and it is activated by placing the name of
a summoner onto the textbox this will grab usere info store it into local storage and store into an array
of summoners
*/
function addUsers() {

    let newSummoner = new Summoner("", "")
    //search for a single summoner
    let name = document.getElementById('name').value
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    
    getSingleSummoner(name)

    //get the old information
    let newUsers = getUsers()
       

    setTimeout(function() {
    //grab the new information
    newSummoner = localStorage.userInfo
    console.log(newSummoner)
    

    //push new information into the newUsers array
    newUsers.push(newSummoner)
    
    
    //overwrite team
    localStorage.setItem('team', JSON.stringify(newUsers))

    //reload information
    displayUsers(newUsers)

    }, 700)
}

/*
This function will be used to grab the array of users in local storage and will set the sent in array to that
*/
function getUsers() {
    let users = []
    if (localStorage.getItem('team') === null)
    {
        users = []
    }
    else {
        users = JSON.parse(localStorage.getItem('team'))
    }
    return users
}

/** This function will delete the user that was clicked */
function deleteUser() {
    //cut out the word delete from the id
    let number = this.id.slice(6)
    //grab the table from local storage
    let table = JSON.parse(localStorage.getItem('team'))
    //splice the table
    table.splice(parseInt(number), 1)
    //save table
    localStorage.setItem('team', JSON.stringify(table))
    //display table
    displayUsers(table)
}

function displayRank(rank) {
    switch(rank) {
    case 'IRON': 
        console.log('<img src=\'../img/iron.png\' class=\'rank\'>')
        return '<img src=\'../img/iron.png\' class=\'rank\'>';
        break;
    case 'BRONZE':
        return '<img src=\'../img/bronze.png\' class=\'rank\'>';
        break;
    case 'SILVER':
        return '<img src=\'../img/silver.png\' class=\'rank\'>';
        break;
    case 'GOLD':
        return '<img src=\'../img/gold.png\' class=\'rank\'>';
        break;
    case 'PLATINUM':
        return '<img src=\'../img/platinum.png\' class=\'rank\'>';
        break;
    case 'DIAMOND':
        return '<img src=\'../img/diamond.png\' class=\'rank\'>';
        break;
    case 'MASTER':
        return '<img src=\'../img/master.png\' class=\'rank\'>';
        break;
    case 'GRANDMASTER':
        return '<img src=\'../img/grandmaster.png\' class=\'rank\'>';
        break;
    case 'CHALLENGER':
        return '<img src=\'../img/challenger.png\' class=\'rank\'>';
        break;
    default:
        return '<img src=\'../img/unranked.png\' class=\'rank\'>';
        break;
    }
}

/**
 * This function will diplay the current users in the database, it will be reused quite often
 */
function displayUsers(users) {
    document.getElementById('users').innerHTML = ''
    let it = 0
    if(users != null) {
        if(users.length != 0) {
        users.forEach(element => {
            //document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name
            switch(JSON.parse(element).flexRank) {
                case 'IRON':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/iron.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>' + '<br><p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'BRONZE':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\' class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/bronze.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'SILVER':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\' class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/silver.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'GOLD':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/gold.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'PLATINUM':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/platinum.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'DIAMOND':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/diamond.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'MASTER':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/master.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'GRANDMASTER':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/grandmaster.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                case 'CHALLENGER':
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/challenger.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
                    break;
                default:
                    document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button class=\'details\' id=\'show'+ it +'\'>Show Details</button>' + '<div id=\'info'+ it + '\'  class=\'hidden\'><p>Solo/Duo Stats</p><img src=\'../img/unranked.png\' class=\'rank\'><br><p>Wins: ' + JSON.parse(element).soloWins + '</p><p>Losses: ' + JSON.parse(element).soloLosses + '</p>'  + '<p>Flex Stats</p>' + displayRank(JSON.parse(element).soloRank) + '<br><p>Wins: ' + JSON.parse(element).flexWins + '</p><p>Losses: ' + JSON.parse(element).flexLosses + '</p>' + '</div></div>'
            }
            document.getElementById('users').innerHTML += '<br>'
            //document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>'  + '<button id=\'' + 'delete' + it + '\'><img src=\'../img/delete.png\' class=\'thumbnail\'></button>' + JSON.parse(element).name + '<button id=\'show'+ it +'\'>Show Details</button>' + '<div class=\'hidden\'>' + displayRank(JSON.parse(element).flexRank) + '</div></div>'
            it++
        });
        for (let i = 0; i < users.length; i++) {
            document.getElementById('delete'+i).addEventListener('click', deleteUser)
            document.getElementById('show' + i).addEventListener('click', toggleInfo)
        }
        }
        else {
            document.getElementById("users").innerHTML = "You currently have no players on your team"
        }
    }
    else {
        document.getElementById("users").innerHTML = "You currently have no players on your team"
    }
}

function toggleInfo() {
    //cut out the word show from the id
    let number = this.id.slice(4)
    console.log(number)
    document.getElementById('info'+number).classList.toggle('show')
}

function updateUsers(users) {
    if (users != null) {
        if(users.length != 0){
            users.forEach(element => {
                console.log(JSON.parse(element).name)
                getSingleSummoner(JSON.parse(element).name)
            })
        }
    }
}