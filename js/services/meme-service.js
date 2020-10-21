'use strict';

var gImgs = _getImgs();

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Your text goes here',
            size: 30,
            align: 'center',
            color: 'white'
        }]
}

var gCanvas;
var gCtx;


function updatTextLine(txt) {
    gMeme.lines[0].txt = txt;
}

function drawText(lineIdx) {
    let line = gMeme.lines[lineIdx];
    return line;
}

function updatSelectedImg(imgId) {
    gMeme.selectedImgId = imgId;
    var img = getImgById(imgId);
    return img;
}

function getImgById(id) {
    var img = gImgs.find(img => img.id === id)
    return img;
}

function getCtx() {
    return gCtx;
}
function getCanvas() {
    return gCanvas;
}

function setCanvas(canvas, ctx) {
    gCanvas = canvas;
    gCtx = ctx;
}

function _getImg(id) {
    return {
        id,
        url: `./img/${id}.jpg`,
        keywords: []
    }
}

function _getImgs() {
    gImgs = [];
    gImgs.push(_getImg(1));
    gImgs.push(_getImg(2));
    return gImgs
}