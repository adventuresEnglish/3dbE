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
setInterval(() => {
 
  svg 	
    .call(vizData, makeData(t))

  t += 0.005;
}, 1000 /60 );









