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

(function($) { "use strict";

	$(document).ready(function(){"use strict";
		
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
		
	});
	
})(jQuery); 

function setCurrentGroup() {
  var url = window.location.href;
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
