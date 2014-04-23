jQuery(function() {
	lq_width_triggers.init()
	jQuery('#menu').stickyMenu()
	jQuery('.menu-sub-top').stickyMenu()
});
window.onload = function(){
	scrollTo(0, 1)
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
		var htmlMarginTop = parseInt(html.css('margin-top'))
		var m = jQuery('.menu-fix')
		this.each(function(){
			var menu = jQuery(this)
			var menuY = Math.floor(menu.position().top-htmlMarginTop)
			var on = 0
			var sticky = menu.clone().prependTo(m)
			win.bind('load scroll '+ uf, function(event){
				m.css('top', html.css('margin-top'))
				if(win.scrollTop()<=menuY-5){
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