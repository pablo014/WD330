proxyurl = "https://cors-anywhere.herokuapp.com/"
api = "RGAPI-83857343-3a08-44bf-b12e-6eb687fb3214"

window.addEventListener('load', function() {
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/N3WBKILR?api_key=" + api;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText)
            console.log(this.responseText)
            getSummonerId(response)
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send()
})

function getSummonerId(response) {
    document.querySelector("main").innerHTML = response.name;
}