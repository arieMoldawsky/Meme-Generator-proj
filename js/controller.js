'use strict';



function onInit() {
    const canvas = document.querySelector('#my-canvas');
    const ctx = canvas.getContext('2d');
    const meme = getMeme();
    setCanvas(canvas, ctx);
    onSelectImg(document.querySelector(`.img${meme.selectedImgId}`));
}

function onUpDownText(ev, adder) {
    onInit();
    ev.preventDefault();
    const meme = getMeme();
    adder = +adder;
    updateTxtLocation(adder);
    const x = meme.lines[0].positionX;
    const y = meme.lines[0].positionY;
    onDrawText(0, x, y);
}
function onIncDecFont(ev, adder) {
    onInit();
    ev.preventDefault();
    const meme = getMeme();
    const x = meme.lines[0].positionX;
    const y = meme.lines[0].positionY;
    adder = +adder;
    updateFontSize(adder);
    onDrawText(0, x, y);
}

function onTextInput(ev) {
    onInit();
    ev.preventDefault();
    const meme = getMeme();
    const x = meme.lines[0].positionX;
    const y = meme.lines[0].positionY;
    let elTxtInput = document.querySelector('.text-input');
    const text = elTxtInput.value;
    if (!text) alert('Please insert text');
    updatTextLine(text);
    onDrawText(0, x, y);
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
