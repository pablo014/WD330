api = "RGAPI-182c61ff-d523-4499-8eea-7549d6ad4902"

window.addEventListener('load', function() {
    const url = "na1.api.riotgames.com";
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": api
        }
    }
    )
})
.then(resp => resp.json())
.then(function(data){
    console.log(data);

    // let output = "";
    // output += '<div> ${} </div>'
}
)