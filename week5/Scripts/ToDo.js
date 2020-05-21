import {Event} from './utilities.js'


let table = [];
window.onload = loadTable();
document.getElementById('submit').addEventListener('click', add);
document.getElementById('all').addEventListener('click', filter);
document.getElementById('complete').addEventListener('click', filter);
document.getElementById('incomplete').addEventListener('click', filter);

function load(array) {
    let text = "";
    let it = 0;
    //display table
    array.forEach(
        event => {

            //append a string based on information
            text += '<tr><td>' + event.content + '</td><td>' + event.id + '</td><td id=\'' + it + '\'>'; //it is being used to track where in the array each item is to give an individual id
            if (event.completed) {
                text += 'Complete</td>';
            }
            else {
                text += 'Incomplete</td>';
            }
            text += '<td><button id=\'delete'+ it +'\'>Remove</button></td></tr>';
            //Add it onto the html
            document.querySelector('tbody').innerHTML = text;
            
            //increase iterator
            it++;
        }
    );
    //go through and add event listeners
    for (let i  = 0; i < table.length; i++) {
        document.getElementById(i).addEventListener('click', complete)
        document.getElementById('delete'+i).addEventListener('click', erase)
    }
}

function loadTable() {
    // let text = "";
    // let it = 0;
    if (localStorage.getItem('events')) {
        table = JSON.parse(localStorage.getItem('events'));
        load(table);
    }
}

function reload() {
        //change to JSON
        let string = JSON.stringify(table);
        //add to local storage
        localStorage.setItem('events', string);
        //Load the table
        if (table.length > 0) {
            loadTable();
        }
        else {
            document.getElementById('table').innerHTML = "";
        }
}


function add() {
    document.getElementById('test2').innerHTML = "In add";
    //set variables
    let id = document.getElementById('endDate').value;
    let content = document.getElementById('task').value;
    let completed = false;
    //create a new event
    let todo = new Event(id, content, completed);
    //add to array
    table.push(todo);
    //reload page
    reload();
}

function complete() {
    //Change the status to complete if already complete if not change to incomplete
    if (table[this.id].completed) {
        table[this.id].completed = false;
    }
    else {
        table[this.id].completed = true;
    }

    
    //reload page
    reload();
}

function erase() {
    let number = this.id.slice(6);
    table.splice(parseInt(number), 1);
    reload();
}

function filter() {

    let newTable = [];
    if(this.id == 'all') {
        newTable = table;
    }
    else if(this.id == 'complete'){
        table.forEach(
            event => {
                if(event.completed)
                {
                    newTable.push(event);
                }
            }
        )
    }
    else {
        table.forEach(
            event => {
                if(!event.completed)
                {
                    newTable.push(event);
                }
            }
        )
    }
    load(newTable);
}