'use strict';

var gImgs = _getImgs();
var gCanvas;
var gCtx;

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
        },

        {
            txt: '',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            positionX: 210,
            positionY: 210
        }]
}

_imgsKeywordsInsert();

function getImgsByKeyword(keyword) {
    var imgs = [];
    gImgs.forEach(img => {
        if (img.keywords.some(word => word === keyword)) imgs.push(img)
    })
    return imgs;
}

function updateTextAlign(direction, screenSize) {
    const lineIdx = gMeme.selectedLineIdx;
    if (direction === 'left') {
        gMeme.lines[lineIdx].positionX = 20;
        gMeme.lines[lineIdx].align = 'left';
    } else if (direction === 'right') {
        gMeme.lines[lineIdx].positionX = 340;
        gMeme.lines[lineIdx].align = 'right';
    } else {
        if (screenSize === 'wide') gMeme.lines[lineIdx].positionX = 210;
        else gMeme.lines[lineIdx].positionX = 175;
        gMeme.lines[lineIdx].align = 'center';
    }
}

function updateFontSet(font) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].font = font;
}

function updateColorSet(color) {
    const lineIdx = gMeme.selectedLineIdx;
    gMeme.lines[lineIdx].color = color;
}

function switchLine() {
    gMeme.selectedLineIdx += 1;
    if (gMeme.selectedLineIdx > (gMeme.lines.length - 1)) gMeme.selectedLineIdx = 0;
    return gMeme.selectedLineIdx;
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
    // if (txt) gMeme.lines[lineIdx].txt += txt;
    // else gMeme.lines[lineIdx].txt = txt;
    return gMeme.lines[lineIdx].txt;
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

function _imgsKeywordsInsert() {
    gImgs[0].keywords.push('angry', 'trump', 'man');
    gImgs[1].keywords.push('dog', 'dogs', 'sweet', 'kiss');
    gImgs[2].keywords.push('dog', 'baby', 'sleep', 'sweet');
    gImgs[3].keywords.push('cat', 'sleep', 'computer');
    gImgs[4].keywords.push('baby', 'win', 'victory');
    gImgs[5].keywords.push('smile', 'idea', 'man');
    gImgs[6].keywords.push('baby', 'surprise', 'shock', 'sweet');
    gImgs[7].keywords.push('smile', 'man', 'dream');
    gImgs[8].keywords.push('smile', 'baby', 'evil', 'idea');
    gImgs[9].keywords.push('smile', 'man', 'obama');
    gImgs[10].keywords.push('kiss', 'man', 'hug');
    gImgs[11].keywords.push('man', 'you', 'busted');
    gImgs[12].keywords.push('smile', 'man', 'cheers');
    gImgs[13].keywords.push('man', 'glasses', 'cool');
    gImgs[14].keywords.push('man', 'mustache');
    gImgs[15].keywords.push('smile', 'man', 'laugh');
    gImgs[16].keywords.push('man', 'putin', 'evil');
    gImgs[17].keywords.push('man', 'toys');
}

function _getImg(id, keyword) {
    return {
        id,
        url: `./img/${id}.jpg`,
        keywords: [keyword]
    }
}

function _getImgs() {
    gImgs = [];
    for (var i = 1; i <= 18; i++) {
        gImgs.push(_getImg(i));
    }
    return gImgs
}