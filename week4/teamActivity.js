let isPlayer1 = true;
let counter = 0;
let player1 = [];
let player2 =[];

function win() {
    
}

function click() {
    //alert(this.id);
    
    if (isPlayer1)
    {
        document.getElementById(this.id).innerHTML = "O";
        isPlayer1 = false;
        player1.push(this.id);
    }
    else
    {
        document.getElementById(this.id).innerHTML = "X";
        isPlayer1 = true;
        player2.push(this.id);
    }
    counter++;
    win();
}

function reset() {
    for (let i = 0; i < 9; i++)
    {
        document.getElementsByClassName("cell")[i].innerHTML = "";
    }
    
    isPlayer1 = true;
}