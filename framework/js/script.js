window.onload = function(){
	lq_scroll_to_anchor.init()
	
}
// cool image pan code
jQuery(function() {
	lq_pano.init()
	lq_scroll_list.init()
});
var lq_scroll_list = {
	init: function(){
		var t = this
		jQuery('.scroll-list').each(function(){
			var t = jQuery(this)
			jQuery('.entry-content h3').each(function(){
				var h3 = jQuery(this)
				var token = h3.text().toLowerCase().replace(/ /g, '-')
				h3.prop('id', token)
				t.append('<li><a href="#'+token+'">'+h3.text()+'</a></li>')
			})
			var sticky = jQuery('#primary')
			sticky.prop('style', 'width: '+sticky.width()+'px;')
			var top = sticky[0].getBoundingClientRect()
			var top = top.top-45-jQuery('.menu-sub-top').height()-jQuery('#menu').height()-parseInt(jQuery('html').css('margin-top'))
			var win = jQuery(window)
			win.bind('load scroll '+ ori(), function(event){
				if(win.scrollTop()<=top){
					sticky.removeClass('stick')
				}else{
					sticky.addClass('stick')
				}
			});
		})
	}
}
var lq_pano = {
	init: function(){
		jQuery('.pan-frame').each(function(){
			var t = jQuery(this)
			t.before(t.html()).remove()
		})
		jQuery('.pano').each(function(){
			
			var uf 			= ori()
			var w 			= []
				w.this 		= jQuery(window)
				w.h 		= document.documentElement.clientHeight
			
			var i 			= []
				i.this 		= jQuery(this)
				i.offset		= i.this.height()*.2
				i.this.wrap('<div class="pan-frame '+i.this.attr('class')+'" style="height: '+(i.this.height()-i.offset)+'px;" />')
				
			var p 			= []
				p.this 		= i.this.parent()
				p.height 	= p.this.height()
				p.pos 		= p.this[0].getBoundingClientRect()
				p.y 		= p.pos.top
				
			if(w.h>p.y) w.h = p.y
			var compensate 	= parseInt(jQuery('html').css('margin-top'))
			var bla = jQuery('.entry-title')
			w.this.bind('load scroll '+ uf, function(event){
				var top = window.pageYOffset || document.documentElement.scrollTop
				var status = p.y-top
				if(status<w.h&&status+p.height>0){
					var len = w.h+p.height
					var percent = i.offset/len
					i.this.css('top', ((status+p.height-len)*percent)) // ((status+p.height-len)*percent) || -1*((status+p.height-len)*percent)-i.offset
				}
			});
		})
	}
}
// menu toggle code
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
// smooth scroll to anchor code
var lq_scroll_to_anchor = {
	init: function(){
		if(h = window.location.hash) {
			lq_scroll_to_anchor.scrollAnimation(h)
		}
		jQuery('a[href*=#]:not([href=#])').on('click',function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = jQuery(this.hash);
				target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					lq_scroll_to_anchor.scrollAnimation(this.hash)
					return false;
				}
			}
		});
	},
	scrollAnimation: function(h){
		var padding = 45
		jQuery('.menu-fix [data-height]').each(function(){
			padding += parseInt(jQuery(this).attr('data-height'))
		})
		jQuery('html,body').animate({
			 scrollTop: jQuery(h).offset().top-parseInt(jQuery('html').css('margin-top'))-padding
		}, 1000, 'easeInOutCubic');
	}
}
// responsive snap code and trigger
var lq_width_triggers = {
	init: function(){
		var widthTest = jQuery('#wrapper')
		var widthCur = 0
		var uf = ori()
		var win = jQuery(window)
		var bod = jQuery('body')
		win.bind('load '+ uf, function(event){
			var classes = bod.attr('class')
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
			if(classes != bod.attr('class')) lq_pano.init()
		});
	},
};
// look for iphon/ipad vs desktop
function ori(){
	var ua = navigator.userAgent;
	var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPod/i.test(ua);
	var uf = 'resize'
	if(isiPad) uf = 'orientationchange';	
	return uf;
}
// sticky menu
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