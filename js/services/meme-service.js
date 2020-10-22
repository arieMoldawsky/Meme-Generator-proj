'use strict';

var gImgs = _getImgs();

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            positionX: 210,
            positionY: 50
        },

        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            positionX: 210,
            positionY: 400
        }]
}

var gCanvas;
var gCtx;


// function renderText() {

// }

function updateFontSet(font) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].font = font;
}

function updateColorSet(color) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].color = color;
}

function switchLine() {
    gMeme.selectedLineIdx +=1;
    if (gMeme.selectedLineIdx > (gMeme.lines.length - 1)) gMeme.selectedLineIdx = 0;
}

function updateTxtLocation(adder) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].positionY += adder;
}

function updateFontSize(adder) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].size += adder;
}

function updatTextLine(txt) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].txt = txt;
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

function getMeme() {
    return gMeme;
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
    for (var i= 1; i <= 18; i++) {
        gImgs.push(_getImg(i));
    }
    return gImgs
}