jQuery(function() {
	lq_init.init()
});
window.onload = function(){
	scrollTo(0, 1)
}
var lq_init = {
	init: function(){
		var widthTest = jQuery('#wrapper')
		var widthCur = 0
		var ua = navigator.userAgent;
		var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPod/i.test(ua);
		var userFunction = 'resize'
		if(isiPad) userFunction = 'orientationchange';	
		jQuery(window).bind('load '+ userFunction, function(event){
			if(widthCur != widthTest.width()){
				widthCur = widthTest.width()
				lq_init.colheight()
				console.log(widthCur)
			}
		});
	},
	colheight : function() { 
		var th = 0
		var h = 0;
		var obj = jQuery('#container > section, #container > aside')
		obj.each(function(){
			var t = jQuery(this)
			t.height('auto')
			th = t.height()
			if(th > h){h = th}
		});	
		obj.each(function(){
			t = jQuery(this)
			if(jQuery('#container > aside').css('position')!='absolute'){
				t.height('auto')
			}else{
				t.height(h)
			}
		})
		
	}
};