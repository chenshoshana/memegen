'use strict'
var gCanvas;
var gCtx;
var gElListen;
var gTextHight = 500
var gFilterdImgs;



function onInit() {
    render()
    renderCanvas()

    console.log(gElListen);
}

function onTyping(ev) {
    gMeme.lines.text += ev.key
}

function render() {
    renderGallery()
    renderModal()
}

function renderGallery() {
    // var imgs = getImgs('')
    var imgs = gFilterdImgs ? gFilterdImgs : getImgs('')
    var strHtml = imgs.map(function(img, index) {
        // 
        return `<img class="img" id="${imgs[index].id}" src="../img/meme-imgs (square)/${imgs[index].url}" onclick="onImgClicked(${imgs[index].id})"></img>`;
    })
    document.querySelector('.gallery-container').innerHTML = strHtml.join('')
}
// <div class = "color-pik btn btn-txt">
// </div>
{ /* <button class="txt-color-btn btn txt item6" onclick="onColorClick()">color</button> */ }

function renderModal() {
    var strHtml = `
    <canvas id="my-canvas" height="600" width="600" onclick="draw(event)"></canvas>
    <div class="editor-container">
    
    <input type="text" oninput="onAnyKeyPress(this)" id="txt-add" class="txt-add" placeholder='type here'></input>
    <button class="delete-btn">delete</button>
    <button class="add-txtline" onclick="onAddline()">add text line</button>
    <div class="align-txt">
    <button class="txt-line-pik btn btn-txt item1" onclick="onMoveTextUp()">↑</button>
    <button class="txt-line-pik btn btn-txt item2"onclick="onMoveTextDown()">↓</button>
    <button class="txt-aline-right btn btn-txt item3" onclick="onTextAlineRight()">R</button>
    <button class="txt-aline-left btn btn-txt item4"onclick="onTextAlineLeft()">L</button>
    <button class="txt-aline-center btn btn-txt item5"onclick="onTextAlineCenter()">C</button>
    <input class= "input btn btn-txt" type="color" onclick="getColor(this)"></input>
    </div>
    <input type="range" min="50" max="200" class="txt-size" onclick="getTxtSize(this)">text size</input>
    <input type="number" min="0" max="10" class="txt-bold-size" placeholder = 'boldnes' onclick="getTxtBold(this)"></input>
    <div class="imuji-add-box">
    </div>
    <button class="share-btn" onclick="onClickDownload(this)">share</button>
    </div>
    `
        // <form action="onShare()">
        // </form>
        // <!-- 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 -->;
    document.querySelector('.box-container').innerHTML = strHtml
    gElListen = document.querySelector('.txt-add')
    gElListen.addEventListener('keydown', onTyping)
}


function onGalleryClicked() {
    var elGallery = document.querySelector('.gallery-container')
    var elModal = document.querySelector('.box-container')
    var elSelect = document.querySelector('.img-filter')
    if (elGallery.style.display === 'grid') {
        elGallery.style.display = 'none';
        elModal.style.display = 'none';
        elSelect.style.display = 'none';
    } else {
        elGallery.style.display = 'grid';
        elSelect.style.display = 'block';

        renderGallery()
    }
}

function onImgClicked(imgId) {
    var modal = document.querySelector('.box-container')
    getImg(imgId)

    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        modal.style.display = 'flex';
    }
    renderModal()
    drawImg()
        // console.log(gMeme)
}

function getImg(imgId) {
    var filteredImg = gImgs.filter((img) => {
        return img.id === imgId
    })
    gCurrImg = filteredImg[gMeme.selectedLineIdx]
    gImgs[gCurrImg.id] = filteredImg[gMeme.selectedLineIdx]
        // console.log(gImgs[gCurrImg.id].id);
}

function onImgFilter(statusFilter) {
    gFilterdImgs = getImgs(statusFilter.value)
    renderGallery()
}

function renderFilterOptions() {
    var strHtml = '';
    var lessOptionsList = gFilterOptions.slice(0, 5);
    lessOptionsList.forEach(function(filterOption, idx) {
        strHtml += `
        <a style="font-size:${filterOption.popularity}px" 
        onclick="onClickFilter('${filterOption.keyword}',${idx})">${filterOption.keyword}</a>
        `
    })
    document.querySelector('.filter-options').innerHTML = strHtml;
}

// CANVAS

function drawImg() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    var img = document.getElementById(gCurrImg.id);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
}

function renderCanvas() {
    onDrawText()

}

function onAnyKeyPress(element) {

    gMeme.lines[gMeme.selectedLineIdx].txt = element.value //make for other indexes later
    drawImg()
    onDrawText()

}

function onDrawText() {

    // gCanvas = document.getElementById('my-canvas')
    // gCtx = gCanvas.getContext('2d')
    if (!gCanvas) return
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gCanvas.width / 2, gTextHight) //make for other indexes later
        // drawText(txtInput, gCanvas.width / 2, gCanvas.height / 2)
}

function drawText(text, x, y) {

    gCtx.lineWidth = gMeme.lines.bold
    gCtx.strokeStyle = 'black'
    if (!gMeme.lines.color) {
        gCtx.fillStyle = 'white'
    } else {
        gCtx.fillStyle = gMeme.lines.color
    }
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px Arial`
        // gCtx.font = '60px Arial'
    gCtx.textAlign = gMeme.lines.align
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// function onAddline() {
//     drawImg()
//     var firstLine = gElListen.value
//     gElListen.value = ''
//     gMeme.lines.push()
//     drawText(firstLine, gCanvas.width / 2, gTextHight)
//     drawText(firstLine, gCanvas.width / 2, gTextHight)
//     console.log('firstLine', firstLine)
//     console.log('gElListen.value', gElListen.value)
//     console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
// }
// gMeme.lines.push(drawText(gMeme.lines[gMeme.selectedLineIdx++].txt, gCanvas.width / 2, gTextHight + 50))
// renderCanvas()
// Editor buttons


function onShare() {
    return
}

function onColorClick() {
    var elColorInput = document.querySelector('.color-pik')
    if (elColorInput.style.display === 'block') {
        elColorInput.style.display = 'none';
    } else {
        elColorInput.style.display = 'block';
    }
}

function getColor(ev) {
    gMeme.lines.color = ev.value
    renderCanvas()
}


function onMoveTextUp() {
    drawImg()
    moveTextUp()
}

function moveTextUp() {
    gTextHight -= 10
    drawImg()
    onDrawText()
}

function onMoveTextDown() {
    drawImg()
    moveTextDown()
}

function moveTextDown() {
    drawImg()
    gTextHight += 10
    onDrawText()
}

function onTextAlineLeft() {
    gMeme.lines.align = 'right'
    drawImg()
    onDrawText()
    console.log('txt alint', gMeme.lines.align);
}

function onTextAlineRight() {
    gMeme.lines.align = 'left'
    drawImg()
    onDrawText()
    console.log('txt alint', gMeme.lines.align);
}

function onTextAlineCenter() {
    gMeme.lines.align = 'center'
    drawImg()
    onDrawText()
    console.log('txt alint', gMeme.lines.align);
}

function getTxtBold(el) {
    var boldNum = el.value
    console.log(boldNum);
    gMeme.lines.bold = boldNum
    drawImg()
    onDrawText()
}

function getTxtSize(el) {
    var txtSize = el.value
    gMeme.lines[gMeme.selectedLineIdx].size = txtSize
    console.log(el.value);
    drawImg()
    onDrawText()
}

function onClickDownload(elLink) {

    createDownloadLink();
    var currImg = gImgs.find((img) => img.id === gMeme.selectedImgId);
    elLink.download = currImg.url;
}