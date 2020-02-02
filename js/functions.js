
(function($){
$(function(){

      var DrawTool = {} || DrawTool;

      DrawTool.loadsvg = function(svgurl){
        var d = new $.Deferred;
        $('#dom').load(svgurl,function(){

          $(window).on('resize orientationchange',function(){
            DrawTool.resetItemsize();
          });
          $(window).trigger('resize');
          d.resolve();
        })
        return d.promise();
      }

      DrawTool.makebtn = function(){

        var items = [{"btnsrc":"img/btn01.png","svgdata":"svg/01.svg"},
        {"btnsrc":"img/btn02.png","svgdata":"svg/02.svg"},
        {"btnsrc":"img/btn03.png","svgdata":"svg/03.svg"},
        {"btnsrc":"img/btn04.png","svgdata":"svg/04.svg"},
        {"btnsrc":"img/btn05.png","svgdata":"svg/05.svg"},
        {"btnsrc":"img/btn06.png","svgdata":"svg/06.svg"}
        ];

        var colors = [
        {'color':'#a7dbd1'},
        {'color':'#c4e6be'},
        {'color':'#b5cfe0'},
        {'color':'#cebed4'},
        {'color':'#d9d0c9'},
        {'color':'#efd25c'},
        {'color':'#62afa0'},
        {'color':'#50946c'},
        {'color':'#3d6c8b'},
        {'color':'#906d9f'},
        {'color':'#5f4f43'},
        {'color':'#e59b27'},
        {'color':'#42746a'},
        {'color':'#225c3a'},
        {'color':'#1c4057'},
        {'color':'#553562'},
        {'color':'#412e1f'},
        {'color':'#7d5d2b'},
        {'color':'#e0b173'},
        {'color':'#eaa1ba'},
        {'color':'#ec9f97'},
        {'color':'#FFFFFF'},
        {'color':''},
        {'color':''},
        {'color':'#d68148'},
        {'color':'#ce547f'},
        {'color':'#c1554a'},
        {'color':'#d4d5d5'},
        {'color':''},
        {'color':''},
        {'color':'#a6541e'},
        {'color':'#923455'},
        {'color':'#923c33'},
        {'color':'#4d5556'},
        {'color':''},
        {'color':''}
        ];

        var items_len = items.length,colors_len = colors.length,compiled = _.map(items,function(json,key){ json.key =key;json.max = items_len;json.setnum = 4; return _.template($('#itembtn').html())(json);});
        $('#itemArea').html(compiled.join(''));

        compiled = _.map(colors,function(json,key){ json.key = key;json.max = colors_len;json.setnum = 18;return _.template($('#colorbtn').html())(json);});
        $('#colorBtnArea').html(compiled.join(''));

        $('#colorBtnArea li span').each(function(){
          var col = $(this).data('color');
          $(this).css('background',col);
        });



        $('#itemArea').owlCarousel({
          loop:false,
          margin:0,
          items:1,
          autoHeight:false,
          nav:false});



        var colors_num = Math.ceil(colors.length / 20),
        Controller = function(o){
          this.startX = null;
          this.startY = null;
          this.movedX = null;
          this.movedY = null;
          this.counter = 0;
          this.flgx = null;
          this.max = o.max;
          this.movespan = $(window).width();
          this.target = o.target;
        };
        Controller.prototype = {
          'init':function(){
            var _self = this;
            $(window).on('load resize',function(){
              _self.setMoveSpan = $(window).width();
            })
          },
          'handler':function(e,target){
            var touch = e.originalEvent.changedTouches[0],
            _self = this;

            if(e.type=='touchstart'){
              _self.startX = parseInt(target.get(0).scrollLeft);

            }

            if(e.type == 'touchend'){
              var flg = parseInt(target.get(0).scrollLeft - _self.startX);
              if(Math.abs(flg) < 10) return;
              _self.flgx = (flg > 0) ? 1 : -1;
              _self.target.animate({'scrollLeft':(_self.CounterCheck(_self.flgx) * _self.movespan)},400);

            }

          },
          'CounterCheck':function(n){
            var _self = this;
            if(_self.max  < n){
              _self.counter = _self.max;
            }else if(n < 0){
              _self.counter = 0;
            }else{
              _self.counter = _self.counter + n;
            }
            return _self.counter;
          },
          'setMoveSpan':function(n){
            var _self = this;
            _self.moveSpan = n;
          }
        }


        if(colors_num > 0){
          $(window).on('resize',function(){
          var single_wid = $(window).width(),wid = colors_num * $(window).width();
          $('#colorBtnArea').width(wid);
          $('#colorBtnArea').find('ul').width(single_wid);
          });
          $(window).trigger('resize');
        }

        var controller = new Controller({max:colors_num,target:$('#colorbox')});
        controller.init();
        $('#colorbox').bind('touchstart touchend',function(e){
          controller.handler(e,$(this));
        });


      }

      DrawTool.loaddata = function(){
        var itembox = $('#itembox'),
        step1 = $('.step1'),
        step2 = $('.step2');

        itembox.find('li .item').on('click',function(){
          var parent = $(this).parent(),
          loadtarget = $(this).data('svg');
            //step1.hide();
            itembox.find('li').removeClass('selectedItem');
            parent.addClass('selectedItem');
            step2.show();
            DrawTool.loadsvg(loadtarget).then(function(){
            DrawTool.init();

          });
          return false;
        });

      }

      DrawTool.resetItemsize = function(){
          $('#dom svg').height($(window).width());
          $('#dom').css('min-height',$('#dom').width());
      }

      DrawTool.resize = function(){
        var svg = $('svg'),
        pathobj = $('path,circle,polygon'),
        rect = svg.find('rect'),
        scale = .8,
        size = 740,
        posi = (size - (size * scale)) / 2;
        svg.attr('viewBox','0 0 740 740');
        rect.attr('width',740);
        rect.attr('height',740);
        pathobj.attr('transform','matrix(.8,0,0,.8,' + posi + ',' +posi +')');
      }

      DrawTool.init = function(){

        var WIDTH = 640,
        HEIGHT = 640,
        //id = $('#dom').data('id'),
        id=$.cookie('sid'),
        downloadBtn = $('#download'),
        make = $('#make'),
        colorbox = $('#colorbox'),
        makebox = $('#makebox'),
        itembox = $('#itembox'),
        step1 = $('.step1'),
        step2 = $('.step2'),
        step3 = $('.step3'),
        ImageToBase64 = function(img, mime_type) {
            // New Canvas
            var canvas = document.createElement('canvas');
            canvas.width  = WIDTH;
            canvas.height = HEIGHT;
            // Draw Image
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0,WIDTH,HEIGHT);
            // To Base64
            return canvas.toDataURL(mime_type);

        },
        color = '',
        selectObj = '',
        pathobj = $('path,rect,circle,polygon'),
        color = '',
        picker = $('.jscolor'),
        bgcolor;

        var edit = {} || edit;

        edit.wrap = function($target){
          var selectPath = $('<rect>',{'id':'selectedPath'});
          $target.wrap(selectPath);
        }
        edit.rebuild = function (){
          if($('#selectedPath').size()) $('#selectedPath').replaceWith($('#selectedPath').html());
        }


        make.off().on('click', function() {

              $('#dom').css('opacity',0);
              //DrawTool.resize();

              var svg = $('svg').get(0),
              data = new XMLSerializer().serializeToString(svg),
              url = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(data))),
              img = $('<img>',{'class':'dlsvg',width:WIDTH,height:HEIGHT});

              background = $('rect').eq(0).css('fill');
              img.on('load',function(){
                var src = ImageToBase64($(this).get(0),'image/png');
                //var src = $(this).attr('src');

                var Render = {
                  'response':function(res){
                    //var $img = $('<img>',{'src':res.data,width:WIDTH,height:HEIGHT,'class':'makeimg','crossOrigin':'Anonymous'});
                    var $img = $('<img>',{'src':res.data,width:WIDTH,height:HEIGHT,'class':'makeimg'});

                    $('#dom').html($img);
                    if(navigator.userAgent.indexOf('Android 4.0') > -1 || navigator.userAgent.indexOf('Android 4.1') > -1 || navigator.userAgent.indexOf('Android 4.2') > -1 || navigator.userAgent.indexOf('Android 4.3') > -1){
                        var a = $('<a>',{'class':'attention','href':res.data,'text':'※保存できない場合はこちらをクリックして、リンク先画像を保存してください'});
                        $('#dom').append(a);
                    }
                    $('#dom').css('opacity',1);
                    setTimeout(function(){$('.makeimg').addClass('bounceIn animated');},400);
                    setTimeout(function(){$('.fukidashi').show().addClass('bounceIn animated');},800);
                    make.remove();
                    itembox.remove();
                    colorbox.remove();
                    step1.hide();
                    step2.hide();
                    step3.show();
                    $(window).off().on('resize orientationchange',function(){
                      DrawTool.resetItemsize();
                    });

                  }},
                  request = {
                  'url':document.URL,
                  'type':'POST',
                  'data':{
                    image:src,
                    width:WIDTH,
                    height:HEIGHT,
                    id:id,
                    background:background
                  },
                  'dataType':'json',
                  'success':function(res){
                    Render.response(res);
                  },
                  'error':function(jqXHR,textStatus,errorThrown){
                         console.log('------render error----');
                         console.log(jqXHR, textStatus, errorThrown);
                         make.remove();
                    }
                }

                $.ajax(request);
              });
              //img.get(0).setAttribute('crossOrigin','Anonymous')
              img.get(0).setAttribute('src', url);
              return false;
        });



        pathobj.off().on('click', function() {
            selectObj = $(this);
            //pathobj.css('opacity', 1);
            //selectObj.css('opacity', .5);
            pathobj.removeAttr('class');
            selectObj.attr('class','selectedpath');
            //edit.rebuild();
            //edit.wrap($(this));
            //selectedObj = String(selectObj.attr('class')).replace('pathobj ', '');
            //$('.selectedObj').text('Selected:' + selectedObj);
            //if(color) selectObj.css('fill', color);

        });
        /*ピッカーでテスト
        picker.on('change', function() {
            if (!selectObj) return;
            color = '#' + $(this).val();
            //$('.' + selectedObj).css('fill', color);
            selectObj.css('fill', color);
            pathobj.css('opacity', 1);
        });
        */

        //itembox.removeClass('active');
        makebox.addClass('active');
        colorbox.addClass('active');
        colorbox.find('li span').off().on('click',function(){
            color = $(this).data('color');
            if(!color) return false;
            if(selectObj) selectObj.css('fill', color);
            if(pathobj) pathobj.css('opacity', 1);
            colorbox.find('li span').removeClass('selected');
            $(this).addClass('selected');
            return false;
          });
    }

    DrawTool.makebtn();
    DrawTool.loaddata();


  });

})(jQuery);
