/*
(int) w
(ing) h
*/
(function($){$.fn.touchevent=function(config){
	var o = $.extend({},$.fn.touchevent.defaults,config),
	t = $(this),
	ul = t.find('ul'),
	li = ul.find('li'),
	len = li.length,
	startX,startY,moveX,moveY,SENSOR = 30,
	tmp,flgy = false,counter = 0,
	w = o.w||t.width(),h=o.h||t.height(),
	nowx,endX=0,flgx =0,mw=o.mw,mh=o.mh;
	
	ul.css({'width':(parseInt(w)*len)+'px','padding':0,'margin':0,'list-style-type':'none','float':'left','top':'0px','left':'0px','position':'absolute'});
	ul.height(h);li.width(w);li.height(h);
	li.css({'float':'left','margin':0,'padding':0,'text-align':'center'});
	w = mw || w;
	h = mh || h;
	t.css({'width':w+'px','position':'relative','overflow':'hidden','height':h+'px'});
	
	ul[0].addEventListener("touchstart", touchHandler, false);
	ul[0].addEventListener("touchmove", touchHandler, false);
	ul[0].addEventListener("touchend", touchHandler, false);
	ul[0].addEventListener("scroll", touchHandler, false);
	
	function touchHandler(e){
		var touch = e.touches[0];
		
		if(e.type=='touchstart'){

			startX = touch.pageX;
			startY = touch.pageY;
			flgx = 0;tmp = 0;flgy = false;moveY=0;
		}
		if(e.type == 'touchmove'){
			moveX = (touch.pageX+endX)-(startX);
			moveY = touch.pageY-startY;
			flgx = touch.pageX-startX;
			if(flgx < -SENSOR || flgx > SENSOR){e.preventDefault();
				
			}
			if(moveY < -10 || moveY > 10 && flgx > -1 * SENSOR && flgx < SENSOR){
			
			};
			
			$(e.currentTarget).css({'left':moveX+'px'});
		}
		if(e.type == 'touchend'){
			
			if(flgx > 100) {counter = (1 > counter)?0:counter-=1;
			}else if(flgx < -100) {
				counter = (len-1 > counter)? counter +=1:len-1;
			};
			
			if(flgx > -2 && flgx < 2){
				var link = $(e.target).attr('href')||$(e.target).find('map area').attr('href');
				if(link){window.location.href=link};
			}
			
			endX = -w * counter;
			
			ul.css({'left':(moveX)+'px'}).stop(true,true).animate({'left':endX+'px'},{durration:'fast',complete:function(){flgx =0;moveX = endX;}});
			
		}
	}

};

$.fn.touchevent.defaults={w:'',h:'',mw:'',mh:''};
})(jQuery);