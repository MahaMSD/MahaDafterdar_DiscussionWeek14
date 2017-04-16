$(document).ready(function() {
	/* ------------------- home ------------------ */
	//parallax - slider 
	var slideStart;

  	function startSlide() {
    	slideStart = setInterval(slideShow, 7000);
  	};

  	function slideShow() {
    	var slideCurrent = $('.slide-active');
    	var slideNext = slideCurrent.next();
    	var dotCurrent = $('li.active');
    	var dotNext = dotCurrent.next();

    	if (slideNext.length == 0) {
      		slideNext = $('.slide').first();
      		dotNext = $('.slide-indicator li').first();
   	 	}

    	var slideIndex = slideNext.index();

    	$('.slide').css({
      		'transform': 'translate(-' + (slideIndex) * 100 + '%)'
    	});

    	$('.slide').removeClass('slide-active');
    	slideNext.addClass('slide-active');

    	var captionNext = slideNext.find('.caption');

    	$('.slide-indicator li').removeClass('active');
    	dotNext.addClass('active');
    
  	};

  	function parallaxX() {
    	var scrollTop = window.pageYOffset

    	$(window).on('scroll resize', function() {
      		scrollTop = window.pageYOffset;
    	});

    	$('.slide').each(function() {
      		var parallaxImage = $(this);
      		var parallaxOffset = parallaxImage.offset().top;
      		var yPos;
      		var coords;

      		$(window).on('scroll resize', function() {
        		yPos = -(parallaxOffset - scrollTop) / 2;
        		coords = '50% ' + yPos + 'px';

        		parallaxImage.css({
          			backgroundPosition: coords
        		});
      		});
    	});
  	};
  // function siteNav() {

  //   $(".nav-menu").on("click", function() {
  //     $("body").animate({
  //       'right': '320'
  //     });
  //     $(".nav-container").animate({
  //       'right': '0'
  //     });
  //     $("<div class=\"nav-wrapper\"></div>").appendTo("body");
  //   });
    
  //   $(".close-button").on("click", buttonClose);
  //   $("body").on("click", '.nav-wrapper', buttonClose);
    
  //   function buttonClose() {
  //     $(".nav-wrapper").remove();
  //     $(".caret").removeClass("open");
  //     $(".dropdown-nav").slideUp();
  //     $("body").animate({
  //       'right': '0'
  //     });
  //     $(".nav-container").animate({
  //       'right': '-100%'
  //     });
  //   }
    
  //   $(".dropdown-container a").on("click", function(){
  //     $(this).children(".caret").toggleClass("open");
  //     $(this).next(".dropdown-nav").slideToggle(300);
  //   });
    
  // };

  $('.slide-indicator li').on('click', function() {

    clearInterval(slideStart);
    var goToSlide = $(this).index();

    $('.slide-indicator li').removeClass('active');
    $('.slide').removeClass('slide-active');
    $('.slide').eq(goToSlide).addClass('slide-active');
    $(this).addClass('active');

    $('.slide').css({
      'transform': 'translate(-' + (goToSlide) * 100 + '%)'
    });
    startSlide();
  });

  startSlide();
  parallaxX();
  // siteNav(); 

  //horizontal accordion 
  var activeSlide = $('.accordion li:first');
  $(activeSlide).addClass('active');
  $('.accordion li').hover(function() {
      $(activeSlide).animate({width: '200px'}, {duration: 'slow', queue: false});
      $(this).animate({width: '500px'}, {duration: 'slow', queue: false});
    activeSlide = this;
    }
  )
  


});

/* ------------------------ history timeline ---------------------- */
// SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

/* --- back to top button --- */
var $backToTop = $('.back-to-top');
$backToTop.hide();


$(window).on('scroll', function() {
  if ($(this).scrollTop() > 100) {
    $backToTop.fadeIn();
  } else {
    $backToTop.fadeOut();
  }
});

$backToTop.on('click', function(e) {
  $('html, body').animate({scrollTop: 0}, 500);
});

/* ------------------------ history02 timeline ---------------------- */
/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

jQuery.fn.timelinr = function(options){
  // default plugin settings
  settings = jQuery.extend({
    orientation:        'horizontal',   // value: horizontal | vertical, default to horizontal
    containerDiv:         '#timeline',    // value: any HTML tag or #id, default to #timeline
    datesDiv:           '#dates',     // value: any HTML tag or #id, default to #dates
    datesSelectedClass:     'selected',     // value: any class, default to selected
    datesSpeed:         'normal',     // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
    issuesDiv:          '#issues',      // value: any HTML tag or #id, default to #issues
    issuesSelectedClass:    'selected',     // value: any class, default to selected
    issuesSpeed:        'fast',       // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
    issuesTransparency:     0.2,        // value: integer between 0 and 1 (recommended), default to 0.2
    issuesTransparencySpeed:  500,        // value: integer between 100 and 1000 (recommended), default to 500 (normal)
    prevButton:         '#prev',      // value: any HTML tag or #id, default to #prev
    nextButton:         '#next',      // value: any HTML tag or #id, default to #next
    arrowKeys:          'false',      // value: true | false, default to false
    startAt:          1,          // value: integer, default to 1 (first)
    autoPlay:           'false',      // value: true | false, default to false
    autoPlayDirection:      'forward',      // value: forward | backward, default to forward
    autoPlayPause:        2000        // value: integer (1000 = 1 seg), default to 2000 (2segs)
  }, options);

  $(function(){
    // setting variables... many of them
    var howManyDates = $(settings.datesDiv+' li').length;
    var howManyIssues = $(settings.issuesDiv+' li').length;
    var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
    var currentIssue = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);
    var widthContainer = $(settings.containerDiv).width();
    var heightContainer = $(settings.containerDiv).height();
    var widthIssues = $(settings.issuesDiv).width();
    var heightIssues = $(settings.issuesDiv).height();
    var widthIssue = $(settings.issuesDiv+' li').width();
    var heightIssue = $(settings.issuesDiv+' li').height();
    var widthDates = $(settings.datesDiv).width();
    var heightDates = $(settings.datesDiv).height();
    var widthDate = $(settings.datesDiv+' li').width();
    var heightDate = $(settings.datesDiv+' li').height();
    // set positions!
    if(settings.orientation == 'horizontal') {  
      $(settings.issuesDiv).width(widthIssue*howManyIssues);
      $(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);
      var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
    } else if(settings.orientation == 'vertical') {
      $(settings.issuesDiv).height(heightIssue*howManyIssues);
      $(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);
      var defaultPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
    }
    
    $(settings.datesDiv+' a').click(function(event){
      event.preventDefault();
      // first vars
      var whichIssue = $(this).text();
      var currentIndex = $(this).parent().prevAll().length;
      // moving the elements
      if(settings.orientation == 'horizontal') {
        $(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
      } else if(settings.orientation == 'vertical') {
        $(settings.issuesDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false, duration:settings.issuesSpeed});
      }
      $(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false, duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);
      // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
      if(howManyDates == 1) {
        $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
      } else if(howManyDates == 2) {
        if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.prevButton).fadeOut('fast');
          $(settings.nextButton).fadeIn('fast');
        } 
        else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.nextButton).fadeOut('fast');
          $(settings.prevButton).fadeIn('fast');
        }
      } else {
        if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.nextButton).fadeIn('fast');
          $(settings.prevButton).fadeOut('fast');
        } 
        else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.prevButton).fadeIn('fast');
          $(settings.nextButton).fadeOut('fast');
        }
        else {
          $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
        } 
      }
      // now moving the dates
      $(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);
      $(this).addClass(settings.datesSelectedClass);
      if(settings.orientation == 'horizontal') {
        $(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
      } else if(settings.orientation == 'vertical') {
        $(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false, duration:'settings.datesSpeed'});
      }
    });

    $(settings.nextButton).bind('click', function(event){
      event.preventDefault();
      // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
      var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
      if(settings.orientation == 'horizontal') {
        var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
        var currentIssueIndex = currentPositionIssues/widthIssue;
        var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
        var currentIssueDate = currentPositionDates-widthDate;
        if(currentPositionIssues <= -(widthIssue*howManyIssues-(widthIssue))) {
          $(settings.issuesDiv).stop();
          $(settings.datesDiv+' li:last-child a').click();
        } else {
          if (!$(settings.issuesDiv).is(':animated')) {
            // bugixed from 0.9.52: now the dates gets centered when there's too much dates.
            $(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
          }
        }
      } else if(settings.orientation == 'vertical') {
        var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
        var currentIssueIndex = currentPositionIssues/heightIssue;
        var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
        var currentIssueDate = currentPositionDates-heightDate;
        if(currentPositionIssues <= -(heightIssue*howManyIssues-(heightIssue))) {
          $(settings.issuesDiv).stop();
          $(settings.datesDiv+' li:last-child a').click();
        } else {
          if (!$(settings.issuesDiv).is(':animated')) {
            // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
            $(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');
          }
        }
      }
      // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
      if(howManyDates == 1) {
        $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
      } else if(howManyDates == 2) {
        if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.prevButton).fadeOut('fast');
          $(settings.nextButton).fadeIn('fast');
        } 
        else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.nextButton).fadeOut('fast');
          $(settings.prevButton).fadeIn('fast');
        }
      } else {
        if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.prevButton).fadeOut('fast');
        } 
        else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.nextButton).fadeOut('fast');
        }
        else {
          $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
        } 
      }
    });

    $(settings.prevButton).click(function(event){
      event.preventDefault();
      // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
      var currentIndex = $(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();
      if(settings.orientation == 'horizontal') {
        var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));
        var currentIssueIndex = currentPositionIssues/widthIssue;
        var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));
        var currentIssueDate = currentPositionDates+widthDate;
        if(currentPositionIssues >= 0) {
          $(settings.issuesDiv).stop();
          $(settings.datesDiv+' li:first-child a').click();
        } else {
          if (!$(settings.issuesDiv).is(':animated')) {
            // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
            $(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
          }
        }
      } else if(settings.orientation == 'vertical') {
        var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));
        var currentIssueIndex = currentPositionIssues/heightIssue;
        var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));
        var currentIssueDate = currentPositionDates+heightDate;
        if(currentPositionIssues >= 0) {
          $(settings.issuesDiv).stop();
          $(settings.datesDiv+' li:first-child a').click();
        } else {
          if (!$(settings.issuesDiv).is(':animated')) {
            // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
            $(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');
          }
        }
      }
      // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
      if(howManyDates == 1) {
        $(settings.prevButton+','+settings.nextButton).fadeOut('fast');
      } else if(howManyDates == 2) {
        if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.prevButton).fadeOut('fast');
          $(settings.nextButton).fadeIn('fast');
        } 
        else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {
          $(settings.nextButton).fadeOut('fast');
          $(settings.prevButton).fadeIn('fast');
        }
      } else {
        if( $(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.prevButton).fadeOut('fast');
        } 
        else if( $(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {
          $(settings.nextButton).fadeOut('fast');
        }
        else {
          $(settings.nextButton+','+settings.prevButton).fadeIn('slow');
        } 
      }
    });
    // keyboard navigation, added since 0.9.1
    if(settings.arrowKeys=='true') {
      if(settings.orientation=='horizontal') {
        $(document).keydown(function(event){
          if (event.keyCode == 39) { 
               $(settings.nextButton).click();
            }
          if (event.keyCode == 37) { 
               $(settings.prevButton).click();
            }
        });
      } else if(settings.orientation=='vertical') {
        $(document).keydown(function(event){
          if (event.keyCode == 40) { 
               $(settings.nextButton).click();
            }
          if (event.keyCode == 38) { 
               $(settings.prevButton).click();
            }
        });
      }
    }
    // default position startAt, added since 0.9.3
    $(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');
    // autoPlay, added since 0.9.4
    if(settings.autoPlay == 'true') { 
      setInterval('autoPlay()', settings.autoPlayPause);
    }
  });
};

// autoPlay, added since 0.9.4
function autoPlay(){
  var currentDate = $(settings.datesDiv).find('a.'+settings.datesSelectedClass);
  if(settings.autoPlayDirection == 'forward') {
    if(currentDate.parent().is('li:last-child')) {
      $(settings.datesDiv+' li:first-child').find('a').trigger('click');
    } else {
      currentDate.parent().next().find('a').trigger('click');
    }
  } else if(settings.autoPlayDirection == 'backward') {
    if(currentDate.parent().is('li:first-child')) {
      $(settings.datesDiv+' li:last-child').find('a').trigger('click');
    } else {
      currentDate.parent().prev().find('a').trigger('click');
    }
  }
}

/* ------------------------ game quiz buzzfeed ---------------------- */
// Quiz result options in a separate object for flexibility
var resultOptions = [
    {   title: 'You Are This Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are That Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are This Other Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are This One Thing',
        desc: '<p>...</p>'},
    {   title: 'You Are A Type Of Thing',
        desc: '<p>...</p>'}
];
    
// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer');
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                value = $this.attr('data-quizIndex'),
                answerScore = parseInt(value);
            // check to see if an answer was previously selected
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                // handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length){
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');
        
        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        // incrementally increase the possible score, starting at the minScore, until totalScore falls into range. then match that increment index (number of times it took to get totalScore into range) and return the corresponding index results from resultOptions object
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                resultsTitle.replaceWith('<h1>' + resultOptions[n].title + '</h1>');
                resultsDesc.replaceWith('<p class=\'desc\'>' + resultOptions[n].desc + '</p>');
                return;
            } else {
                n++;
            }
        }
    }
}