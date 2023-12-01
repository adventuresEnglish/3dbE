import { select } from 'd3';
import { vizData, vizData2 } from './vizData';
import { makeData } from './makeData';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
  


  	

  
setInterval(() => {
  let intervalSpeed = Math.random() * 30;
	let t = 0;
	const zenout = setInterval(function() {
  		svg 	
    		.call(vizData, makeData(t))
  		t += 0.008; 
	}, 1000 / intervalSpeed)
}, 3000)

