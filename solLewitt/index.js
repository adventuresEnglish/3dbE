import {
    select,
    range,
    symbol,
    symbols,
  } from 'd3';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
	const randomColor = () => `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
  function isEven(n) {
    return /^-?\d*[02468]$/.test(n);
  }
  
  const svg = select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
 const svgFn = function(num, normal) {
  	const n = 100;
    const k = width/symbols.length/20;
		return svg
      .append('g')
      .selectAll('rect')
      .data(range(n))
      .join('rect')
      .attr('y', (d) => d * 10)
      .attr('x', width/7*num)
      .attr('width', width/7)
      .attr('height', 10)
      .attr('mask', normal ? 'url(#mask-1)' : 'url(#mask-2)')
    	.attr('fill', randomColor),
      
      svg
      .append('g')
      .selectAll('rect')
      .data(range(n))
      .join('rect')
      .attr('y', (d) => d * 10)
      .attr('x', width/7*num)
      .attr('width', width/7)
      .attr('height', 10)
      .attr('mask', normal ? 'url(#mask-1)' : 'url(#mask-2)')
    	.attr('fill', randomColor),
  
		svg
      .append('g')
      .selectAll('rect')
      .data(range(k))
      .join('rect')
      .attr('x', (d) => d * 70 + width/7*num)
      .attr('width', 70)
      .attr('height', height)
      .attr('mask', normal ? 'url(#mask-2)' : 'url(#mask-1)')
  		.attr('fill', randomColor),
      
    svg
      .append('g')
      .selectAll('rect')
      .data(range(k))
      .join('rect')
      .attr('x', (d) => d * 10 + width/7*num + width/14)
      .attr('width', 10)
      .attr('height', height)
      .attr('mask', normal ? 'url(#mask-1)' : 'url(#mask-2)')
  		.attr('fill', randomColor)
  }

const render = function () {
	for (let i = 0; i < symbols.length; i++) {
   svgFn(i, isEven(i))
  }
}

  const renderMask = function (
    selection,
    id,
    inverted
  ) {
    const mask = selection
      .append('mask')
      .attr('id', id);
  	  
    mask
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', inverted ? 'black' : 'white');
    	
  
    mask
      .selectAll('g')
      .data(range(symbols.length))
      .join((enter) =>
        enter
          .append('g')
          .attr(
            'transform',
            (d) =>
              `translate(${
                (d * width) / symbols.length + width / (symbols.length*2)
              }, ${height / 2})`
          )
          .append('path')
          .attr('d', (d) =>
            symbol(symbols[d], 5000)()
          )
          .attr(
            'fill',
            inverted ? 'white' : 'black'
          )
      );
  };
  

	render()
  svg
    .call(renderMask, 'mask-1', false)
    .call(renderMask, 'mask-2', true);

    setTimeout(function () { 
      location.reload();
    }, 3 * 1000);