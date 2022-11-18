let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menu.onclick = () =>{
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}
window.onscroll = () => {
    menu.classList.remove('bx-x')
    navbar.classList.remove('active')
}

const sr = ScrollReveal ({
    distance: '55px',
    duration: 2500,
    delay: 400,
    reset: true,
})
sr.reveal('.text',{delay: 200, origin: 'top'})
sr.reveal('.form-container form',{delay: 600, origin: 'left'})
sr.reveal('.heading',{delay: 700, origin: 'top'})
sr.reveal('.ride-container .box',{delay: 750, origin: 'top'})
sr.reveal('.service-container .box',{delay: 650, origin: 'top'})
sr.reveal('.about-container .box',{delay: 500, origin: 'top'})
sr.reveal('.reviews-container',{delay: 450, origin: 'top'})
sr.reveal('.newsletter .box',{delay: 400, origin: 'bottom'})



