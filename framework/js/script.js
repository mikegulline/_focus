//////////////////////////////////////////////////
//////////////////////////////////////////////////
// INIT
	window.onload = function(){
		lq_scroll_to_anchor.init()
		
	}
	jQuery(function() {
		lq_window.init()
		lq_pano.init()
		lq_scroll_list.init()
		lq_width_triggers.init()
	});
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// functions 
	var lq_scroll_list = {
		sticky: jQuery('.lq-scroll-list'),
		active: function(){
			return this.sticky.length
		},
		obj: [{
				y: [],
				current: 0,
				headers: jQuery('.entry-content h2')
			},{
				y: [],
				current: 0,
				headers: jQuery('.entry-content h4')
		}],
		buildArr: function(){
			var obj = this.obj
			for(i in obj){
				var y = obj[i].y = []
				obj[i].headers.each(function(){
					var t = jQuery(this)
					var pos = getPosition(t[0])
					y.push([pos.y, t])
				})
			}
		},
		evalArr: function(){
			var obj = this.obj
			for(i in obj){
				var testCurrent = obj[i].current
				for(o in obj[i].y){
					var top = obj[i].y[o][0]-50-getTop()
					if(lq_window.top()>top){
						obj[i].current = obj[i].y[o][1]
					}
				}
				if(testCurrent != obj[i].current){
					if(testCurrent.length)jQuery('[href="#'+testCurrent.attr('id')+'"]').parent().removeClass('active')
					jQuery('[href="#'+obj[i].current.attr('id')+'"]').parent().addClass('active')
				}
			}
		},
		makeMenu: function(){
			var e = this
			jQuery('.scroll-list').each(function(){
				var t = jQuery(this)
				var cnt = 1
				jQuery('.entry-content h2').each(function(){
					var h2 = jQuery(this)
					var h4 = ''
					var token = h2.text().toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/--/g, '-')+'-'+rand()
					h2.attr({'id': token, 'class': 'list-entry'}).prepend(cnt+') ')
					h2.nextUntil('h2').each(function(){
						var e = jQuery(this)
						if(e.prop('tagName')=='H4'){
							var token2 = e.text().toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/--/g, '-')+'-'+rand()
							e.attr({'id': token2, 'class': 'list-entry-sub'})
							h4 += '<li><a href="#'+token2+'">'+e.text()+'</a></li>'
						}
					})
					t.append('<li><a href="#'+token+'">'+h2.text()+'</a>'+(h4?'<ul>'+h4+'</ul>':'')+'</li>')
					cnt++
				})
			})
		},
		loop: function(){
			var e = this
			jQuery(lq_window.w).bind('load scroll '+ ori(), function(event){
				e.evalArr()
				e.makeSticky()
			});
		},
		resetWidth: function(){
			this.sticky.removeClass('stick').attr({'style': ''})
			this.makeSticky()
		},
		makeSticky: function(){
			if(this.active()){
				var top = this.sticky[0].getBoundingClientRect().top+getTop()
				if(lq_window.top()<=top){
					if(this.sticky.hasClass('stick')){
						this.sticky.removeClass('stick').attr({'style': ''})
					}
				}else{
					if(!this.sticky.hasClass('stick')){
						this.sticky.attr({'style': 'top: '+(getTop())+'px;width: '+this.sticky.width()+'px;'}).addClass('stick')
					}
				}
			}
		},
		init: function(){
			if(this.active()){
				this.buildArr()
				this.makeMenu()
				this.loop()
			}
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
				if(toggle.hasClass('active menu')){
					toggle.removeClass('active')
					testEvent.removeClass('on')
				}else{
					jQuery('.menu.active').removeClass('active')
					jQuery('.on').removeClass('on')
					toggle.addClass('active')
					testEvent.addClass('on')
				}
			}else{
				var testEvent = jQuery(event.target).closest('.menu.active')
				if(!testEvent.length){
					jQuery('.menu.active').removeClass('active')
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
			var uf = ori()
			var bod = jQuery('body')
			jQuery(lq_window.w).bind('load '+ uf, function(event){
				var testClasses = bod.attr('class')
				var w = lq_window.width()
				var classes = 'w1400 w1200 w1024 w960 w768 w480 w320 mobile desktop'
				if(w>=bod.attr('data-max-width'))bod.removeClass(classes).addClass('w'+bod.attr('data-max-width')+' desktop')
				else if(w>=1400) bod.removeClass(classes).addClass('w1400 desktop')
				else if(w>=1200) bod.removeClass(classes).addClass('w1200 desktop')
				else if(w>=1024) bod.removeClass(classes).addClass('w1024 desktop')
				else if(w>=960) bod.removeClass(classes).addClass('w960 desktop')
				else if(w>=768) bod.removeClass(classes).addClass('w768 desktop')
				else if(w>=480) bod.removeClass(classes).addClass('w480 mobile')
				else if(w>=320) bod.removeClass(classes).addClass('w320 mobile')	
				
				if(testClasses != bod.attr('class')) {
					lq_pano.init()
					lq_scroll_list.buildArr()
					lq_scroll_list.resetWidth()
				}
			});
		},
	};
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
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// HELPERS
	var cnt = {
		x: 0,
		get: function(){
			this.x++
			return this.x
		}
	}
	var getTop = function(){
		var h = parseInt(jQuery('html').css('margin-top'))
		jQuery('.menu-fix >').each(function(){
			h += parseInt(jQuery(this).attr('data-height'))
		})
		return h
	}
	var getPosition = function(element) {
		var xPosition = 0;
		var yPosition = 0;
	  
		while(element) {
			xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
			element = element.offsetParent;
		}
		return { x: xPosition, y: yPosition };
	}
	var rand = function() {
		return Math.random().toString(36).substr(8); // remove `0.`
	};
	function ori(){
		var ua = navigator.userAgent;
		var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua) || /iPod/i.test(ua);
		var uf = 'resize'
		if(isiPad) uf = 'orientationchange';	
		return uf;
	}
	var lq_window = {
		init: function(){
			this.w = window,
			this.d = document,
			this.e = this.d.documentElement,
			this.g = this.d.getElementsByTagName('body')[0];
		},
		top: function(){
			return (this.w.pageYOffset || this.e.scrollTop)  - (this.e.clientTop || 0);
		},
		height: function(){
			return this.w.innerHeight|| this.e.clientHeight|| this.g.clientHeight;
		}, 
		width: function(){
			return this.w.innerWidth || this.e.clientWidth || this.g.clientWidth
		}
	}
