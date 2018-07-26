

var timerJavascript = true;
$(document).ready(function(e){
                var canvasTracers = $("#linuxTracersAnim");
                var contextTracers = canvasTracers.get(0).getContext("2d");
                var canvasWidthTracers = canvasTracers.width();
                var canvasHeightTracers = canvasTracers.height(); 

		resizeCanvasJTAG();
        	$(window).resize(resizeCanvasJTAG);


		function drawTracersProfilersScene(){

 		}

                function resizeCanvasJTAG(){
                    if(timerJavascript)
                        clearTimeout(timerJavascript);
                    canvasTracers.attr("width",$(window).get(0).innerWidth - 200);
                    canvasWidthTracers = canvasTracers.width();
                    canvasHeightTracers = canvasTracers.height();
                    

		    
                    drawTracersProfilersScene();
                                        
                }

});
