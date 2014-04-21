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
		var uf = ori()
		var html = jQuery('html') 
		var h = jQuery('#header')
		var m = jQuery('#menu')
		jQuery(window).bind('load scroll '+ uf, function(event){
			var t = jQuery(this)
			if((html.hasClass('menu-sticky')&&t.scrollTop()<400)||!html.hasClass('menu-sticky')){
				html.removeClass('menu-sticky').attr('style', '');
				var mp = parseInt(m.css('padding-top'))+parseInt(m.css('padding-bottom'))
				var my = m.position()
				var y = my.top
				
				if(y<(t.scrollTop()+parseInt(html.css('margin-top')))) {
					h.css('top', html.css('margin-top'))
					html.addClass('menu-sticky').attr('style', 'margin-top: '+Math.floor(y+m.height()+mp)+'px !important;');
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