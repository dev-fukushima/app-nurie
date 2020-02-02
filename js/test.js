(function($){
$(function(){
	var DrawTool = {} || DrawTool;

      DrawTool.loadsvg = function(svgurl){
        var d = new $.Deferred;
        $('#dom').load(svgurl,function(){
          d.resolve();
        })
        return d.promise();
      }
	alert('test');
});
})(jQuery);
