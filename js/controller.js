'use strict';



function onInit() {
    const canvas = document.querySelector('#my-canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(canvas, ctx);
    onSelectImg(document.querySelector(`.img1`));
    // onDrawText(0, 225, 50);
}

function onTextInput(ev) {
    onInit();
    ev.preventDefault();
    let elTxtInput = document.querySelector('.text-input');
    const text = elTxtInput.value;
    if (!text) alert('Please insert text');
    updatTextLine(text);
    onDrawText(0, 225, 50);
    elTxtInput.value = '';
}

function onDrawText(lineIdx, x, y) {
    const ctx = getCtx();
    let line = drawText(lineIdx);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = line.color;
    ctx.lineWidth = '2';
    ctx.font = `${line.size}px Impact`;
    ctx.textAlign = line.align;
    ctx.fillText(line.txt, x, y);
    ctx.strokeText(line.txt, x, y);
}

function onSelectImg(image) {
    var imageId = +image.classList[0];
    var selectedImg = updatSelectedImg(imageId);
    const canvas = getCanvas();
    const ctx = getCtx();
    var imgId = selectedImg.id;
    var elImg = document.querySelector(`.img${imgId}`)

    ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
}
