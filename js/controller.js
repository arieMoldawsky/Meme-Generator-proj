'use strict';



function onInit() {
    const canvas = document.querySelector('#my-canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(canvas, ctx);
    onSelectImg(gImgs[0]);
    onDrawText(0, 225, 50);
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
    updatSelectedImg(image.id);
    onDrawImg(image);
}

function onDrawImg(image) {
    const ctx = getCtx();
    var imgId = image.id;
    var elImg = document.querySelector(`.img${imgId}`)
    ctx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}

