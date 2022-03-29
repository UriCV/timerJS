
const timer = document.querySelector('.timer')


function getHTML() {
    return `
        <span class="timer-part timer-part-minutes">30</span>
        <span class="timer-part timer-dots">:</span>
        <span class="timer-part timer-part-seconds">00</span>
        <button type="button" class="timer-btn timer-btn-control timer-btn-start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer-btn timer-btn-reset">
            <span class="material-icons">timer</span>                
        </button>
    `
}



timer.innerHTML = getHTML();

el = {
    minutes: document.querySelector('.timer-part-minutes'),
    seconds: document.querySelector('.timer-part-seconds'),
    btnStart: document.querySelector('.timer-btn-start'),
    btnReset: document.querySelector('.timer-btn-reset'),
}

interval = null;
remainingTime = 1800;


el.btnStart.addEventListener('click', () => {
    if (interval === null) {
        start()
    }
    else {
        stop()
    }
})

el.btnReset.addEventListener('click', () => {
    const inputMinutes = prompt('How many minutes?')
    if (interval !== null) {
        stop()
    }

    if(inputMinutes < 61) {
        remainingTime = inputMinutes * 60
        updateInterfaceTime()
    }
})

function updateInterfaceTime() {
    const  minutes = Math.floor(remainingTime / 60)
    const  seconds = remainingTime % 60

    el.minutes.textContent = minutes.toString().padStart(2, '0')
    el.seconds.textContent = seconds.toString().padStart(2, '0')
}

function updateInterfaceControl() {
    if (interval === null) {
        el.btnStart.innerHTML = `<span class="material-icons">play_arrow</span>`
        el.btnStart.classList.add('timer-btn-start')
        el.btnStart.classList.remove('timer-btn-stop')
    }
    else {
        el.btnStart.innerHTML = `<span class="material-icons">pause</span>`
        el.btnStart.classList.add('timer-btn-stop')
        el.btnStart.classList.remove('timer-btn-start')
    }
}

function start() {
    if(remainingTime === 0) return
    interval = setInterval(() => {
        remainingTime--
        updateInterfaceTime()

        if(remainingTime === 0) {
            stop()
        }
    
    }, 1000)
    updateInterfaceControl()
}

function stop() {
    clearInterval(interval)
    interval = null
    updateInterfaceControl()
}