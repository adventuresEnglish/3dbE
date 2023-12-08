import {numMaker} from './numMaker';
      
const {
        csv,
        select,
        scaleLinear,
        extent,
        axisLeft,
        axisBottom,
      } = d3;
      
const countryName = new Intl.DisplayNames(['en'], { type: 'region' });     
const csvUrl = [
  'https://raw.githubusercontent.com/',
  'curran/', // username
  'data/', // id of gist
  '511657d36bafbc5a19dee5109ce26cb137f0b77b/all/', //commit
  'integrated_population_vs_gdp.csv', //file name
].join('');

const width = window.innerWidth;
const height = window.innerHeigh
const margin = {
  top: 20,
  right: 20,
  bottom: 35,
  left: 120,
}

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const parseRow = (d) => {
  d.population = +d.population,
  d.gdp = +d.gdp;
  //d.country_code = countryName.of(d.country_code);
  	return d;
}

const xValue = (d) => d.gdp;
const yValue = (d) => d.population;
const r = 5;
  
const main = async () => {
  const data = await csv(csvUrl, parseRow);
  
  const x = scaleLinear()
    .domain(extent(data, xValue))
    .range([
      margin.left,
      width - margin.right,
    ]);
  
  const y = scaleLinear()
    .domain(extent(data, yValue))
    .range([
      height - margin.bottom,
      margin.top,
    ]);
  
  const marks = data.map(d => ({
    x: x(xValue(d)),
    y: y(yValue(d)),
    p_x: xValue(d),
    p_y: yValue(d),
    avg: xValue(d) / yValue(d),
    country_code: d.country_code,
  }));
	
  const GDPInBil = (d, fix) => numMaker(d, 'B', 9, fix);
  const popInMil = (d, fix) => numMaker(d, 'M', 6, fix);
  const GDPPerCap = (d, fix) => numMaker(d, 'K', 3, fix);
  
  svg
    .selectAll('circle')
    .data(marks)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', r)
  	.append('title')
      .text(d => `Country: ${d.country_code}\nGDP: ${GDPInBil(d.p_x, 1)}\nPopulation: ${popInMil(d.p_y, 1)}\nGDP per capita: ${GDPPerCap(d.avg, 2)}`
    );
  
  svg
    .append('g')
    .attr(
    	'transform', 
    	`translate(${margin.left}, 0)`
  	)
    .call(axisLeft(y)
         .tickFormat(d => popInMil(d, 0))
    );
    
  svg
    .append('g')
    .attr(
    	'transform', 
    	`translate(0, ${height - margin.bottom})`
  	)
    .call(axisBottom(x)
			.tickFormat(d => GDPInBil(d, 0))
    );
}
main();