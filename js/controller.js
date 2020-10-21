'use strict';



function onInit() {
    onRenderCanvas()
}



function onSwitchLine(ev) {
    ev.preventDefault();
    switchLine();
}

function onRenderCanvas() {
    const canvas = document.querySelector('#my-canvas');
    const ctx = canvas.getContext('2d');
    const meme = getMeme();
    const lines = meme.lines;
    setCanvas(canvas, ctx);
    onSelectImg(document.querySelector(`.img${meme.selectedImgId}`), event);
    lines.forEach((line, idx) => onDrawText(idx, line.positionX, line.positionY))
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    var canvas = document.querySelector('#my-canvas');
    console.log(elContainer.offsetWidth);
    if (elContainer.offsetWidth < 400) {
        canvas.width = elContainer.offsetWidth;
        canvas.height = elContainer.offsetHeight;
        onRenderCanvas();
    }
}

function onUpDownText(ev, adder) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    adder = +adder;
    updateTxtLocation(adder);
    const x = meme.lines[lineIdx].positionX;
    const y = meme.lines[lineIdx].positionY;
    onDrawText(lineIdx, x, y);
    onRenderCanvas();
}
function onIncDecFont(ev, adder) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    const x = meme.lines[lineIdx].positionX;
    const y = meme.lines[lineIdx].positionY;
    adder = +adder;
    updateFontSize(adder);
    onDrawText(lineIdx, x, y);
    onRenderCanvas();
}

function onTextInput(ev) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    const x = meme.lines[lineIdx].positionX;
    const y = meme.lines[lineIdx].positionY;
    let elTxtInput = document.querySelector('.text-input');
    const text = elTxtInput.value;
    if (!text) alert('Please insert text');
    updatTextLine(text);
    onDrawText(lineIdx, x, y);
    onRenderCanvas();
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

function onSelectImg(image, ev) {
    if (ev.type === 'click') {
        var imageId = +image.classList[0];
        var selectedImg = updatSelectedImg(imageId);
        const canvas = getCanvas();
        const ctx = getCtx();
        var imgId = selectedImg.id;
        var elImg = document.querySelector(`.img${imgId}`)

        ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)

        const elCanvas = document.querySelector('.canvas-section');
        elCanvas.style.display = 'grid';
        const elGallery = document.querySelector('.gallery-container')
        elGallery.style.display = 'none';
    }
}
