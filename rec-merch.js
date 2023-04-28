  var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      _this.done();
      Webflow.destroy();
      Webflow.ready();
      Webflow.require('ix2').init();
      setCurrentGroup();
    });
  }
});

Barba.Pjax.getTransition = function() {
  return FadeTransition;
};

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
  var response = newPageRawHTML.replace(/(<\/?)html( .+?)?>/gi, '$1nothtml$2>', newPageRawHTML)
  var bodyClasses = $(response).filter('nothtml').attr('data-wf-page')
  $('html').attr('data-wf-page', bodyClasses)
});

Barba.Pjax.start();

(function($) {
	"use strict";

	const progressPath = $('.progress-wrap path')[0];
	const pathLength = progressPath.getTotalLength();

	progressPath.style.transition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = 'stroke-dashoffset 10ms linear';

	const updateProgress = () => {
		const scroll = $(window).scrollTop();
		const height = $(document).height() - $(window).height();
		const progress = pathLength - (scroll * pathLength / height);
		progressPath.style.strokeDashoffset = progress;
		
		if (scroll > 50) {
			$('.progress-wrap').addClass('active-progress');
		} else {
			$('.progress-wrap').removeClass('active-progress');
		}
	};

	$(window).on('scroll', updateProgress);
	$('.progress-wrap').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 550);
		return false;
	});
})(jQuery);


function setCurrentGroup() {
  var url = window.location.href;
  var links = document.querySelectorAll('.is--current-group');
  
  // remove the class from any other elements that have it
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove("is--current-group");
  }
  
  // add the class to the current group
  if (url.indexOf("recursos") !== -1) {
    document.getElementById("link-recursos").classList.add("is--current-group");
  }
  if (url.indexOf("integracion-visual") !== -1) {
    document.getElementById("link-integracion").classList.add("is--current-group");
  }
  if (url.indexOf("comunicacion") !== -1) {
    document.getElementById("link-comunicacion").classList.add("is--current-group");
  }
  if (url.indexOf("tutorial") !== -1) {
    document.getElementById("link-tutorial").classList.add("is--current-group");
  }
}

setCurrentGroup();
