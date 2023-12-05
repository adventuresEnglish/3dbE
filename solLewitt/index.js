

  const numOfBlocks = d3.symbols.length;
  const width = window.innerWidth;
	const height = window.innerHeight;
  const side = width / numOfBlocks;
  const halfSide = side / 2;
  const randomNum = () => Math.floor(Math.random() * 256);
	const numOfRows = Math.floor(height / side);
  const randomColor = () =>
    `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  function isEven(n) {
    return /^-?\d*[02468]$/.test(n);
  }
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  	.attr(
            "transform",
              `translate(0, ${height/2 -halfSide})`
          )
  const subSvgFn = function (selection, num, normal) {
    const q = 10 + Math.random() * 20;
    const k =  Math.random() * 8;
    const slatWidth = Math.random() * 14 + 3;
    const slot = side*num;

      
      const sel1 = selection
        .append("g")
        .selectAll("rect")
        .data(d3.range(q))
        .join("rect")
        .attr("y", (d) => d * slatWidth)
        .attr("x", slot + halfSide)
        .attr("width", halfSide)
        .attr("height", slatWidth)
        .attr("mask", normal ? "url(#mask-1)" : "url(#mask-2)")
        .attr("fill", randomColor);
      
      const sel2 =selection
        .append("g")
        .selectAll("rect")
        .data(d3.range(q))
        .join("rect")
        .attr("y", (d) => d * slatWidth)
        .attr("x", slot)
        .attr("width", halfSide)
        .attr("height", slatWidth)
        .attr("mask", normal ? "url(#mask-1)" : "url(#mask-2)")
        .attr("fill", randomColor);
 

     const sel3 = selection
        .append("g")
        .selectAll("rect")
        .data(d3.range(k))
        .join("rect")
        .attr("x", (d) => d * halfSide + slot)
        .attr("width", halfSide)
        .attr("height", side)
        .attr("mask", normal ? "url(#mask-2)" : "url(#mask-1)")
        .attr("fill", randomColor);

      const sel4 = selection
        .append("g")
        .selectAll("rect")
        .data(d3.range(k))
        .join("rect")
        .attr("x", (d) => d * slatWidth + slot + halfSide)
        .attr("width", slatWidth)
        .attr("height", side)
        .attr("mask", normal ? "url(#mask-1)" : "url(#mask-2)")
        .attr("fill", randomColor)

  
  };

  const renderMask = function (selection, id, inverted, arr) {
    const mask = selection.append("mask").attr("id", id);

    mask
      .append("rect")
      .attr("width", width)
      .attr("height", side)
      .attr("fill", inverted ? "black" : "white");

    mask
      .selectAll("g")
      .data(d3.range(numOfBlocks))
      .join((enter) =>
        enter
          .append("g")
          .attr(
            "transform",
            (d) =>
              `translate(${
                (d * width) / numOfBlocks + width / (numOfBlocks * 2)
              }, ${halfSide})`
          )
          .append("path")
          .attr("d", (d) => d3.symbol(d3.symbols[arr[d]], 5000)())
          .attr("fill", inverted ? "white" : "black")
      );
  };

  const renderBlender = () => {
     
    const maskArr = [];
  for (let i = 0; i < numOfBlocks; i++) {
    const el = Math.floor(Math.random() * numOfBlocks);
    maskArr.push(el);
  }

      for (let i = 0; i < numOfBlocks; i++) {
        subSvgFn(svg, i, isEven(i));
      }
      svg.call(renderMask, "mask-1" , false, maskArr).call(renderMask, "mask-2", true, maskArr)
    //}
  };
  renderBlender();

  setTimeout(function () {
    location.reload();
  }, 2800);





