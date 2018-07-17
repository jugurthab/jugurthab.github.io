var bsr = function(x,y,width,height,color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

var socJTAG = function(x, y, width, height,color, text, colorText){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.text = text;
	this.colorText = colorText;
	
}


var streamDataUnit = function(x,y,width,height,text,color,backColor){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.color = color;
	this.backColor = backColor;
}


var timerJavascript;
var animateScene = false;

var realCPUJTag;
var realSOCJTAG;
var bsrsJTAG = new Array();
var bothInByPassVariable = 0;


var bothInExtestVariable = 0;
var bothInExtestVariableSelector = 0;

var extestBypassVariable = 0;
var extestBypassVariableSelector = 0;


var bypassExtestVariable = 0;
var bypassExtestVariableSelector = 0;
var BypassExtestData = new Array();


var ExtestData = new Array();
var ExtestBypassData = new Array();

var out1, out2, out3;
$(document).ready(function(e){
                var canvasJTAG = $("#JtagAnim");
                var contextJTAG = canvasJTAG.get(0).getContext("2d");
                var canvasWidthJTAG = canvasJTAG.width();
                var canvasHeightJTAG = canvasJTAG.height();                
                
		resizeCanvasJTAG();
        	$(window).resize(resizeCanvasJTAG);

		$("#chip").on("change",resizeCanvasJTAG);

		var startJtagAnimation = $("#playAnimationJtag");
		startJtagAnimation.on("click",function() {
			
			if(animateScene){
				animateScene = false;
				$("#playAnimationJtag").text('Start Discovery');
			
			}
			else {
				animateScene = true;
				$("#playAnimationJtag").text('Stop Discovery');
			}
				
			resizeCanvasJTAG();
			
		});


		$("#operationPerform").on("change",resizeCanvasJTAG);
		$("#operationPerformDSP").on("change",resizeCanvasJTAG);
		function drawIDCodeJTAG(){
			realIDCodeRegister = new socJTAG(canvasWidthJTAG/5,canvasHeightJTAG/2,canvasWidthJTAG/10,canvasHeightJTAG/18,"rgba(255,128,0,0.5)", "ID Code","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realIDCodeRegister.color;
			contextJTAG.fillRect(realIDCodeRegister.x, realIDCodeRegister.y, realIDCodeRegister.width, realIDCodeRegister.height);

			
			contextJTAG.fillStyle = realIDCodeRegister.colorText;
			contextJTAG.font = "15px serif";
			contextJTAG.fillText(realIDCodeRegister.text, realIDCodeRegister.x + realIDCodeRegister.width/2 - 30, realIDCodeRegister.y+15);

		}


		function drawIDCodeJTAGDSP(){
			realIDCodeRegisterDSP = new socJTAG(canvasWidthJTAG/5,canvasHeightJTAG/2,canvasWidthJTAG/10,canvasHeightJTAG/18,"rgba(255,128,0,0.5)", "ID Code","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realIDCodeRegisterDSP.color;
			contextJTAG.fillRect(realIDCodeRegisterDSP.x, realIDCodeRegisterDSP.y, realIDCodeRegisterDSP.width, realIDCodeRegisterDSP.height);

			
			contextJTAG.fillStyle = realIDCodeRegisterDSP.colorText;
			contextJTAG.font = "15px serif";
			contextJTAG.fillText(realIDCodeRegisterDSP.text, realIDCodeRegisterDSP.x + realIDCodeRegisterDSP.width/2 - 30, realIDCodeRegisterDSP.y+15);

		}


		function drawBypassJTAG(){
			realBypassRegister = new socJTAG(canvasWidthJTAG/5 + canvasWidthJTAG/70,canvasHeightJTAG/2 + 35,canvasWidthJTAG/14,canvasHeightJTAG/20,"rgba(128,128,0,0.5)", "Bypass","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realBypassRegister.color;
			contextJTAG.fillRect(realBypassRegister.x, realBypassRegister.y, realBypassRegister.width, realBypassRegister.height);

			
			contextJTAG.fillStyle = realBypassRegister.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realBypassRegister.text, realBypassRegister.x + realBypassRegister.width/2 - 23, realBypassRegister.y+15);

		}

		function drawBypassJTAGDSP(){
			realBypassRegisterDSP = new socJTAG(canvasWidthJTAG/5 + canvasWidthJTAG/70,canvasHeightJTAG/2 + 35,canvasWidthJTAG/14,canvasHeightJTAG/20,"rgba(128,128,0,0.5)", "Bypass","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realBypassRegisterDSP.color;
			contextJTAG.fillRect(realBypassRegisterDSP.x, realBypassRegisterDSP.y, realBypassRegisterDSP.width, realBypassRegisterDSP.height);

			
			contextJTAG.fillStyle = realBypassRegisterDSP.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realBypassRegisterDSP.text, realBypassRegisterDSP.x + realBypassRegisterDSP.width/2 - 23, realBypassRegisterDSP.y+15);

		}


		function connectBoundaryScanRegisterToCPU(){
			// Boundary Left Cells
			for(var i=0;i<3;i++){				 
				contextJTAG.beginPath();
				contextJTAG.moveTo(bsrsJTAG[i].x + bsrsJTAG[i].width, bsrsJTAG[i].y + bsrsJTAG[i].height/2);
				contextJTAG.lineTo(realCPUJTag.x, bsrsJTAG[i].y + bsrsJTAG[i].height/2);			

				
				
				if(i<2){
					contextJTAG.moveTo(bsrsJTAG[i].x + bsrsJTAG[i].width /2, bsrsJTAG[i].y + bsrsJTAG[i].height);
					contextJTAG.lineTo(bsrsJTAG[i+1].x + bsrsJTAG[i+1].width /2, bsrsJTAG[i+1].y);
				}
				else{
				contextJTAG.moveTo(bsrsJTAG[0].x + bsrsJTAG[0].width /2, bsrsJTAG[0].y);

				contextJTAG.lineTo(bsrsJTAG[6].x, bsrsJTAG[6].y+bsrsJTAG[6].height/2);

				
				}

				//contextJTAG.closePath();
				contextJTAG.stroke();
			}

			


			for(var i=3;i<6;i++){
				// Boundary Right Cells
				contextJTAG.beginPath();
				contextJTAG.moveTo(bsrsJTAG[i].x, bsrsJTAG[i].y + bsrsJTAG[i].height/2);
				contextJTAG.lineTo(realCPUJTag.x + realCPUJTag.width, bsrsJTAG[i].y + bsrsJTAG[i].height/2);			
				contextJTAG.closePath();
				

				if(i<5){
					contextJTAG.moveTo(bsrsJTAG[i].x + bsrsJTAG[i].width /2, bsrsJTAG[i].y + bsrsJTAG[i].height);
					contextJTAG.lineTo(bsrsJTAG[i+1].x + bsrsJTAG[i+1].width /2, bsrsJTAG[i+1].y);
				}
				/*else{
					contextJTAG.moveTo(bsrsJTAG[5].x + bsrsJTAG[i].width /2, bsrsJTAG[5].y + bsrsJTAG[5].height);
					contextJTAG.lineTo(bsrsJTAG[13].x + bsrsJTAG[13].width /2, bsrsJTAG[13].y);
				}*/

				contextJTAG.stroke();

			}

			
			for(var i=6;i<10;i++){
				// Boundary Upper Cells
				contextJTAG.beginPath();
				contextJTAG.moveTo(bsrsJTAG[i].x + bsrsJTAG[i].width/2, bsrsJTAG[i].y + bsrsJTAG[i].height);
				contextJTAG.lineTo(bsrsJTAG[i].x + bsrsJTAG[i].width/2, realCPUJTag.y);			
				
				


				if(i<9){
					contextJTAG.moveTo(bsrsJTAG[i].x+ bsrsJTAG[i].width, bsrsJTAG[i].y + bsrsJTAG[i].height/2);
					contextJTAG.lineTo(bsrsJTAG[i+1].x , bsrsJTAG[i+1].y + bsrsJTAG[i+1].height/2);
				} else{
                    contextJTAG.moveTo(bsrsJTAG[i].x+ bsrsJTAG[i].width, bsrsJTAG[i].y + bsrsJTAG[i].height/2);
					contextJTAG.lineTo(bsrsJTAG[3].x+bsrsJTAG[3].width/2 , bsrsJTAG[3].y);
                }
				contextJTAG.stroke();
				contextJTAG.closePath();
			}

			/*for(var i=10;i<14;i++){
				// Boundary Down Cells
				contextJTAG.beginPath();
				contextJTAG.moveTo(bsrsJTAG[i].x + bsrsJTAG[i].width/2, bsrsJTAG[i].y);
				contextJTAG.lineTo(bsrsJTAG[i].x + bsrsJTAG[i].width/2, realCPUJTag.y + realCPUJTag.height);	

				
				if(i<13){
					contextJTAG.moveTo(bsrsJTAG[i].x+ bsrsJTAG[i].width, bsrsJTAG[i].y + bsrsJTAG[i].height/2);
					contextJTAG.lineTo(bsrsJTAG[i+1].x , bsrsJTAG[i+1].y + bsrsJTAG[i+1].height/2);
				}
				contextJTAG.stroke();
				contextJTAG.closePath();
		
				contextJTAG.closePath();
				contextJTAG.stroke();

			}*/


			
		}



		



		function connectTapCOntrollerWithIRData(){
			// Tap to IR
			contextJTAG.lineWidth = 10;
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, realTAPJTAGCPU.y);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, canvasHeightJTAG/2 + 75 + canvasHeightJTAG/20);
			contextJTAG.closePath();
			contextJTAG.stroke();



			// Tap to Data register
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + 10, realTAPJTAGCPU.y);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + 10, canvasHeightJTAG/2 + 65);
			contextJTAG.closePath();
			contextJTAG.stroke();
			
			contextJTAG.lineWidth = 1;

		}		




		function drawDrivingSignals(){

			contextJTAG.lineWidth = 4;
			// TCK signal
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, canvasHeightJTAG - 35);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TCK", realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2 - 14, canvasHeightJTAG - 25);

			
			// TRST signal
			
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + 15, canvasHeightJTAG - 20);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + 15, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TRST", realTAPJTAGCPU.x  , canvasHeightJTAG - 10);


			// TMS signal
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15, canvasHeightJTAG - 50);
			contextJTAG.lineTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TMS", realTAPJTAGCPU.x +realTAPJTAGCPU.width -33 , canvasHeightJTAG - 38);
			





			// TDI signal
			contextJTAG.beginPath();

			contextJTAG.moveTo(realSOCJTAG.x +10, canvasHeightJTAG - 20);

			contextJTAG.lineTo(realSOCJTAG.x +10,realBypassRegister.y+realBypassRegister.height/2);			


			if($("#operationPerform").val()=="boundaryScan"){
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, canvasHeightJTAG /2);
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, bsrsJTAG[2].y+bsrsJTAG[2].height);
			} 

			else if ($("#operationPerform").val()=="bypassMode"){
				contextJTAG.lineTo(realBypassRegister.x, realBypassRegister.y+realBypassRegister.height/2);
				
			}

            else if ($("#operationPerform").val()=="IDCODE"){
				contextJTAG.lineTo(realIDCodeRegister.x, realIDCodeRegister.y+realIDCodeRegister.height/2);
				
			}
            /*
            else if ($("#operationPerform").val()=="SAMPLE"){
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, canvasHeightJTAG /2);
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, bsrsJTAG[2].y+bsrsJTAG[2].height);
				
			}

*/
			//contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TDI", realSOCJTAG.x , canvasHeightJTAG - 10);




			// TDO signal
			contextJTAG.beginPath();

			contextJTAG.moveTo(realSOCJTAG.x +realSOCJTAG.width -10, canvasHeightJTAG - 70);

			contextJTAG.lineTo(realSOCJTAG.x +realSOCJTAG.width -10, realBypassRegister.y+realBypassRegister.height/2);			



			if($("#operationPerform").val()=="boundaryScan"){
				contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, canvasHeightJTAG /2);
			contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, bsrsJTAG[5].y+bsrsJTAG[5].height);
			} 

			else if ($("#operationPerform").val()=="bypassMode"){
				contextJTAG.lineTo(realBypassRegister.x + realBypassRegister.width, realBypassRegister.y+realBypassRegister.height/2);
				
			}
            else if ($("#operationPerform").val()=="IDCODE"){
				contextJTAG.lineTo(realIDCodeRegister.x + realIDCodeRegister.width, realIDCodeRegister.y+realIDCodeRegister.height/2);
				
			}

             /*else if ($("#operationPerform").val()=="SAMPLE"){
                contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, canvasHeightJTAG /2);
			contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, bsrsJTAG[5].y+bsrsJTAG[5].height);

                }*/
			
			//contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TDO", realSOCJTAG.x +realSOCJTAG.width-20 , canvasHeightJTAG - 55);


			connectTapCOntrollerWithIRData();

			connectBoundaryScanRegisterToCPU();

		}




	function connectDrivingSignalsBetweenChips(){
			// TCK Connect
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, canvasHeightJTAG - 35);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2 + canvasWidthJTAG/2.5, canvasHeightJTAG - 35);
			contextJTAG.closePath();
			contextJTAG.stroke();


			// TMS Connect
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15, canvasHeightJTAG - 50);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + 15 + canvasWidthJTAG/2.5, canvasHeightJTAG - 50);
			contextJTAG.closePath();
			contextJTAG.stroke();


			// TDO to TDI
			contextJTAG.beginPath();
			contextJTAG.moveTo(realSOCJTAG.x +realSOCJTAG.width -10, canvasHeightJTAG - 70);
			contextJTAG.lineTo(realSOCJTAG.x +10 + canvasWidthJTAG/2.5, canvasHeightJTAG - 70);			
			contextJTAG.closePath();
			contextJTAG.stroke();

			
			// TRST
			contextJTAG.beginPath();

			contextJTAG.moveTo(realTAPJTAGCPU.x  + 15, canvasHeightJTAG - 20);

			contextJTAG.lineTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15+ canvasWidthJTAG/2.5, canvasHeightJTAG - 20)
			contextJTAG.closePath();
			contextJTAG.stroke();
		
	}	





function drawDrivingSignalsDSP(){

			contextJTAG.lineWidth = 4;
			// TCK signal
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, canvasHeightJTAG - 35);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TCK", realTAPJTAGCPU.x  + realTAPJTAGCPU.width/2 - 14, canvasHeightJTAG - 25);

			
			// TMS signal
			
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x  + 15, canvasHeightJTAG - 50);
			contextJTAG.lineTo(realTAPJTAGCPU.x  + 15, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TMS", realTAPJTAGCPU.x  , canvasHeightJTAG - 38);


			// TRST signal
			contextJTAG.beginPath();
			contextJTAG.moveTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15, canvasHeightJTAG - 20);
			contextJTAG.lineTo(realTAPJTAGCPU.x + realTAPJTAGCPU.width - 15, realTAPJTAGCPU.y + realTAPJTAGCPU.height);
			contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TRST", realTAPJTAGCPU.x +realTAPJTAGCPU.width -33 , canvasHeightJTAG - 10);
			





			// TDI signal
			contextJTAG.beginPath();

			contextJTAG.moveTo(realSOCJTAG.x +10, canvasHeightJTAG - 70);

			contextJTAG.lineTo(realSOCJTAG.x +10, realBypassRegister.y+realBypassRegister.height/2);			


			
			if($("#operationPerformDSP").val()=="boundaryScan"){
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, canvasHeightJTAG /2);
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, bsrsJTAG[2].y+bsrsJTAG[2].height);
			} 

			else if ($("#operationPerformDSP").val()=="bypassMode"){
				contextJTAG.lineTo(realBypassRegister.x, realBypassRegister.y+realBypassRegister.height/2);
				
			}

            else if ($("#operationPerformDSP").val()=="IDCODE"){
				contextJTAG.lineTo(realIDCodeRegisterDSP.x, realIDCodeRegisterDSP.y+realIDCodeRegisterDSP.height/2);
				
			} /*else if($("#operationPerformDSP").val()=="SAMPLE"){
                contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, canvasHeightJTAG /2);
				contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, bsrsJTAG[2].y+bsrsJTAG[2].height);
            }*/


			/*contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, canvasHeightJTAG /2);
			contextJTAG.lineTo(bsrsJTAG[2].x + bsrsJTAG[2].width/2, bsrsJTAG[2].y+bsrsJTAG[2].height);*/
			//contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TDI", realSOCJTAG.x , canvasHeightJTAG - 55);




			// TDO signal




			contextJTAG.beginPath();

			contextJTAG.moveTo(realSOCJTAG.x +realSOCJTAG.width -10, canvasHeightJTAG - 20);

			contextJTAG.lineTo(realSOCJTAG.x +realSOCJTAG.width -10, realBypassRegister.y+realBypassRegister.height/2);	


			if($("#operationPerformDSP").val()=="boundaryScan"){
				contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, canvasHeightJTAG /2);
			contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, bsrsJTAG[5].y+bsrsJTAG[5].height);
			} 

			else if ($("#operationPerformDSP").val()=="bypassMode"){
				contextJTAG.lineTo(realBypassRegister.x + realBypassRegister.width, realBypassRegister.y+realBypassRegister.height/2);
				
			} 
            
            else if ($("#operationPerformDSP").val()=="IDCODE"){
				contextJTAG.lineTo(realIDCodeRegisterDSP.x + realIDCodeRegisterDSP.width, realIDCodeRegisterDSP.y+realIDCodeRegisterDSP.height/2);
				
			}

	      /*  else if ($("#operationPerformDSP").val()=="SAMPLE"){
				contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, canvasHeightJTAG /2);
			contextJTAG.lineTo(bsrsJTAG[5].x + bsrsJTAG[5].width/2, bsrsJTAG[5].y+bsrsJTAG[5].height);
				
			}*/

			
			//contextJTAG.closePath();
			contextJTAG.stroke();

			contextJTAG.fillStyle = "rgb(0,0,0)";
			contextJTAG.font = "13px serif";
			contextJTAG.fillText("TDO", realSOCJTAG.x +realSOCJTAG.width-20 , canvasHeightJTAG - 10);


			connectTapCOntrollerWithIRData();

			connectBoundaryScanRegisterToCPU();

		}
		

		function drawInstructionRegisterJTAG(){

			realIRRegister = new socJTAG(canvasWidthJTAG/6 ,canvasHeightJTAG/2 + 75, canvasWidthJTAG/6,canvasHeightJTAG/20,"rgba(128,0,0,0.5)", "Instruction Register","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realIRRegister.color;
			contextJTAG.fillRect(realIRRegister.x, realIRRegister.y, realIRRegister.width, realIRRegister.height);

			
			contextJTAG.fillStyle = realIRRegister.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realIRRegister.text, realIRRegister.x + realIRRegister.width/2 - 65, realIRRegister.y+15);

		}


		function drawInstructionRegisterJTAGDSP(){

			realIRRegisterDSP = new socJTAG(canvasWidthJTAG/6 ,canvasHeightJTAG/2 + 75, canvasWidthJTAG/6,canvasHeightJTAG/20,"rgba(128,0,0,0.5)", "Instruction Register","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realIRRegisterDSP.color;
			contextJTAG.fillRect(realIRRegisterDSP.x, realIRRegisterDSP.y, realIRRegisterDSP.width, realIRRegisterDSP.height);

			
			contextJTAG.fillStyle = realIRRegisterDSP.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realIRRegisterDSP.text, realIRRegisterDSP.x + realIRRegisterDSP.width/2 - 65, realIRRegisterDSP.y+15);

		}
		

		function drawTapJTAGCPU(){

			realTAPJTAGCPU = new socJTAG(canvasWidthJTAG/8 ,canvasHeightJTAG/2 + 122, canvasWidthJTAG/4,canvasHeightJTAG/20,"rgba(128,0,128,0.5)", "TAP controller","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realTAPJTAGCPU.color;
			contextJTAG.fillRect(realTAPJTAGCPU.x, realTAPJTAGCPU.y, realTAPJTAGCPU.width, realTAPJTAGCPU.height);

			
			contextJTAG.fillStyle = realTAPJTAGCPU.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realTAPJTAGCPU.text, realTAPJTAGCPU.x + realTAPJTAGCPU.width/2 - 45, realTAPJTAGCPU.y+15);


			drawDrivingSignals();

		}

		
		function drawTapJTAGCPUDSP(){

			realTAPJTAGCPUDSP = new socJTAG(canvasWidthJTAG/8 ,canvasHeightJTAG/2 + 122, canvasWidthJTAG/4,canvasHeightJTAG/20,"rgba(128,0,128,0.5)", "TAP controller","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realTAPJTAGCPUDSP.color;
			contextJTAG.fillRect(realTAPJTAGCPUDSP.x, realTAPJTAGCPUDSP.y, realTAPJTAGCPUDSP.width, realTAPJTAGCPUDSP.height);

			
			contextJTAG.fillStyle = realTAPJTAGCPUDSP.colorText;
			contextJTAG.font = "13px serif";
			contextJTAG.fillText(realTAPJTAGCPUDSP.text, realTAPJTAGCPUDSP.x + realTAPJTAGCPUDSP.width/2 - 45, realTAPJTAGCPUDSP.y+15);


			drawDrivingSignalsDSP();

		}


		function drawSOCJTAG(){
			realSOCJTAG = new socJTAG(canvasWidthJTAG/12,canvasHeightJTAG/12,canvasWidthJTAG/3,canvasHeightJTAG/2 + 100,"rgba(255,255,0,0.5)", "SOC-1","rgba(0,0,0,0.7)");

			contextJTAG.fillStyle = realSOCJTAG.color;
			contextJTAG.fillRect(realSOCJTAG.x, realSOCJTAG.y, realSOCJTAG.width, realSOCJTAG.height);

			contextJTAG.fillStyle = realSOCJTAG.colorText;
			contextJTAG.font = "15px serif";
			contextJTAG.fillText(realSOCJTAG.text, realSOCJTAG.x + realSOCJTAG.width/2 - 20, realSOCJTAG.y+20);	


			drawFullDataRegister();

			drawCPUJTAG();	


			drawIDCodeJTAG();	

			drawBypassJTAG();

			drawInstructionRegisterJTAG();
			drawTapJTAGCPU();
			
		}


		

		function drawSOCJTAGDSP(){
			contextJTAG.translate(canvasWidthJTAG/2.5,0);
			
			realSOCJTAGDSP = new socJTAG(canvasWidthJTAG/12,canvasHeightJTAG/12,canvasWidthJTAG/3,canvasHeightJTAG/2 + 100,"rgba(255,255,0,0.5)", "SOC-2","rgba(0,0,0,0.7)");

			contextJTAG.fillStyle = realSOCJTAGDSP.color;
			contextJTAG.fillRect(realSOCJTAGDSP.x, realSOCJTAGDSP.y, realSOCJTAGDSP.width, realSOCJTAGDSP.height);

			contextJTAG.fillStyle = realSOCJTAGDSP.colorText;
			contextJTAG.font = "15px serif";
			contextJTAG.fillText(realSOCJTAGDSP.text, realSOCJTAGDSP.x + realSOCJTAGDSP.width/2 - 20, realSOCJTAGDSP.y+20);	


			

			drawDSPJTAG();	
			
			

			drawIDCodeJTAGDSP();	

			drawBypassJTAGDSP();

			drawInstructionRegisterJTAGDSP();
			drawTapJTAGCPUDSP();
			contextJTAG.translate(-canvasWidthJTAG/2.5,0);
		}



		function drawCPUJTAG(){
			 realCPUJTag = new socJTAG(canvasWidthJTAG/6,canvasHeightJTAG/5,canvasWidthJTAG/6,canvasHeightJTAG/5,"rgba(255,0,0,0.5)", "CPU","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realCPUJTag.color;
			contextJTAG.fillRect(realCPUJTag.x, realCPUJTag.y, realCPUJTag.width, realCPUJTag.height);

			
			contextJTAG.fillStyle = realCPUJTag.colorText;
			contextJTAG.font = "40px serif";
			contextJTAG.fillText(realCPUJTag.text, realCPUJTag.x + realCPUJTag.width/2 - 45, realCPUJTag.y+realCPUJTag.height/2 + 10);




			drawBoundaryScanJTAGCPU();

		}

		
		function drawDSPJTAG(){
			 realDSPJTag = new socJTAG(canvasWidthJTAG/6,canvasHeightJTAG/5,canvasWidthJTAG/6,canvasHeightJTAG/5,"rgba(255,0,0,0.5)", "DSP","rgba(255,255,255,1.0)");

			contextJTAG.fillStyle = realDSPJTag.color;
			contextJTAG.fillRect(realDSPJTag.x, realDSPJTag.y, realDSPJTag.width, realDSPJTag.height);

			
			contextJTAG.fillStyle = realDSPJTag.colorText;
			contextJTAG.font = "40px serif";
			contextJTAG.fillText(realDSPJTag.text, realDSPJTag.x + realDSPJTag.width/2 - 45, realDSPJTag.y+realDSPJTag.height/2 + 10);


			drawFullDataRegisterDSP();


			drawBoundaryScanJTAGCPU();

		}


		
		function drawBoundaryScanJTAGCPU(){
			bsrsJTAG = new Array();

			// draw left boudary scan registers
			bsrsJTAG.push(new bsr(realSOCJTAG.x + (realCPUJTag.x - realSOCJTAG.x)/3,  realCPUJTag.y,(realCPUJTag.y - realSOCJTAG.y)/3,(realCPUJTag.y - realSOCJTAG.y)/3,"rgba(255,0,255,0.5)"))

			
			bsrsJTAG.push(new bsr(bsrsJTAG[0].x,  bsrsJTAG[0].y+10 + bsrsJTAG[0].height, bsrsJTAG[0].width, bsrsJTAG[0].width,"rgba(255,0,255,0.5)"))


			bsrsJTAG.push(new bsr(bsrsJTAG[1].x,  bsrsJTAG[1].y+10 + bsrsJTAG[1].height, bsrsJTAG[1].width, bsrsJTAG[1].width,"rgba(255,0,255,0.5)"))



			// draw right boundary registers
			bsrsJTAG.push(new bsr(realSOCJTAG.x + realSOCJTAG.width - (realSOCJTAG.x + realSOCJTAG.width - realCPUJTag.x + realCPUJTag.width)/8,  realCPUJTag.y,(realCPUJTag.y - realSOCJTAG.y)/3,(realCPUJTag.y - realSOCJTAG.y)/3,"rgba(255,0,255,0.5)"))
			
			bsrsJTAG.push(new bsr(bsrsJTAG[3].x,  bsrsJTAG[3].y+10 + bsrsJTAG[3].height, bsrsJTAG[3].width, bsrsJTAG[3].width,"rgba(255,0,255,0.5)"))

			bsrsJTAG.push(new bsr(bsrsJTAG[4].x,  bsrsJTAG[4].y+10 + bsrsJTAG[4].height, bsrsJTAG[4].width, bsrsJTAG[4].width,"rgba(255,0,255,0.5)"))

			


			// draw upper boundary registers
			bsrsJTAG.push(new bsr(realCPUJTag.x, realCPUJTag.y - 25, bsrsJTAG[5].width, bsrsJTAG[5].height,"rgba(255,0,255,0.5)"))
			
			bsrsJTAG.push(new bsr(bsrsJTAG[6].x + bsrsJTAG[6].width + 10,  bsrsJTAG[6].y, bsrsJTAG[6].width, bsrsJTAG[6].width,"rgba(255,0,255,0.5)"))

			bsrsJTAG.push(new bsr(bsrsJTAG[7].x + bsrsJTAG[7].width + 10 ,  bsrsJTAG[7].y , bsrsJTAG[7].width, bsrsJTAG[7].width,"rgba(255,0,255,0.5)"))			
			
			
			bsrsJTAG.push(new bsr(bsrsJTAG[8].x + bsrsJTAG[8].width + 10 ,  bsrsJTAG[8].y , bsrsJTAG[8].width, bsrsJTAG[8].width,"rgba(255,0,255,0.5)"))


			for(var i=0;i<bsrsJTAG.length;i++){
				var bsrJTAGTmp = bsrsJTAG[i];
				contextJTAG.fillStyle = bsrJTAGTmp.color;
				contextJTAG.fillRect(bsrJTAGTmp.x, bsrJTAGTmp.y, bsrJTAGTmp.width, bsrJTAGTmp.height);

				
			}
			
		}		
		
		
		

		function drawFullDataRegister(){
			var dataRegister = new socJTAG(canvasWidthJTAG/9.5 ,canvasHeightJTAG/7, canvasWidthJTAG/3.5,canvasHeightJTAG/2,"rgba(128,0,128,0.2)", "Data register","rgba(255,255,255,1.0)");
		
			contextJTAG.fillStyle = dataRegister.color;
			contextJTAG.fillRect(dataRegister.x, dataRegister.y, dataRegister.width, dataRegister.height);
		}




		function drawFullDataRegisterDSP(){
			var dataRegisterDSP = new socJTAG(canvasWidthJTAG/9.5 ,canvasHeightJTAG/7, canvasWidthJTAG/3.5,canvasHeightJTAG/2,"rgba(128,0,128,0.2)", "Data register","rgba(255,255,255,1.0)");
		
			contextJTAG.fillStyle = dataRegisterDSP.color;
			contextJTAG.fillRect(dataRegisterDSP.x, dataRegisterDSP.y, dataRegisterDSP.width, dataRegisterDSP.height);
		}




        function bothInExtest(){
            
            
            var positionsX = new Array(realSOCJTAG.x,realSOCJTAG.x,bsrsJTAG[2].x,bsrsJTAG[1].x,bsrsJTAG[0].x,bsrsJTAG[6].x,bsrsJTAG[7].x,bsrsJTAG[8].x,bsrsJTAG[9].x);           
            var positionsY = new Array(canvasHeightJTAG - 20- bsrsJTAG[0].height/2, realBypassRegister.y,bsrsJTAG[2].y,bsrsJTAG[1].y,bsrsJTAG[0].y,bsrsJTAG[6].y,bsrsJTAG[7].y,bsrsJTAG[8].y,bsrsJTAG[9].y);
            if(bothInExtestVariableSelector==0){
                ExtestData = new Array();
                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,255)","rgb(128,128,128)"));

                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(255,0,0)","rgb(128,128,128)"));

                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,255)","rgb(128,128,128)"));

                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)"));
                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(255,0,255)","rgb(128,128,128)"));
                ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(0,0,255)","rgb(128,128,128)"));
            ExtestData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,0)","rgb(128,128,128)"));
            }
        
       // animate bits
    if(bothInExtestVariableSelector<ExtestData.length)
        for(var i=0;i<=bothInExtestVariableSelector;i++){
            if(i==bothInExtestVariableSelector){
            ExtestData[bothInExtestVariableSelector].x = positionsX[bothInExtestVariable];
                ExtestData[bothInExtestVariableSelector].y = positionsY[bothInExtestVariable];
            }
                //console.log(ExtestData.length+ "=>" + bothInExtestVariableSelector + " : " + bothInExtestVariable);
        contextJTAG.fillStyle = ExtestData[i].backcolor;
        contextJTAG.fillRect(ExtestData[i].x, ExtestData[i].y , ExtestData[i].width, ExtestData[i].height);

                contextJTAG.fillStyle = ExtestData[i].color;
	    contextJTAG.font = "15px serif";
	    contextJTAG.fillText(ExtestData[i].text, ExtestData[i].x+ExtestData[i].width/2-3, ExtestData[i].y+ExtestData[i].height/2+4);
           
                //contextJTAG.stroke();
                //bothInExtestVariableSelector++;
        }           

     else if(bothInExtestVariableSelector >= ExtestData.length && bothInExtestVariableSelector<(ExtestData.length+10)){
            contextJTAG.font = "17px serif";
            contextJTAG.fillText("Calculate result",realCPUJTag.x + realCPUJTag.width/2 - 53, realCPUJTag.y+realCPUJTag.height-17);
             bothInExtestVariableSelector++;
     }   


      else if(bothInExtestVariableSelector >= (ExtestData.length+10) && bothInExtestVariableSelector<(ExtestData.length+20)){      
    console.log("hi");

//realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)"

                 out1= new streamDataUnit(bsrsJTAG[5].x,  realCPUJTag.y,bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)");

                out2 = new streamDataUnit(bsrsJTAG[3].x,  bsrsJTAG[3].y+10 + bsrsJTAG[3].height, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,0)","rgb(128,128,128)");

                out3 = new streamDataUnit(bsrsJTAG[4].x,  bsrsJTAG[4].y+10 + bsrsJTAG[4].height, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,0,0)","rgb(128,128,128)");


                contextJTAG.fillStyle = out1.backcolor;;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);

                contextJTAG.fillStyle = out1.color;
                //contextJTAG.fillStyle = "rgb(0,0,255)";
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

               
                contextJTAG.fillStyle = out2.backcolor;
                
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                
                contextJTAG.fillStyle = out2.color;
                //contextJTAG.fillStyle = "rgb(255,255,255)";                
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = out3.backcolor;
                //contextJTAG.fillStyle = "rgb(255,255,255)";                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                

                contextJTAG.fillStyle = out3.color;
                //contextJTAG.fillStyle = "rgb(0,255,255)";                
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

            bothInExtestVariableSelector++;
      } 

            else if(bothInExtestVariableSelector >= (ExtestData.length+20) && bothInExtestVariableSelector<(ExtestData.length+30)){
                
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out2.x, out2.y , out1.width, out1.height);

                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

               
                contextJTAG.fillStyle = out2.backcolor;
                contextJTAG.fillRect(out3.x, out3.y , out2.width, out2.height);
                
                contextJTAG.fillStyle = out2.color;
                contextJTAG.fillText(out2.text, out3.x+out2.width/2-3, out3.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = out3.backcolor;
                contextJTAG.fillRect(out3.x, out3.y +30 , out3.width, out3.height);
                

                contextJTAG.fillStyle = out3.color;
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+40);
                contextJTAG.stroke();
            bothInExtestVariableSelector++;
            }

            else if(bothInExtestVariableSelector >= (ExtestData.length+30) && bothInExtestVariableSelector<(ExtestData.length+40)){
                //()","rgb(255,255,0)
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
                out1.y = realBypassRegister.y+realBypassRegister.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();                
                


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = realSOCJTAG.x +realSOCJTAG.width -10 - out2.width/2;
                out2.y = out1.y +out2.height +10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = realSOCJTAG.x +realSOCJTAG.width -10 - out3.width/2;
                out3.y = out2.y  +out3.height +10;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                contextJTAG.stroke();
                bothInExtestVariableSelector++;

            }

            else if(bothInExtestVariableSelector >= (ExtestData.length+40) && bothInExtestVariableSelector<(ExtestData.length+50) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
		                 
		out1.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x + out2.width +10;
                out2.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x + out3.width +10;
                out3.y = canvasHeightJTAG - 70 - out1.height/2;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                bothInExtestVariableSelector++;

            }

            else if(bothInExtestVariableSelector >= (ExtestData.length+50) && bothInExtestVariableSelector<(ExtestData.length+60) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +  canvasWidthJTAG/2.5;
                out1.y = canvasHeightJTAG - 90;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();


                bothInExtestVariableSelector++;

            }

            else if(bothInExtestVariableSelector >= (ExtestData.length+60) && bothInExtestVariableSelector<(ExtestData.length+70) && $('#chip').is(':checked')){
                
                //out1.x = realSOCJTAG.x +  canvasWidthJTAG/2.5;
                //out1.y = canvasHeightJTAG - 90;
		
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                //out2.x = out1.x;
                //out2.y = out1.y - out2.height - 10;

                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                //out3.x = out2.x + out3.width;
		out3.x = realSOCJTAG.x + (realCPUJTag.x - realSOCJTAG.x)/3 + canvasWidthJTAG/2.5;               
		out3.y = bsrsJTAG[2].y;

           
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
            

                bothInExtestVariableSelector++;

            }

            else if(bothInExtestVariableSelector >= (ExtestData.length+70) && bothInExtestVariableSelector<(ExtestData.length+80) && $('#chip').is(':checked')){
       
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out3.x;
                out2.y = bsrsJTAG[2].y;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();
                

                out3.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                bothInExtestVariableSelector++;

            }
            
            else if(bothInExtestVariableSelector >= (ExtestData.length+80) && bothInExtestVariableSelector<(ExtestData.length+90) && $('#chip').is(':checked')){
                out1.x = out3.x;
                out1.y = bsrsJTAG[2].y;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                //out2.x = out3.x;
                out2.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();
               

                //out3.x = out2.x + out3.width/2;
                out3.y = bsrsJTAG[0].y;

                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
                bothInExtestVariableSelector++;

            }
            
            else if(bothInExtestVariableSelector >= (ExtestData.length+90) && bothInExtestVariableSelector<(ExtestData.length+100) && $('#chip').is(':checked')){
           
                contextJTAG.font = "17px serif";
            contextJTAG.fillText("Calculate result",canvasWidthJTAG/2.5+realCPUJTag.x + realCPUJTag.width/2 - 53, realCPUJTag.y+realCPUJTag.height-17);

                bothInExtestVariableSelector++;

            }
            

            else if(bothInExtestVariableSelector >= (ExtestData.length+100) && bothInExtestVariableSelector<(ExtestData.length+110) && $('#chip').is(':checked')){
                out1.x = bsrsJTAG[3].x + canvasWidthJTAG/2.5;
                out1.y = bsrsJTAG[3].y;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();


                out2.x = out1.x;
                out2.y = bsrsJTAG[2].y;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                out3.x = out1.x;
                out3.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();


                bothInExtestVariableSelector++;

            }

         else if(bothInExtestVariableSelector >= (ExtestData.length+110) && bothInExtestVariableSelector<(ExtestData.length+120) && $('#chip').is(':checked')){

//moveTo(realSOCJTAG.x +realSOCJTAG.width -10, canvasHeightJTAG - 20);

	//		contextJTAG.lineTo(realSOCJTAG.x +realSOCJTAG.width -10, realBypassRegister.y+realBypassRegister.height/2);


                out1.x = realSOCJTAG.x + realSOCJTAG.width -10 + canvasWidthJTAG/2.5 - out1.width/2;
                out1.y = canvasHeightJTAG - 40;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();
                
                

                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                out3.x = out1.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
                

                bothInExtestVariableSelector++;
                if(bothInExtestVariableSelector>(ExtestData.length+118)){
                    bothInExtestVariable=0;
                    bothInExtestVariableSelector=0;                    
                }

            }
            
        if(!$('#chip').is(':checked')){
             if(bothInExtestVariableSelector>=(ExtestData.length+40)){
                    bothInExtestVariable=0;
                    bothInExtestVariableSelector=0;                    
                }
        }


           bothInExtestVariable++;
               //bothInExtestVariableSelector++;
            if (bothInExtestVariable == positionsX.length -bothInExtestVariableSelector){
                bothInExtestVariable=0;
                //if(bothInExtestVariableSelector<ExtestData.length)
                  bothInExtestVariableSelector++;   
            }
        }





function extestAndBypass(){
            
            
            var positionsX = new Array(realSOCJTAG.x,realSOCJTAG.x,bsrsJTAG[2].x,bsrsJTAG[1].x,bsrsJTAG[0].x,bsrsJTAG[6].x,bsrsJTAG[7].x,bsrsJTAG[8].x,bsrsJTAG[9].x);           
            var positionsY = new Array(canvasHeightJTAG - 20- bsrsJTAG[0].height/2, realBypassRegister.y,bsrsJTAG[2].y,bsrsJTAG[1].y,bsrsJTAG[0].y,bsrsJTAG[6].y,bsrsJTAG[7].y,bsrsJTAG[8].y,bsrsJTAG[9].y);
            if(extestBypassVariableSelector==0){
                ExtestBypassData = new Array();
                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,255)","rgb(128,128,128)"));

                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(255,0,0)","rgb(128,128,128)"));

                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,255)","rgb(128,128,128)"));

                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)"));
                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(255,0,255)","rgb(128,128,128)"));
                ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(0,0,255)","rgb(128,128,128)"));
            ExtestBypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,0)","rgb(128,128,128)"));
            }
   

//var extestBypassVariable = 0;
//var extestBypassVariableSelector     
       // animate bits
    if(extestBypassVariableSelector<ExtestBypassData.length)
        for(var i=0;i<=extestBypassVariableSelector;i++){
            if(i==extestBypassVariableSelector){
            ExtestBypassData[extestBypassVariableSelector].x = positionsX[extestBypassVariable];
                ExtestBypassData[extestBypassVariableSelector].y = positionsY[extestBypassVariable];
            }
                //console.log(ExtestData.length+ "=>" + bothInExtestVariableSelector + " : " + bothInExtestVariable);
        contextJTAG.fillStyle = ExtestBypassData[i].backcolor;
        contextJTAG.fillRect(ExtestBypassData[i].x, ExtestBypassData[i].y , ExtestBypassData[i].width, ExtestBypassData[i].height);

                contextJTAG.fillStyle = ExtestBypassData[i].color;
	    contextJTAG.font = "15px serif";
	    contextJTAG.fillText(ExtestBypassData[i].text, ExtestBypassData[i].x+ExtestBypassData[i].width/2-3, ExtestBypassData[i].y+ExtestBypassData[i].height/2+4);
           
  
        }           

     else if(extestBypassVariableSelector >= ExtestBypassData.length && extestBypassVariableSelector<(ExtestBypassData.length+10)){
            contextJTAG.font = "17px serif";
            contextJTAG.fillText("Calculate result",realCPUJTag.x + realCPUJTag.width/2 - 53, realCPUJTag.y+realCPUJTag.height-17);
             extestBypassVariableSelector++;
     }   


      else if(extestBypassVariableSelector >= (ExtestBypassData.length+10) && extestBypassVariableSelector<(ExtestBypassData.length+20)){      
 
                 out1= new streamDataUnit(bsrsJTAG[5].x,  realCPUJTag.y,bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)");

                out2 = new streamDataUnit(bsrsJTAG[3].x,  bsrsJTAG[3].y+10 + bsrsJTAG[3].height, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,0)","rgb(128,128,128)");

                out3 = new streamDataUnit(bsrsJTAG[4].x,  bsrsJTAG[4].y+10 + bsrsJTAG[4].height, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,0,0)","rgb(128,128,128)");


                contextJTAG.fillStyle = out1.backcolor;;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);

                contextJTAG.fillStyle = out1.color;
                //contextJTAG.fillStyle = "rgb(0,0,255)";
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

               
                contextJTAG.fillStyle = out2.backcolor;
                
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                
                contextJTAG.fillStyle = out2.color;
                //contextJTAG.fillStyle = "rgb(255,255,255)";                
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = out3.backcolor;
                //contextJTAG.fillStyle = "rgb(255,255,255)";                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                

                contextJTAG.fillStyle = out3.color;
                //contextJTAG.fillStyle = "rgb(0,255,255)";                
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

            extestBypassVariableSelector++;
      } 

            else if(extestBypassVariableSelector >= (ExtestBypassData.length+20) && extestBypassVariableSelector<(ExtestBypassData.length+30)){
                
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out2.x, out2.y , out1.width, out1.height);

                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

               
                contextJTAG.fillStyle = out2.backcolor;
                contextJTAG.fillRect(out3.x, out3.y , out2.width, out2.height);
                
                contextJTAG.fillStyle = out2.color;
                contextJTAG.fillText(out2.text, out3.x+out2.width/2-3, out3.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = out3.backcolor;
                contextJTAG.fillRect(out3.x, out3.y +30 , out3.width, out3.height);
                

                contextJTAG.fillStyle = out3.color;
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+40);
                contextJTAG.stroke();
                extestBypassVariableSelector++;
            }

            else if(extestBypassVariableSelector >= (ExtestBypassData.length+30) && extestBypassVariableSelector<(ExtestBypassData.length+40)){
                //()","rgb(255,255,0)
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
                out1.y = realBypassRegister.y+realBypassRegister.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();                
                


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = realSOCJTAG.x +realSOCJTAG.width -10 - out2.width/2;
                out2.y = out1.y +out2.height +10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = realSOCJTAG.x +realSOCJTAG.width -10 - out3.width/2;
                out3.y = out2.y  +out3.height +10;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                contextJTAG.stroke();
                extestBypassVariableSelector++;

            }

            else if(extestBypassVariableSelector >= (ExtestBypassData.length+40) && extestBypassVariableSelector<(ExtestBypassData.length+50) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
                out1.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x + out2.width +10;
                out2.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x + out3.width +10;
                out3.y = canvasHeightJTAG - 70 - out1.height/2;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                extestBypassVariableSelector++;

            }

            else if(extestBypassVariableSelector >= (ExtestBypassData.length+50) && extestBypassVariableSelector<(ExtestBypassData.length+60) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +  canvasWidthJTAG/2.5;
                out1.y = canvasHeightJTAG - 90;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();


                extestBypassVariableSelector++;

            }

            else if(extestBypassVariableSelector >= (ExtestBypassData.length+60) && extestBypassVariableSelector<(ExtestBypassData.length+70) && $('#chip').is(':checked')){
                
                out1.x = realBypassRegisterDSP.x +  canvasWidthJTAG/2.5 -out1.width-10;
                out1.y = realBypassRegisterDSP.y + 5;

                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                out2.x = realBypassRegisterDSP.x +  canvasWidthJTAG/2.5;
                out2.y = realBypassRegisterDSP.y + 5;

                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = realBypassRegisterDSP.x +  canvasWidthJTAG/2.5 + out1.width+10;
                out3.y = realBypassRegisterDSP.y + 5;

           
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
            

                extestBypassVariableSelector++;

            }

            


         else if(extestBypassVariableSelector >= (ExtestBypassData.length+70) && extestBypassVariableSelector<(ExtestBypassData.length+80) && $('#chip').is(':checked')){

                out1.x = realSOCJTAG.x + realSOCJTAG.width -10 + canvasWidthJTAG/2.5 - out1.width/2;
                out1.y = canvasHeightJTAG - 40;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();
                
                

                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                out3.x = out1.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
                

                extestBypassVariableSelector++;
                if(extestBypassVariableSelector>=(ExtestBypassData.length+80)){
                    extestBypassVariable=0;
                    extestBypassVariableSelector=0;                    
                }

            }
            
        if(!$('#chip').is(':checked')){
             if(extestBypassVariableSelector>=(ExtestBypassData.length+40)){
                    extestBypassVariable=0;
                    extestBypassVariableSelector=0;                    
                }
        }

 
           extestBypassVariable++;
            if (extestBypassVariable == positionsX.length -extestBypassVariableSelector){
                extestBypassVariable=0;
                  extestBypassVariableSelector++;   
            }
        }



        function bypassAndExtest(){
                    
                    if(bypassExtestVariableSelector==0){
                        BypassExtestData = new Array();
                        out1= new streamDataUnit(realSOCJTAG.x,  canvasHeightJTAG - 20- bsrsJTAG[0].height/2,bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,0)","rgb(128,128,128)");

                        out2 = new streamDataUnit(out1.x,  out1.y-20-out1.height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "0", "rgb(0,255,0)","rgb(128,128,128)");

                        out3 = new streamDataUnit(out2.x,  out2.y-20-out2.height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,0,0)","rgb(128,128,128)");
                        BypassExtestData.push(out1);
                        BypassExtestData.push(out2);
                        BypassExtestData.push(out3);
        
                    }

                if(bypassExtestVariableSelector<BypassExtestData.length){
                        for(var i=0;i<=bypassExtestVariableSelector;i++){
                            
              
                            contextJTAG.fillStyle = BypassExtestData[i].backcolor;
                            contextJTAG.fillRect(BypassExtestData[i].x, BypassExtestData[i].y , BypassExtestData[i].width, BypassExtestData[i].height);

                                    contextJTAG.fillStyle = BypassExtestData[i].color;
	                        contextJTAG.font = "15px serif";
	                        contextJTAG.fillText(BypassExtestData[i].text, BypassExtestData[i].x+BypassExtestData[i].width/2-3, BypassExtestData[i].y+BypassExtestData[i].height/2+4);
           
  
                        }                                              
                
                }

                

                else if(bypassExtestVariableSelector >= (BypassExtestData.length) && bypassExtestVariableSelector<(BypassExtestData.length+20)){
                
                out1.x = realBypassRegister.x -out1.width-10;
                out1.y = realBypassRegister.y + 5;

                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                out2.x = realBypassRegister.x;
                out2.y = realBypassRegister.y + 5;

                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = realBypassRegister.x + out1.width+10;
                out3.y = realBypassRegister.y + 5;

           
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
            
                bypassExtestVariableSelector++;

            }

            else if(bypassExtestVariableSelector >= (BypassExtestData.length+20) && bypassExtestVariableSelector<(BypassExtestData.length+40)){

                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
                out1.y = realBypassRegister.y+realBypassRegister.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();                
                


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = realSOCJTAG.x +realSOCJTAG.width -10 - out2.width/2;
                out2.y = out1.y +out2.height +10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = realSOCJTAG.x +realSOCJTAG.width -10 - out3.width/2;
                out3.y = out2.y  +out3.height +10;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                contextJTAG.stroke();
                

                bypassExtestVariableSelector++;
             

            }



                        else if(bypassExtestVariableSelector >= (BypassExtestData.length+40) && bypassExtestVariableSelector<(BypassExtestData.length+50) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +realSOCJTAG.width -10 - out1.width/2;
                out1.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x + out2.width +10;
                out2.y = canvasHeightJTAG - 70 - out1.height/2;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x + out3.width +10;
                out3.y = canvasHeightJTAG - 70 - out1.height/2;                
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                bypassExtestVariableSelector++;

            }

            else if(bypassExtestVariableSelector >= (BypassExtestData.length+50) && bypassExtestVariableSelector<(BypassExtestData.length+60) && $('#chip').is(':checked')){

               
                contextJTAG.fillStyle = "rgb(0,0,0)";
                out1.x = realSOCJTAG.x +  canvasWidthJTAG/2.5;
                out1.y = canvasHeightJTAG - 90;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(255,0,0)";
                out3.x = out2.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();


                bypassExtestVariableSelector++;

            }


            else if(bypassExtestVariableSelector >= (BypassExtestData.length+60) && bypassExtestVariableSelector<(BypassExtestData.length+70) && $('#chip').is(':checked')){
                
                //out1.x = realSOCJTAG.x +  canvasWidthJTAG/2.5;
                //out1.y = canvasHeightJTAG - 90;

                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                //out2.x = out1.x;
                //out2.y = out1.y - out2.height - 10;

                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                contextJTAG.fillStyle = "rgb(255,0,0)";
               // out3.x = out2.x + out3.width;
		out3.x = realSOCJTAG.x + (realCPUJTag.x - realSOCJTAG.x)/3 + canvasWidthJTAG/2.5;                
		out3.y = bsrsJTAG[2].y;

           
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
            

                bypassExtestVariableSelector++;

            }

            else if(bypassExtestVariableSelector >= (BypassExtestData.length+70) && bypassExtestVariableSelector<(BypassExtestData.length+80) && $('#chip').is(':checked')){
       
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                contextJTAG.fillStyle = "rgb(0,255,0)";
                out2.x = out3.x;
                out2.y = bsrsJTAG[2].y;
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();
                

                out3.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();

                bypassExtestVariableSelector++;

            }
            
            else if(bypassExtestVariableSelector >= (BypassExtestData.length+80) && bypassExtestVariableSelector<(BypassExtestData.length+90) && $('#chip').is(':checked')){
                out1.x = out3.x;
                out1.y = bsrsJTAG[2].y;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();

                //out2.x = out3.x;
                out2.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();
               

                //out3.x = out2.x + out3.width/2;
                out3.y = bsrsJTAG[0].y;

                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
                bypassExtestVariableSelector++;

            }
            
            else if(bypassExtestVariableSelector >= (BypassExtestData.length+90) && bypassExtestVariableSelector<(BypassExtestData.length+100) && $('#chip').is(':checked')){
           
                contextJTAG.font = "17px serif";
            contextJTAG.fillText("Calculate result",canvasWidthJTAG/2.5+realCPUJTag.x + realCPUJTag.width/2 - 53, realCPUJTag.y+realCPUJTag.height-17);

                bypassExtestVariableSelector++;

            }
            

            else if(bypassExtestVariableSelector >= (BypassExtestData.length+100) && bypassExtestVariableSelector<(BypassExtestData.length+110) && $('#chip').is(':checked')){
                out1.x = bsrsJTAG[3].x + canvasWidthJTAG/2.5;
                out1.y = bsrsJTAG[3].y;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();


                out2.x = out1.x;
                out2.y = bsrsJTAG[2].y;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();


                out3.x = out1.x;
                out3.y = bsrsJTAG[1].y;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();


                bypassExtestVariableSelector++;

            }

         else if(bypassExtestVariableSelector >= (BypassExtestData.length+110) && bypassExtestVariableSelector<(BypassExtestData.length+120) && $('#chip').is(':checked')){


                out1.x = realSOCJTAG.x + realSOCJTAG.width -10 + canvasWidthJTAG/2.5 - out1.width/2;
                out1.y = canvasHeightJTAG - 40;
                contextJTAG.fillStyle = out1.backcolor;
                contextJTAG.fillRect(out1.x, out1.y , out1.width, out1.height);
                
                contextJTAG.fillStyle = out1.color;
                contextJTAG.fillText(out1.text, out1.x+out1.width/2-3, out1.y+10);
                contextJTAG.stroke();
                
                

                out2.x = out1.x;
                out2.y = out1.y - out2.height - 10;
                contextJTAG.fillStyle = "rgb(0,255,0)";
                contextJTAG.fillRect(out2.x, out2.y , out2.width, out2.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out2.text, out2.x+out2.width/2-3, out2.y+10);
                contextJTAG.stroke();

                out3.x = out1.x;
                out3.y = out2.y - out3.height - 10;
                contextJTAG.fillStyle = "rgb(255,0,0)";
                contextJTAG.fillRect(out3.x, out3.y , out3.width, out3.height);
                contextJTAG.fillStyle = "rgb(0,0,0)";
                contextJTAG.fillText(out3.text, out3.x+out3.width/2-3, out3.y+10);
                contextJTAG.stroke();
                

                bypassExtestVariableSelector++;
                if(bypassExtestVariableSelector>(BypassExtestData.length+118)){
                    bypassExtestVariable=0;
                    bypassExtestVariableSelector=0;                    
                }

            }


         if(!$('#chip').is(':checked')){
             if(bypassExtestVariableSelector>=(BypassExtestData.length+40)){
                    bypassExtestVariable=0;
                    bypassExtestVariableSelector=0;                    
                }
        }


                  console.log(bypassExtestVariableSelector);             
            
            bypassExtestVariable++;
            if (bypassExtestVariable == 3 -bypassExtestVariableSelector){
                bypassExtestVariable=0;
                  bypassExtestVariableSelector++;   
            }


        }

        function bothInByPass(){
            var BypassData = new Array();      
            //x,y,width,height,text,color,backColor 
     
            BypassData.push(new streamDataUnit(realSOCJTAG.x ,canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height , "1", "rgb(255,255,255)","rgb(128,128,128)"));


            BypassData.push(new streamDataUnit(realSOCJTAG.x , realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));



            BypassData.push(new streamDataUnit(realSOCJTAG.x +realSOCJTAG.width/2 - bsrsJTAG[0].height/2, realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));

  
            BypassData.push(new streamDataUnit(realSOCJTAG.x +realSOCJTAG.width -bsrsJTAG[0].width , realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));


            BypassData.push(new streamDataUnit(realSOCJTAG.x +realSOCJTAG.width -bsrsJTAG[0].width , canvasHeightJTAG - 70 - bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));



BypassData.push(new streamDataUnit(canvasWidthJTAG/2.5 + realSOCJTAG.x +10 -bsrsJTAG[0].width/2 , canvasHeightJTAG - 70- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));

BypassData.push(new streamDataUnit(canvasWidthJTAG/2.5 + realSOCJTAG.x +10 -bsrsJTAG[0].width/2 , realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));



BypassData.push(new streamDataUnit(canvasWidthJTAG/2.5 + realSOCJTAG.x +10 -bsrsJTAG[0].width + realSOCJTAG.width/2 , realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));



BypassData.push(new streamDataUnit(canvasWidthJTAG/2.5 + realSOCJTAG.x +realSOCJTAG.width -bsrsJTAG[0].width , realBypassRegister.y, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(128,128,128)"));


BypassData.push(new streamDataUnit(canvasWidthJTAG/2.5 + realSOCJTAG.x +realSOCJTAG.width -bsrsJTAG[0].width , canvasHeightJTAG - 20- bsrsJTAG[0].height/2, bsrsJTAG[0].width, bsrsJTAG[0].height, "1", "rgb(255,255,255)","rgb(0,0,0)"));



//contextJTAG.moveTo(realSOCJTAG.x +realSOCJTAG.width -10, canvasHeightJTAG - 20);

	//		contextJTAG.lineTo(realSOCJTAG.x +realSOCJTAG.width -10, realBypassRegister.y+realBypassRegister.height/2);	



            if (bothInByPassVariable == BypassData.length)
                bothInByPassVariable=0;
        

            contextJTAG.fillStyle = BypassData[bothInByPassVariable].backcolor;
            contextJTAG.fillRect(BypassData[bothInByPassVariable].x, BypassData[bothInByPassVariable].y, BypassData[bothInByPassVariable].width, BypassData[bothInByPassVariable].height);

            
            contextJTAG.fillStyle = BypassData[bothInByPassVariable].color;
			contextJTAG.font = "15px serif";
			contextJTAG.fillText(BypassData[bothInByPassVariable].text, BypassData[bothInByPassVariable].x+BypassData[bothInByPassVariable].width/2-3, BypassData[bothInByPassVariable].y+BypassData[bothInByPassVariable].height/2+4);
            contextJTAG.stroke();

            bothInByPassVariable++;

        }


		function drawJtagScene(){
            contextJTAG.clearRect(0, 0, canvasWidthJTAG, canvasHeightJTAG);
			drawSOCJTAG();	
            			
			if(document.getElementById("chip").checked){	
				connectDrivingSignalsBetweenChips();
				drawSOCJTAGDSP();

                

			}
            
            if($("#operationPerform").val()=="bypassMode" && $("#operationPerformDSP").val()=="bypassMode")
                bothInByPass();			
			else if($("#operationPerform").val()=="boundaryScan" && $("#operationPerformDSP").val()=="boundaryScan")
                bothInExtest();	

            else if($("#operationPerform").val()=="boundaryScan" && $("#operationPerformDSP").val()=="bypassMode")
                extestAndBypass();
            
            else if($("#operationPerform").val()=="bypassMode" && $("#operationPerformDSP").val()=="boundaryScan")
                bypassAndExtest();
       
		if(animateScene){
             		timerJavascript = setTimeout(drawJtagScene, 100);
		
		}
	}
                
            
                function resizeCanvasJTAG(){
                    if(timerJavascript)
                        clearTimeout(timerJavascript);
                    canvasJTAG.attr("width",$(window).get(0).innerWidth);
                    canvasWidthJTAG = canvasJTAG.width();
                    canvasHeightJTAG = canvasJTAG.height();
                    

		    if($('#chip').is(':checked')){
			$("#operationPerformDSP").show();
		    } else {
			$("#operationPerformDSP").hide();
			}

		    if($("#operationPerform").val()=="IDCODE"){
			$("#operationPerformDSP").val('IDCODE');
	            }

		   /* if($("#operationPerformDSP").val()=="IDCODE" && $("#operationPerform").val()!="IDCODE"){
			$("#operationPerform").val('IDCODE')
	            }*/

                    drawJtagScene();
                                        
                }
                
                

                
                
            })
