// Line chart

var xAxis = g => g
  .attr('transform', 'translate(0,' + height + ' )')
  .call(d3.axisBottom(x).ticks(width / 80)/tickSizeOuter(0))

var yAxis = g => g
      .attr("transform", 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold"))

var x_line = d3.scaleLinear()
        .domain([1,163])
        .range([margin.left, width - margin.right])

var y_line = d3.scaleLinear()
        .domain([0, 330])
        .range([height - margin.bottom, margin.top])

var line = d3.line()
          .defined(d => !isNaN(d))
          .x((d, i) => x_line(line_data.games[i]))
          .y(d => y_line(d))

var hover = function(svg, path) {
  svg
      .style("position", "relative");

  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);


  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("y", -25);

  dot.append('text')
      .attr('class', 'game')
      .style('font', '10px sans-serif')
      .attr('text-anchor', 'middle')
      .attr('y', -15);

  dot.append('text')
      .attr('class', 'hrs')
      .style('font', '10px sans-serif')
      .attr('text-anchor', 'middle')
      .attr('y', -5);

  var moved = function() {
    d3.event.preventDefault();
    const ym = y.invert(d3.event.layerY);
    const xm = x.invert(d3.event.layerX);
    const i1 = d3.bisectLeft(data.games, xm, 1);
    const i0 = i1 - 1;
    const i = xm - data.games[i0] > data.games[i1] - xm ? i1 : i0;
    const s = data.teams.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
    path.attr("stroke", d => d === s ? line_color(d.id) : "#ddd" ).filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(line_data.games[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name);
    dot.select('.game').text("Game " + line_data.games[i])
    dot.select('.hrs').text(s.values[i] + " home runs")
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null).attr('stroke-width', 1.5);
    dot.attr("display", "none");
  }

}

const line_chart = d3.select('#chart_2')
  .append('svg')
    .attr('viewBox', [0, 0, width, height]);

line_chart.append('g')
  .call(xAxis);

line_chart.append('g')
  .call(yAxis);

const path = line_chart.append('g')
    .attr("fill", "none")
    .attr("stroke", "lightgrey")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("class", "graph")
  .selectAll("path")
  .data(data.teams)
  .join("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", d => line(d.values))
    .attr('class', d => "team " + d.id)

const record_line = line_chart.append('line')
    .attr('x1', x_line(1))
    .attr('y1', y_line(record.lineValue))
    .attr('x2', x_line(163))
    .attr('y2', y_line(record.lineValue))
    .attr('stroke-width', 1.5)
    .attr('stroke', 'lightgrey');

const avg_2018 = line_chart.append('line')
    .attr('x1', x_line(1))
    .attr('y1', y_line(0))
    .attr('x2', x_line(163))
    .attr('y2', y_line(186.16))
    .attr('stroke-width', 1.5)
    .attr('stroke', 'lightgrey');

line_chart.call(hover, path);
