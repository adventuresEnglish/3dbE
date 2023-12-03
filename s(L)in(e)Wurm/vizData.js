const randomColor = () =>
  `rgb(${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;

export function vizData(selection, data) {
 
    const lines = data.reduce((accumulator, currentValue, index) => {
      
      const nextElement = data[index + 1];
      if(typeof nextElement !== 'undefined') {
        accumulator.push({
          'x1': currentValue.x,
          'y1': currentValue.y,
          'x2': nextElement.x,
          'y2': nextElement.y,
          'r': currentValue.r,
        });
      }
      return accumulator;
    }, []);
     

   selection
    .selectAll('line')
    .data(lines)
    .join('line')
    .attr('x1', (d) => d.x1)
    .attr('y1', (d) => d.y1)
  	.attr('x2', (d) => d.x2)
    .attr('y2', (d) => d.y2) 
  	.attr('stroke', 'lime')
    .attr('stroke-width', (d) => d.r);

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
