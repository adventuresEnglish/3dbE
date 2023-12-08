import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  transition,
  scaleOrdinal,
  schemeTableau10,
} from 'd3';

export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;
  let xLabel;
  let yLabel;
  let zValue;
  
  const my = (selection) => {
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([
        height - margin.bottom,
        margin.top,
      ]);

    const z = scaleOrdinal()
      .domain(data.map((d) => d.species))
      .range(schemeTableau10);

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      z: z(zValue(d)),
    }));

    const t = transition().duration(2000);

    const positionCircles = (circles) => {  
      circles
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);  
    };

    const setColors = (circles) => {
      circles.attr('fill', (d) => d.z);
    };
    const growRadius = (enter) => {
      enter.transition(t).attr('r', radius);
    };

    const circles = selection
      .selectAll('circle')
      .data(marks)
      .join(
        (enter) =>
          enter
            .append('circle')
            .call(positionCircles)
            .attr('r', 0)
            .call(growRadius)
        		.call(setColors),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 10)
              .call(positionCircles)
              
          ),
        (exit) => exit.remove()
      );

    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr(
        'transform',
        `translate(${margin.left},0)`
      )
      .transition(t)
      .call(axisLeft(y));

    selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr(
        'transform',
        `translate(0,${height - margin.bottom})`
      )
      .transition(t)
      .call(axisBottom(x));
    
    const labelStyle = (selection) => {
      selection
        .style('font-size', '18px')
    		.style('font-weight', '900')
     }
      
    selection
      .selectAll('.title')
      .data([null])
      .join('text')
      .attr('x', width / 2)
      .attr('y', 23)
      .classed('title', true)
      .text('Iris');
    selection
      .selectAll('.x-label')
      .data([null])
      .join('text')
    	.attr('class', 'x-label')
      .attr(
        'transform',
        'translate(' +
          (width * .816) +
          ' ,' +
          (height - 13) +
          ')'
      )
    	.call(labelStyle)
      .text(xLabel());
    selection
      .selectAll('.y-label')
      .data([null])
      .join('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -181)
      .attr('y', 22)
      .call(labelStyle)
      .text(yLabel());
  };

  my.width = function (_) {
    return arguments.length
      ? ((width = +_), my)
      : width;
  };

  my.height = function (_) {
    return arguments.length
      ? ((height = +_), my)
      : height;
  };

  my.data = function (_) {
    return arguments.length
      ? ((data = _), my)
      : data;
  };

  my.xValue = function (_) {
    return arguments.length
      ? ((xValue = _), my)
      : xValue;
  };

  my.yValue = function (_) {
    return arguments.length
      ? ((yValue = _), my)
      : yValue;
  };

    my.zValue = function (_) {
    return arguments.length
      ? ((zValue = _), my)
      : zValue;
  };
  
  my.xLabel = function (_) {
    return arguments.length
      ? ((xLabel = _), my)
      : xLabel;
  };

  my.yLabel = function (_) {
    return arguments.length
      ? ((yLabel = _), my)
      : yLabel;
  };

  my.margin = function (_) {
    return arguments.length
      ? ((margin = _), my)
      : margin;
  };

  my.radius = function (_) {
    return arguments.length
      ? ((radius = +_), my)
      : radius;
  };

  return my;
};
