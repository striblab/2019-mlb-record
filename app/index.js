import utils from './shared/utils.js';
import hrs from '../sources/twins_hrs.json';


utils.documentReady(() => {
  utils.environmentNoting();

});

var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({triggerElement: "#chart", duration: 0, triggerHook: .25, reverse: false})
                  .on('enter', function() {

                    var text = d3.select('.player-text');
                    var circles = d3.selectAll('.dot');

                    text.transition()
                      .tween("text", function() {
                         var selection = d3.select(this);
                         var start = d3.select(this).text();
                         var end = total;
                         var interpolator = d3.interpolateNumber(start,end);

                         return function(t) { selection.text(Math.round(interpolator(t))); }; 

                       })
                    .duration(3000);

                    circles.transition()
                      .duration(1000)
                      .delay(2000)
                        .attr('r', 6)
                        .style('fill', '#009ABC')
                        .style('opacity', 0.8);

                  })
  								.addTo(controller);

var field_width = 750;
var field_height = 750;

var data = hrs.data;

var total = data.length;

var index = d3.range(15);

var selector = d3.select('#playerSelector')
  .selectAll('option:not(#allHomeruns)')
  .data(index)
    .enter().append('option')
    .attr('value', d => d)

d3.select('#playerSelector')
  .selectAll('option:not(#allHomeruns)')
  .data(d3.map(data, d => d.player_name).keys())
    .text(d => d);

var x = d3.scaleLinear()
  .domain([0,250])
  .range([0,field_width]);

var y = d3.scaleLinear()
  .domain([0,250])
  .range([0,field_height]);

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var svg = d3.select("#chart")
  .append("svg")
    .attr('viewBox', [0, 0, field_width, field_height])

  svg.append('image')
    .attr('xlink:href', 'https://static.startribune.com/news/projects-staging/all/2019-mlb-record/assets/images/new_field.svg')
    .attr('width', field_width)
    .attr('height', field_height)
    .attr('id', 'field');

  var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', d => 'dot ' + d.player_name_d3)
    .attr('cx', d => x(d.hc_x))
    .attr('cy', d => y(d.hc_y))
    .attr('r', 0)
    .style('fill', 'lightgrey')
    .style('opacity', 0.8);

  var text = svg.append('text')
      .text(0)
      .attr('class', 'player-text')
      .attr('x', field_width / 2)
      .attr('y', field_height * .45)
      .attr('text-anchor', 'middle');

  svg.append('text')
      .text('TWINS 2019 HRs')
      .attr('class', 'of-total')
      .attr('x', field_width / 2)
      .attr('y', field_height * .47)
      .attr('text-anchor', 'middle');

  var update = function(index) {

    var hr_by_player = d3.nest()
    .key(d => d.player_name_d3)
    .key(d => d.player_name)
    .rollup(function(d) {
      return {
        value: d.length,
      };
    })
    .entries(data);

    var total = data.length;

    if (index === 'allHomeruns') {

      d3.selectAll('.player').attr('style', 'display:none');
      d3.select('.player-text').remove();
      d3.select('.of-total').remove();

      d3.selectAll('.dot')
        .transition()
        .duration(550)
        .style('fill', '#009ABC')
        .attr('r', 6)

      svg.append('text')
        .text(total)
        .attr('class', 'player-text')
        .attr('x', field_width / 2)
        .attr('y', field_height * .45)
        .attr('text-anchor', 'middle');

      svg.append('text')
        .text('TWINS 2019 HRs')
        .attr('class', 'of-total')
        .attr('x', field_width / 2)
        .attr('y', field_height * .47)
        .attr('text-anchor', 'middle');

    }

    else {

      var player_d3 = hr_by_player[index].key;
      var player_name = hr_by_player[index].values[0].key;
      var home_runs = hr_by_player[index].values[0].value.value;

      d3.selectAll(".dot")
      .transition()
      .duration(550)
      .style("fill", "lightgrey")
      .attr("r", 3)

      d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
          this.parentNode.appendChild(this);
        });
      };

      d3.selectAll('.player').attr('style', 'display:none');
      d3.select('.player-text').remove()
      d3.select('.of-total').remove()

      d3.selectAll(".dot")
        .transition()
        .duration(550)
        .style("fill", "lightgrey")
        .attr("r", 3)

      d3.selectAll(".dot." + player_d3)
        .moveToFront()
        .transition()
        .duration(550)
        .style("fill", '#009ABC')
        .attr("r", 6)
        .style('opacity', 0.8)
        .style('stroke', 'none')

      svg.append('text')
        .text(home_runs)
        .attr('class', 'player-text')
        .attr('x', field_width / 2)
        .attr('y', field_height * .45)
        .attr('text-anchor', 'middle');

      svg.append('text')
        .text('OF ' + total +  ' HRs')
        .attr('class', 'of-total')
        .attr('x', field_width / 2)
        .attr('y', field_height * .47)
        .attr('text-anchor', 'middle');

      d3.selectAll('#' + player_d3).attr('style', 'display:block');

    }

  }

  d3.select('#playerSelector')
    .on('change', function(d) {
      var index = d3.select(this).property('value');
      update(index);
  })
