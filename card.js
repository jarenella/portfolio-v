const cards = document.getElementsByClassName("card");

document.addEventListener("mousemove", (e) => {
    //loop thru each card so they all follow the cursor at once
    for (let i=0; i < cards.length; i++) {
        rotateElemenet(e, cards[i]);
    }
})

function rotateElemenet(event, element) {
    //get mouse position
    const x = event.clientX;
    const y = event.clientY;
    
    //finds middle of window
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    //how far mouse is offest from middle
    const offsetX = ((x - middleX) / middleX) * 20;
    const offsetY = ((y - middleY) / middleY) * 20;

    element.style.setProperty("--rotateX", -1 * offsetY + "deg");
    element.style.setProperty("--rotateY", offsetX + "deg");
}