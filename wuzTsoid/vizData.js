const randomColor = () =>
  `rgb(${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;

export function vizData(selection, data) {


  selection
    .selectAll('circle')
    .data(data)
    .attr('r', (d) => d.r) // i put r up here to show that it only needs to be assigned once
    .join('circle') // join does what merge and enter append do together
    .attr('fill', 'green')
    .attr('stroke', 'teal')
    .attr('stroke-width', 10)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y);
  
    selection
    .selectAll('rect')
    .data(data)
    .attr('height', (d) => d.r)
  	.attr('width', (d) => d.r)// i put r up here to show that it only needs to be assigned once
    .join('rect') // join does what merge and enter append do together
    .attr('fill', 'red')
    .attr('stroke', 'yellow')
    .attr('stroke-width', 4)
    .attr('x', (d) => d.x - d.r/2)
    .attr('y', (d) => d.y - d.r/2);
}
