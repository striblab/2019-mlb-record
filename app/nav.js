$(document).ready(function() {
  var scenes = [{
    day: 'September 1',
    image: 'VikingsDay1a.jpg',
    headline: 'Defense sticks together',
    url: 'http://www.startribune.com/x/558346482',
    status: 'active'
  }, {
    day: 'September 2',
    image: 'VikingsDay2a.jpg',
    headline: 'Rookie center Garrett Bradbury',
    url: 'http://www.startribune.com/x/558349122',
    status: 'active'
  }, {
    day: 'September 3',
    image: 'VikingsDay3a.jpg',
    headline: 'Coach Mike Zimmer',
    url: 'http://www.startribune.com/x/558349152',
    status: 'active'
  }, {
    day: 'September 4',
    image: 'VikingsDay4a.jpg',
    headline: 'The brains behind new O-line',
    url: 'http://www.startribune.com/x/558349562',
    status: 'active'
  }, {
    day: 'September 5',
    image: 'VikingsDay5a.jpg',
    headline: '2019 NFL season preview',
    url: 'http://www.startribune.com/x/558349582',
    status: 'inactive'
  }, {
    day: 'September 6',
    image: 'VikingsDay6a.jpg',
    headline: 'The play-calling plan',
    url: 'http://www.startribune.com/x/558349752',
    status: 'inactive'
  }, {
    day: 'September 7',
    image: 'VikingsDay7a.jpg',
    headline: 'Special teams',
    url: 'http://www.startribune.com/x/558349812',
    status: 'inactive'
  }, {
    day: 'September 8',
    image: 'VikingsDay8a.jpg',
    headline: 'Kirk Cousins, Year 2',
    url: 'http://www.startribune.com/x/558349852',
    status: 'inactive'
  }];
  var navMarkup = '<a name="series-nav"></a><h2>2019 Vikings Preview</h2><div class="series-nav">';
  for (i = 0; i < scenes.length; i++) {
    navMarkup += '<div class="item ' + scenes[i].status + '">';
    if (scenes[i].status == 'active') {
      navMarkup += '<a href="' + scenes[i].url + '" target="_blank">';
    }
    navMarkup += '<div class="item-content"><div class="image" style="background-image: url(http://stmedia.stimg.co/' + scenes[i].image + '?&amp;fit=crop&amp;crop=faces&amp;h=500&amp;w=500);"></div><div class="text"><h4>' + scenes[i].day + '</h4><h3>' + scenes[i].headline + '</h3></div></div>';
    if (scenes[i].status == 'active') {
      navMarkup += '</a>';
    }
    navMarkup += '</div>';
  }
  navMarkup += '<h4 class="vikes-link"><a href="/vikings">Complete Vikings coverage</a></h4></div>';
  if ($('body').hasClass('large-gallery')) {
    if ($('body').hasClass('wide-body')) {
      $(".footer-nav").before(function() {
        return '<section class="series-nav-container"></section>';
      });
    } else {
      $(".copyright").before(function() {
        return '<section class="series-nav-container"></section>';
      });
    }
    $('.titles h3').html('<a href="#series-nav">2019 Minnesota Vikings</a>');
  } else {
    console.log("else WORKS!");
    $(".resizeFont").after(function() {
      return '<div class="series-nav-container"></div>';
      console.log("found resizeFont WORKS!");
    });
  }
  $('.series-nav-container').html(navMarkup);
});
