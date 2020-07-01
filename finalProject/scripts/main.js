import { Summoner } from "./summoner.js";

let api = "RGAPI-04639b47-7fea-4e37-9560-cf85e979a092";


window.addEventListener('load', function() {
    let users = JSON.parse(localStorage.getItem('team'))
    displayUsers(users);
})

document.getElementById('add').addEventListener('click', addUsers);



/*
This Function is used to grab a single summoner information using the api call. In order to keep the data
we store the summoner data in local storage
*/
function getSingleSummoner(name) {
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ name +"?api_key=" + api;
    
    fetch(url)
    .then(response => response.json())
    .then(summonerInfo => {
        let template = new Summoner(summonerInfo.id, summonerInfo.name)
        localStorage.userInfo = JSON.stringify(template)
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

    }, 600)
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

/**
 * This function will diplay the current users in the database, it will be reused quite often
 */
function displayUsers(users) {
    let it = 0
    if(users != null) {
        users.forEach(element => {
            document.getElementById('users').innerHTML += '<div class=\'summoner\' id=\'' + it + '\'>' + JSON.parse(element).name + '<button id=\'' + 'delete' + it + '\'>X</div>' + '<br>'
        });
        
    }
    else {
        document.getElementById("users").innerHTML = "You currently have no players on your team"
    }
}