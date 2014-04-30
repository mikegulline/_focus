/*
//
// fires from framework/customize/_init.php
//
jQuery(function() {
	lq_width_triggers.init()
	jQuery('.menu-sub-top').stickyMenu()
	jQuery('#menu').stickyMenu()
	scrollTo(0, 1)
});
*/
window.onload = function(){
	lq_scroll_to_anchor.init()
}
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
		var obj = jQuery('#container > section, #container > aside')
		var objCheck = jQuery('#container > aside')
		jQuery(window).bind('load '+ uf, function(event){
			if(widthCur != widthTest.width()){
				widthCur = widthTest.width()
				lq_width_triggers.colheight(obj, objCheck)
			}
		});
	},
	colheight : function(o, oc) { 
		var th = 0
		var h = 0;
		o.each(function(){
			var t = jQuery(this)
			t.height('auto')
			th = t.height()
			if(th > h){h = th}
		});	
		o.each(function(){
			t = jQuery(this)
			if(oc.css('position')!='absolute'){
				t.height('auto')
			}else{
				t.height(h)
			}
		})
		
	}
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