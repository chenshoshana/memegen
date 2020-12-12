'use strict'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: '1.jpg', keywords: ['angry'] },
    { id: 2, url: '2.jpg', keywords: ['animals'] },
    { id: 3, url: '3.jpg', keywords: ['animals', 'babies'] },
    { id: 4, url: '4.jpg', keywords: ['animals'] },
    { id: 5, url: '5.jpg', keywords: ['happy', 'babies'] },
    { id: 6, url: '6.jpg', keywords: ['angry'] },
    { id: 7, url: '7.jpg', keywords: ['happy', 'babies'] },
    { id: 8, url: '8.jpg', keywords: ['movie'] },
    { id: 9, url: '9.jpg', keywords: ['babies', 'happy', 'laughing'] },
    { id: 10, url: '10.jpg', keywords: ['happy', 'laughing'] },
    { id: 11, url: '11.jpg', keywords: ['happy'] },
    { id: 12, url: '12.jpg', keywords: ['angry'] },
    { id: 13, url: '13.jpg', keywords: ['happy', 'movie'] },
    { id: 14, url: '14.jpg', keywords: ['angry', 'movie'] },
    { id: 15, url: '15.jpg', keywords: ['movie', 'angry'] },
    { id: 16, url: '16.jpg', keywords: ['movie', 'laughing'] },
    { id: 17, url: '17.jpg', keywords: ['putin'] },
    { id: 18, url: '18.jpg', keywords: ['sad', 'movie'] }
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 100,
        align: 'center',
        color: '',
        bold: 3,
    }, ]
}
var gCurrImg;
var gImgFilter;

function getImgs(statusFilter) {
    if (statusFilter === 'all') {
        return gImgs
    }
    if (statusFilter) {
        return gImgs.filter(function(img) {
            return img.keywords.includes(statusFilter)
        })
    } else {
        return gImgs
    }
}

function createDownloadLink(elLink) {
    // elLink.href = gCanvas.toDataURL();
    debugger
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('my-canvas').toDataURL()
    link.click();

}