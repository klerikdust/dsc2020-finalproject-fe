//  Transition between page
window.onbeforeunload = () => document.getElementById(`loading`).classList.remove(`loaded`)