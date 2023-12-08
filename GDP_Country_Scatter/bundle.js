(function () {
        'use strict';

        const addCommas = new RegExp(/\B(?=(\d{3})+(?!\d))/, "g");

                const numMaker = (num, abbr, zeros, fix) => {
                  num = num / Math.pow(10, zeros);
                  return num.toFixed(fix).replace(addCommas, ",") + ` ${abbr}`
                  };

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
              const height = window.innerHeight;

              const margin = {
                top: 30,
                right: 20,
                bottom: 45,
                left: 120,
              };

              const svg = select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

              svg.append("text")
                .attr("x", width/2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("Worldwide GDP and Population (1980)");

              svg.append("text")
                .attr("transform", "translate(" + (width/2) + " ," + (height-5) + ")")
                .style("text-anchor", "middle")
                .text("Population");

              svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -(height/2))
                .attr("y", 15)
                .style("text-anchor", "middle")
                .text("GDP");
              
              const parseRow = (d) => {
                d.population = +d.population,
                d.gdp = +d.gdp;
                //d.country_code = countryName.of(d.country_code);
                	return d;
              };

              
              const xValue = (d) => d.gdp;
              const yValue = (d) => d.population;
              const r = 3;

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
   				
                const GDPInBil = (d, fix) => numMaker(d, 'B', 9, fix);
                const popInMil = (d, fix) => numMaker(d, 'M', 6, fix);
                const GDPPerCap = (d, fix) => numMaker(d, 'K', 3, fix);

                const marks = data.map(d => ({
                  x: x(xValue(d)),
                  y: y(yValue(d)),
                  title: `Country: ${d.country_code}\nGDP: ${GDPInBil(xValue(d), 1)}\nPopulation: ${popInMil(yValue(d), 1)}\nGDP per capita: ${GDPPerCap(xValue(d) / yValue(d), 2)}`,
                }));
                
                svg
                  .selectAll('circle')
                  .data(marks)
                  .join('circle')
                  .attr('cx', (d) => d.x)
                  .attr('cy', (d) => d.y)
                  .attr('r', r)
                	.append('title')
                    .text(d => d.title);

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
              };
              main();

}());

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIm51bU1ha2VyLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiICAgICAgICBcblx0XHRcdFx0Y29uc3QgYWRkQ29tbWFzID0gbmV3IFJlZ0V4cCgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvLCBcImdcIilcblxuICAgICAgICBleHBvcnQgY29uc3QgbnVtTWFrZXIgPSAobnVtLCBhYmJyLCB6ZXJvcywgZml4KSA9PiB7XG4gICAgICAgICAgbnVtID0gbnVtIC8gTWF0aC5wb3coMTAsIHplcm9zKTtcbiAgICAgICAgICByZXR1cm4gbnVtLnRvRml4ZWQoZml4KS5yZXBsYWNlKGFkZENvbW1hcywgXCIsXCIpICsgYCAke2FiYnJ9YFxuICAgICAgICAgIH1cbiAgICAgICAgIiwiaW1wb3J0IHtudW1NYWtlciwgR0RQUGVyQ2FwfSBmcm9tICcuL251bU1ha2VyJztcbiAgICAgIFxuY29uc3Qge1xuICAgICAgICBjc3YsXG4gICAgICAgIHNlbGVjdCxcbiAgICAgICAgc2NhbGVMaW5lYXIsXG4gICAgICAgIGV4dGVudCxcbiAgICAgICAgYXhpc0xlZnQsXG4gICAgICAgIGF4aXNCb3R0b20sXG4gICAgICB9ID0gZDM7XG4gICAgICBcblx0XHRcdGNvbnN0IGNvdW50cnlOYW1lID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFsnZW4nXSwgeyB0eXBlOiAncmVnaW9uJyB9KTsgICAgIFxuICAgICAgY29uc3QgY3N2VXJsID0gW1xuICAgICAgICAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tLycsXG4gICAgICAgICdjdXJyYW4vJywgLy8gdXNlcm5hbWVcbiAgICAgICAgJ2RhdGEvJywgLy8gaWQgb2YgZ2lzdFxuICAgICAgICAnNTExNjU3ZDM2YmFmYmM1YTE5ZGVlNTEwOWNlMjZjYjEzN2YwYjc3Yi9hbGwvJywgLy9jb21taXRcbiAgICAgICAgJ2ludGVncmF0ZWRfcG9wdWxhdGlvbl92c19nZHAuY3N2JywgLy9maWxlIG5hbWVcbiAgICAgIF0uam9pbignJyk7XG4gICAgICBcbiAgICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgIGNvbnN0IG1hcmdpbiA9IHtcbiAgICAgICAgdG9wOiAyMCxcbiAgICAgICAgcmlnaHQ6IDIwLFxuICAgICAgICBib3R0b206IDM1LFxuICAgICAgICBsZWZ0OiAxMjAsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdmcgPSBzZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCB3aWR0aClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICBcbiAgICAgIGNvbnN0IHBhcnNlUm93ID0gKGQpID0+IHtcbiAgICAgICAgZC5wb3B1bGF0aW9uID0gK2QucG9wdWxhdGlvbixcbiAgICAgICAgZC5nZHAgPSArZC5nZHA7XG4gICAgICAgIC8vZC5jb3VudHJ5X2NvZGUgPSBjb3VudHJ5TmFtZS5vZihkLmNvdW50cnlfY29kZSk7XG4gICAgICAgIFx0cmV0dXJuIGQ7XG4gICAgICB9O1xuXG4gICAgICBcbiAgICAgIGNvbnN0IHhWYWx1ZSA9IChkKSA9PiBkLmdkcDtcbiAgICAgIGNvbnN0IHlWYWx1ZSA9IChkKSA9PiBkLnBvcHVsYXRpb247XG4gICAgICBjb25zdCByID0gMztcblxuICAgICAgY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGNzdihjc3ZVcmwsIHBhcnNlUm93KTtcblxuICAgICAgICBjb25zdCB4ID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAgIC5kb21haW4oZXh0ZW50KGRhdGEsIHhWYWx1ZSkpXG4gICAgICAgICAgLnJhbmdlKFtcbiAgICAgICAgICAgIG1hcmdpbi5sZWZ0LFxuICAgICAgICAgICAgd2lkdGggLSBtYXJnaW4ucmlnaHQsXG4gICAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgeSA9IHNjYWxlTGluZWFyKClcbiAgICAgICAgICAuZG9tYWluKGV4dGVudChkYXRhLCB5VmFsdWUpKVxuICAgICAgICAgIC5yYW5nZShbXG4gICAgICAgICAgICBoZWlnaHQgLSBtYXJnaW4uYm90dG9tLFxuICAgICAgICAgICAgbWFyZ2luLnRvcCxcbiAgICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBtYXJrcyA9IGRhdGEubWFwKGQgPT4gKHtcbiAgICAgICAgICB4OiB4KHhWYWx1ZShkKSksXG4gICAgICAgICAgeTogeSh5VmFsdWUoZCkpLFxuICAgICAgICAgIHBfeDogeFZhbHVlKGQpLFxuICAgICAgICAgIHBfeTogeVZhbHVlKGQpLFxuICAgICAgICAgIGF2ZzogeFZhbHVlKGQpIC8geVZhbHVlKGQpLFxuICAgICAgICAgIGNvdW50cnlfY29kZTogZC5jb3VudHJ5X2NvZGUsXG4gICAgICAgIH0pKTtcblx0XHRcdFx0XG4gICAgICBcdC8vIGNoZWNrIG91dCB0aGUgY29uY2lzZSB3YXkgb2Ygd3JpdGluZyB0aGlzIGFib3ZlXG4gICAgICAgIC8vY29uc3QgbWFya3MgPSBkYXRhLm1hcCgoZCkgPT4ge1xuICAgICAgICAvLyAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgeDogeCh4VmFsdWUoZCkpLFxuICAgICAgICAvLyAgXHR5OiB5KHlWYWx1ZShkKSksXG4gICAgICAgIC8vICB9XG4gICAgICAgIC8vfSk7XG5cdFx0XHRcdFxuICAgICAgICBjb25zdCBHRFBJbkJpbCA9IChkLCBmaXgpID0+IG51bU1ha2VyKGQsICdCJywgOSwgZml4KTtcbiAgICAgICAgY29uc3QgcG9wSW5NaWwgPSAoZCwgZml4KSA9PiBudW1NYWtlcihkLCAnTScsIDYsIGZpeCk7XG4gICAgICAgIGNvbnN0IEdEUFBlckNhcCA9IChkLCBmaXgpID0+IG51bU1ha2VyKGQsICdLJywgMywgZml4KTtcbiAgICAgICAgXG4gICAgICAgIHN2Z1xuICAgICAgICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAgICAgLmRhdGEobWFya3MpXG4gICAgICAgICAgLmpvaW4oJ2NpcmNsZScpXG4gICAgICAgICAgLmF0dHIoJ2N4JywgKGQpID0+IGQueClcbiAgICAgICAgICAuYXR0cignY3knLCAoZCkgPT4gZC55KVxuICAgICAgICAgIC5hdHRyKCdyJywgcilcbiAgICAgICAgXHQuYXBwZW5kKCd0aXRsZScpXG4gICAgICAgIFx0XHQvLy50ZXh0KGQgPT4gJ0NvdW50cnk6ICcgKyBkLmNvdW50cnlfY29kZSArICdcXG4nICsgJ1BvcHVsYXRpb246ICcgKyBtYWtlTShkLnBfeSkuZDEgKyAnXFxuJyArICdHRFA6ICcgKyBtYWtlQihkLnBfeCkuZDEgKyBcIiAkXCIpXG4gICAgICAgICAgICAudGV4dChkID0+IGBDb3VudHJ5OiAke2QuY291bnRyeV9jb2RlfVxcbkdEUDogJHtHRFBJbkJpbChkLnBfeCwgMSl9XFxuUG9wdWxhdGlvbjogJHtwb3BJbk1pbChkLnBfeSwgMSl9XFxuR0RQIHBlciBjYXBpdGE6ICR7R0RQUGVyQ2FwKGQuYXZnLCAyKX1gKVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZXJzaW9uIDFcbiAgICAgICAgLy9jb25zdCB5QXhpcyA9IGF4aXNMZWZ0KHkpXG4gICAgICAgIC8vXHQudGlja0Zvcm1hdChkID0+IHBvcEluTWlsKGQsIDApKTtcbiAgICAgICAgLy9jb25zdCB5QXhpc0cgPSBzdmdcbiAgICAgICAgLy8gIC5hcHBlbmQoJ2cnKVxuICAgICAgICAvLyAgLmF0dHIoXG4gICAgICAgIC8vICBcdCd0cmFuc2Zvcm0nLCBcbiAgICAgICAgLy8gIFx0YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgMClgXG4gICAgICAgIC8vXHQpXG4gICAgICAgIC8vICB5QXhpcyh5QXhpc0cpO1xuICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyc2lvbiAyXG4gICAgICAgIHN2Z1xuICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgIFx0J3RyYW5zZm9ybScsIFxuICAgICAgICAgIFx0YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgMClgXG4gICAgICAgIFx0KVxuICAgICAgICAgIC5jYWxsKGF4aXNMZWZ0KHkpXG4gICAgICAgICAgICAgICAudGlja0Zvcm1hdChkID0+IHBvcEluTWlsKGQsIDApKVxuICAgICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvLyBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRWZXJzaW9uIDNcbiAgICAgICAgXG4gICAgICAgIC8vYXhpc0xlZnQoeSkoXG4gICAgICAgIC8vICBzdmdcbiAgICAgICAgLy8gIC5hcHBlbmQoJ2cnKVxuICAgICAgICAvLyAgLmF0dHIoXG4gICAgICAgIC8vICBcdCd0cmFuc2Zvcm0nLCBcbiAgICAgICAgLy8gIFx0YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgMClgXG4gICAgICAgIC8vXHQpXG4gICAgICAgIC8vKTtcbiAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZXJzaW9uIDFcbiAgICAgICAgLy9jb25zdCB4QXhpcyA9IGF4aXNCb3R0b20oeClcbiAgICAgICAgLy9cdC50aWNrRm9ybWF0KGQgPT4gR0RQSW5CaWwoZCwgMCkpO1xuICAgICAgICAvL2NvbnN0IHhBeGlzRyA9IHN2Z1xuICAgICAgICAvL1x0LmFwcGVuZCgnZycpXG4gICAgICAgIC8vICAuYXR0cihcbiAgICAgICAgLy8gICd0cmFuc2Zvcm0nLCBcbiAgICAgICAgLy8gIGB0cmFuc2xhdGUoMCwgJHtoZWlnaHQgLSBtYXJnaW4uYm90dG9tfSlgXG4gICAgICAgIC8vXHQpO1xuICAgICAgICAvL3hBeGlzKHhBeGlzRyk7XG4gICAgICAgIFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWZXJzaW9uIDIgIFxuICAgICAgICBzdmdcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cihcbiAgICAgICAgICBcdCd0cmFuc2Zvcm0nLCBcbiAgICAgICAgICBcdGB0cmFuc2xhdGUoMCwgJHtoZWlnaHQgLSBtYXJnaW4uYm90dG9tfSlgXG4gICAgICAgIFx0KVxuICAgICAgICAgIC5jYWxsKGF4aXNCb3R0b20oeClcbiAgICAgIFx0XHRcdC50aWNrRm9ybWF0KGQgPT4gR0RQSW5CaWwoZCwgMCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFZlcnNpb24gMyAgICAgICAgXG4gICAgICAgIC8vYXhpc0JvdHRvbSh4KShcbiAgICAgICAgLy8gIHN2Z1xuICAgICAgICAvLyAgLmFwcGVuZCgnZycpXG4gICAgICAgIC8vICAuYXR0cihcbiAgICAgICAgLy8gIFx0J3RyYW5zZm9ybScsIFxuICAgICAgICAvLyAgXHRgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCAwKWBcbiAgICAgICAgLy9cdClcbiAgICAgICAgLy8pO1xuICAgICAgfTtcbiAgICAgIG1haW4oKTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBQ0ksTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFDO0FBQzdEO1FBQ0EsUUFBZSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSztRQUMzRCxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsVUFBVSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJ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