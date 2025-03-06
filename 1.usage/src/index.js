import './index.css';
import pickPng from './assets/pick.png';
import {vendor} from './vendor.js';

console.log(vendor);
console.log("pickPng",pickPng);
console.log('index');
let img = new Image();
img.src = pickPng;
document.body.appendChild(img);

