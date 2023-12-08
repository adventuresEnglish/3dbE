import { csv, select } from 'd3';
import { scatterPlot } from './scatterPlot';

const csvUrl = [
  'https://gist.githubusercontent.com/',
  'curran/', // User
  'a08a1080b88344b0c8a7/', // Id of the Gist
  'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/', // commit
  'iris.csv', // File name
].join('');
console.log(csvUrl)
const parseRow = (d) => ({
  "Sepal Length": +d.sepal_length,
  "Sepal Width": +d.sepal_width,
  "Petal Length": +d.petal_length,
  "Petal Width": +d.petal_width,
  species: d.species
  //return d;
});

const width = window.innerWidth;
const height = window.innerHeight;
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const main = async () => {
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(await csv(csvUrl, parseRow))
    .xValue((d) => d["Petal Width"])
    .yValue((d) => d["Sepal Length"])
  	.zValue((d) => d.species)
  	.xLabel(() => "Petal Width")
    .yLabel(() => "Sepal Length")
    .margin({
      top: 20,
      right: 20,
      bottom: 50,
      left: 60,
    })
    .radius(5);

  svg.call(plot);

  const columns = [
    "Sepal Length",
		"Sepal Width",
		"Petal Length",
		"Petal Width"
  ];
  let i = 0;
  setInterval(() => {
    i++;
    plot.xValue((d) => d[columns[i % columns.length]]);
    plot.xLabel((d) => [columns[i % columns.length]]);
    svg.call(plot);
  }, 4000);
};
main();

