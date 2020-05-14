import {Event} from 'utilities.js'

let table = [];

function loadTable() {
    if (localStorage.length > 0) {
        table = JSON.parse(localStorage.getItem(events));
    }
    table.forEach(
        event => {
            document.querySelector('tbody').append('<tr><td></td><td></td><td></td></tr>')
        }
    )
}

function add() {

}