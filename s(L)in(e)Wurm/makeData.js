import { range } from 'd3';

export function makeData(t) {
  const n = 10 + Math.sin(t) * 10;
  
  const data = range(n).map((d) => ({
    x: d * 40 + 50,
    y: 250 + Math.sin(d * 2000 + t) * 220,
    r: 15 + Math.sin(d * .5 + t * 2) * 10,
  }));
  return data;
}