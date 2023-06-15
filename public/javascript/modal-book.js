let booking = document.querySelector('.booking-btn')
let modal = document.querySelector('.modal-container')
let closeBtn = document.querySelector('.close-btn')

booking.addEventListener('click', () =>{
    modal.classList.add('active')
})

closeBtn.addEventListener('click', () =>{
    modal.classList.remove('active')
})