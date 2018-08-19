import '@/styles/addImage.scss';

// addImage.js
let bigImage = document.createElement('img')
// 必须 require 进来
bigImage.src = require('../images/hk.jpeg')
document.body.appendChild(bigImage)

let smallImage = document.createElement('img')
smallImage.src = require('../images/zhihu.jpeg')
document.body.appendChild(smallImage);
