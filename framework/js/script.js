window.onload = function(){
	lq_scroll_to_anchor.init()
	
}
jQuery(function() {
	jQuery(document).on("click",function (event) {
		var testEvent = jQuery(event.target).closest('.toggle')
		// clicking on a toggle
		if(testEvent.length){
			event.preventDefault()
			var toggle = jQuery('.'+testEvent.attr('data-target'))
			if(toggle.hasClass('active')){
				toggle.removeClass('active')
				testEvent.removeClass('on')
			}else{
				jQuery('.active').removeClass('active')
				jQuery('.on').removeClass('on')
				toggle.addClass('active')
				testEvent.addClass('on')
			}
		}else{
			var testEvent = jQuery(event.target).closest('.active')
			if(!testEvent.length){
				jQuery('.active').removeClass('active')
				jQuery('.on').removeClass('on')
			}
		}
	});
});
var lq_scroll_to_anchor = {
	init: function(){
		if(h = window.location.hash) {
			lq_scroll_to_anchor.scrollAnimation()
		}
		jQuery('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = jQuery(this.hash);
				target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					lq_scroll_to_anchor.scrollAnimation()
					return false;
				}
			}
		});
	},
	scrollAnimation: function(){
		var padding = 30
		jQuery('.menu-fix [data-height]').each(function(){
			padding += parseInt(jQuery(this).attr('data-height'))
		})
		jQuery('html,body').animate({
			 scrollTop: jQuery(h).offset().top-parseInt(jQuery('html').css('margin-top'))-padding
		}, 1000, 'easeInOutCubic');
	}
}
var lq_width_triggers = {
	init: function(){
		var widthTest = jQuery('#wrapper')
		var widthCur = 0
		var uf = ori()
		var win = jQuery(window)
		var bod = jQuery('body')
		win.bind('load '+ uf, function(event){
			var w = win.width()
			var classes = 'w1400 w1200 w1024 w960 w768 w480 w320 mobile desktop'
			if(w>=bod.attr('data-max-width'))  bod.removeClass(classes).addClass('w'+bod.attr('data-max-width')+' desktop')
			else if(w>=1400) bod.removeClass(classes).addClass('w1400 desktop')
			else if(w>=1200) bod.removeClass(classes).addClass('w1200 desktop')
			else if(w>=1024) bod.removeClass(classes).addClass('w1024 desktop')
			else if(w>=960) bod.removeClass(classes).addClass('w960 desktop')
			else if(w>=768) bod.removeClass(classes).addClass('w768 desktop')
			else if(w>=480) bod.removeClass(classes).addClass('w480 mobile')
			else if(w>=320) bod.removeClass(classes).addClass('w320 mobile')
		});
	},
};
function ori(){
	var ua = navigator.userAgent;
	var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPod/i.test(ua);
	var uf = 'resize'
	if(isiPad) uf = 'orientationchange';	
	return uf;
}
(function($){
	$.fn.stickyMenu = function() {
		var win = jQuery(window)
		var uf = ori()
		var html = jQuery('html') 
		var m = jQuery('.menu-fix')
		this.each(function(){
			var menu = jQuery(this)
			var on = 0
			var offset = menu.height()+parseInt(menu.css('padding-top'))+parseInt(menu.css('padding-bottom'))
			var sticky = menu.clone().attr('data-height', offset).appendTo(m)
			var addPos = sticky.prev().attr('data-height')
			if(addPos) {
				sticky.attr('data-y', addPos)
				var menuY = Math.floor(menu.position().top-addPos)
			}else{
				var menuY = Math.floor(menu.position().top)
			}
			win.bind('load scroll '+ uf, function(event){
				m.css('top', html.css('margin-top'))
				if(win.scrollTop()<=menuY){
					if(on){
						sticky.removeClass('show')
						on = 0
					}
				}else if(!on){
					sticky.addClass('show')
					on = 1
				}
			});
		});
		return this;
	};
})(jQuery); 