'use strict';


function onInit() {
    const canvas = document.querySelector('#my-canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(canvas, ctx);
    onRenderGallery()
    onRenderCanvas()
}

function onReset() {
    location.reload();
}

function onSwitchLine(ev) {
    const meme = getMeme();
    ev.preventDefault();
    switchLine();
    let elTxtInput = document.querySelector('.text-input');
    elTxtInput.value = meme.lines[meme.selectedLineIdx].txt;
    onRenderCanvas();
}

function canvasClicked(ev) {
    const ctx = getCtx();
    const meme = getMeme();
    const lines = meme.lines;
    const { offsetX, offsetY } = ev;
    var lineIdx = meme.selectedLineIdx;

    ctx.font = `${lines[lineIdx].size}px ${lines[lineIdx].font}`;
    var lineSize = ctx.measureText(`${lines[lineIdx].txt}`);
    let clickedLineIdx;
    if (!lines[lineIdx].txt) {
        clickedLineIdx = lines.findIndex(line => {
            return ((offsetX > line.positionX - 100) && (offsetX < line.positionX + 100)) && ((offsetY < line.positionY) && (offsetY > line.positionY - 40))
        })
    } else {
        clickedLineIdx = lines.findIndex(line => {
            return ((offsetX > line.positionX - lineSize.width) && (offsetX < line.positionX + lineSize.width)) && ((offsetY < line.positionY) && (offsetY > line.positionY - 40))
        })
    }
    if (clickedLineIdx !== -1) {
        meme.selectedLineIdx = clickedLineIdx;
        let elTxtInput = document.querySelector('.text-input');
        elTxtInput.value = lines[meme.selectedLineIdx].txt;
        onRenderCanvas();
    }
}

function onRenderCanvas(download) {
    const canvas = getCanvas();
    const ctx = getCtx();
    setCanvas(canvas, ctx);
    onRenderImg(download);
}

function onRenderTxt(download) {
    const ctx = getCtx();
    const meme = getMeme();
    const lines = meme.lines;
    var lineIdx = meme.selectedLineIdx;
    ctx.font = `${lines[lineIdx].size}px ${lines[lineIdx].font}`;
    var lineSize = ctx.measureText(`${lines[lineIdx].txt}`);
    lines.forEach((line, idx) => onDrawText(idx, line.positionX, line.positionY));
    if (download === 'yes') return;
    drawRect(lines[lineIdx].positionX - ((lineSize.width + 20) / 2), lines[lineIdx].positionY - lines[lineIdx].size, lineSize.width + 20, lines[lineIdx].size + 10);
}

function onRenderGallery() {
    var elGallery = document.querySelector('.gallery-container');
    var strHtml = '';
    for (var i = 1; i <= 18; i++) {
        strHtml += `<div class="gallery-item"><img class="${i} img${i}" src="img/${i}.jpg" onclick="onSelectImg(this, event);resizeCanvas()"></div>`
    }
    elGallery.innerHTML = strHtml;
}

function resizeCanvas() {
    resizeCanvasHelper();
    window.addEventListener('resize', function () {
        resizeCanvasHelper()
    })
}

function resizeCanvasHelper() {
    var elContainer = document.querySelector('.canvas-container');
    var canvas = document.querySelector('#my-canvas');
    const meme = getMeme();
    const lines = meme.lines;
    if (elContainer.offsetWidth < 400) {
        canvas.width = elContainer.offsetWidth;
        canvas.height = elContainer.offsetHeight;
        if (lines[0].positionX === 210 && lines[1].positionX === 210) {
            lines[0].positionX = 175;
            lines[0].positionY = 50;
            lines[1].positionX = 175;
            lines[1].positionY = 310;
            lines[2].positionX = 175;
            lines[2].positionY = 175;
        }
        onRenderCanvas();
    } else {
        canvas.width = 420;
        canvas.height = 420;
        if (lines[0].positionX === 175 && lines[1].positionX === 175) {
            lines[0].positionX = 210;
            lines[1].positionX = 210;
            lines[1].positionY = 400;
            lines[2].positionX = 210;
            lines[2].positionY = 210;
        }
        onRenderCanvas();
    }
}

function onSearchKeyword(val, ev) {
    ev.preventDefault();
    var imgs = getImgsByKeyword(val);
    if (!imgs[0]) onRenderGallery();
    else {
        var elGallery = document.querySelector('.gallery-container');
        var strHtml = '';
        imgs.forEach(img => {
            strHtml += `<div class="gallery-item"><img class="${img.id} img${img.id}" src="img/${img.id}.jpg" onclick="onSelectImg(this, event);resizeCanvas()"></div>`
        })
        elGallery.innerHTML = strHtml;
    }
}

function onUploadImg(elForm, ev) {
    ev.preventDefault();
    const canvas = getCanvas();
    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <button class="form-btn share-btn"><a href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a></button>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('https://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function onDownloadCanvas(elLink) {
    onRenderCanvas('yes');
    setTimeout(() => {
        const canvas = getCanvas();
        const data = canvas.toDataURL("image/jpg");
        const elTempLink = document.createElement('a');
        elTempLink.href = data;
        elTempLink.hidden = true;
        elTempLink.download = 'myMeme.jpg';
        elTempLink.click();
    }, 100)
}

function onAlignTxt(ev, direction) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    var elContainer = document.querySelector('.canvas-container');
    if (elContainer.offsetWidth < 400) updateTextAlign(direction, 'narrow');
    else updateTextAlign(direction, 'wide')
    onRenderCanvas();
}

function onFontSet(font) {
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    updateFontSet(font);
    onRenderCanvas();
}

function onColorSet(color) {
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    updateColorSet(color);
    onRenderCanvas();
}

function onUpDownText(ev, adder) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    adder = +adder;
    updateTxtLocation(adder);
    onRenderCanvas();
}

function onIncDecFont(ev, adder) {
    ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    adder = +adder;
    updateFontSize(adder);
    onRenderCanvas();
}

function onDeleteLine(ev) {
    if (ev) ev.preventDefault();
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    const text = '';
    updatTextLine(text);
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
    if (!text) {
        alert('Please insert text');
        return
    }
    updatTextLine(text);
    onRenderCanvas();
}

function drawRect(x, y, sizeX, sizeY) {
    const ctx = getCtx();
    ctx.beginPath();
    ctx.rect(x, y, sizeX, sizeY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgba(231, 225, 225, 0.363)';
    ctx.fill();
}

function onDrawText(lineIdx, x, y) {
    const ctx = getCtx();
    let line = drawText(lineIdx);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = line.color;
    ctx.lineWidth = '2';
    ctx.font = `${line.size}px ${line.font}`;
    ctx.textAlign = line.align;
    ctx.fillText(line.txt, x, y);
    ctx.strokeText(line.txt, x, y);
}

function onRenderImg(download) {
    const canvas = getCanvas();
    const meme = getMeme();
    const ctx = getCtx();
    var imgId = meme.selectedImgId;
    var img = new Image();
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onRenderTxt(download);
    }
}

function onSelectImg(image, ev) {
    if (ev.type === 'click') {
        var imageId = +image.classList[0];
        updatSelectedImg(imageId);

        const elCanvas = document.querySelector('.canvas-section');
        elCanvas.style.display = 'grid';
        const elGallery = document.querySelector('.gallery-section')
        elGallery.style.display = 'none';
        if (window.innerWidth > 501 && window.innerHeight > 730) {
            const footer = document.querySelector('footer');
            footer.classList.add('footer-to-bottom');
        }
        onRenderCanvas();
    }
}