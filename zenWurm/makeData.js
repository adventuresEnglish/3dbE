import { range } from 'd3';

export function makeData(t) {
  const n = 12 + Math.sin(t) * 12;
  
  const data = range(n).map((d) => ({
    x: d * 35 + 50,
    y: 250 + Math.sin(d * t) * 100,
    r: 15 + Math.sin(d * .5 + t * 2) * 10,
  }));
  return data;
}