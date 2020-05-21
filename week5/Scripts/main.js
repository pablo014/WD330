/* arrow syntax function declaration*/
const toggleMenu = () => {
    document.getElementById('navigation').classList.toggle('show');

}

document.querySelector('#menu').addEventListener('click', toggleMenu);