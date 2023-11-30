import { select } from 'd3';
import { vizData, vizData2 } from './vizData';
import { makeData } from './makeData';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
  
let t = 0;
let counter = 20;
let factor = 0;

setInterval(() => {
	factor % 2 == 0 ? counter+=90 : counter-=90;
	factor++
}, 4000) 

function zenout() {
		svg.call(vizData, makeData(t));
  	t += 0.008; 
    setTimeout(zenout, 1000/counter);
}

setTimeout(zenout, 1000/counter);

  	

  
//let intervalSpeed;
//let t = 0;
//const zenout = setInterval(function() {
//  	svg 	
//    	.call(vizData, makeData(t))
//  	t += 0.008; 
//	}, 1000 /   intervalSpeed)
//intervalSpeed = Math.random() * 100 + 20;