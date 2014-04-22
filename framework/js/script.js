jQuery(function() {
	lq_width_triggers.init()
	lq_menu_sticky.init()
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
var lq_menu_sticky = {
	init: function(){
		var win = jQuery(window)
		var uf = ori()
		var html = jQuery('html') 
		var htmlMarginTop = parseInt(html.css('margin-top'))
		var menu = jQuery('#menu')
		var menuY = menu.position().top-htmlMarginTop
		var on = 0
		var sticky = menu.clone().prependTo('.menu-fix')
		var m = jQuery('.menu-fix')
		win.bind('load scroll '+ uf, function(event){
			if(win.scrollTop()<menuY){
				if(on){
					m.removeClass('show').css('top', 0)
					on = 0
				}
			}else{
				if(!on){
					m.addClass('show').css('top', html.css('margin-top'))
					on = 1
				}
			}
		});
	}
};
function ori(){
	var ua = navigator.userAgent;
	var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPod/i.test(ua);
	var uf = 'resize'
	if(isiPad) uf = 'orientationchange';	
	return uf;
}