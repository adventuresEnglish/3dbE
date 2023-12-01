const randNum = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${randNum()}, ${randNum()}, ${randNum()})`;
  
let color;
let color2;
let color3;
let color4;

setInterval(() => {color = randomColor()}, 1000)
setInterval(() => {color2 = randomColor()}, 2000)
setInterval(() => {color3 = randomColor()}, 500)
setInterval(() => {color4 = randomColor()}, 200)

export function vizData(selection, data) {


  selection
    .selectAll('circle')
    .data(data)
    .attr('r', (d) => d.r) // i put r up here to show that it only needs to be assigned once
    .join('circle') // join does what merge and enter append do together
    .attr('fill', color)
    .attr('stroke', color2)
    .attr('stroke-width', 10)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y);
  
    selection
    .selectAll('rect')
    .data(data)
    .attr('height', (d) => d.r)
  	.attr('width', (d) => d.r)// i put r up here to show that it only needs to be assigned once
    .join('rect') // join does what merge and enter append do together
    .attr('fill', color3)
    .attr('stroke', color4)
    .attr('stroke-width', 4)
    .attr('x', (d) => d.x - d.r/2)
    .attr('y', (d) => d.y - d.r/2);
}
