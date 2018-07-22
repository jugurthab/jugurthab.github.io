 var animationStepCounter=1;
             var timeLineUnit= function(x, y, radius, text){
                    this.x = x;
                    this.y = y;
                    this.radius = radius;
                    this.text = text;
             }

		
	     var sdram = function(x,y,width,height,text){
		    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;	
	     	    this.text = text
	     }

             var Soc = function(x,y,width,height){
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                };
             

             var Register = function(x,y,width,height,text){
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.text = text; 
             }   

             var Cpu = function(x,y,width,height,text){
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.text = text;
             }

             var Tap = function(x,y,width,height,text){
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.text = text;
             }  
   
            function OpenOCD(x,y,radius,text){
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.text = text;
            }
             var verticalSpace = 0;
		
	    var playAnimation = false;
       var timerJavascriptJTAGSctrach;
$(document).ready(function(e){
                var canvas = $("#OpenOCDDiscover");
                var context = canvas.get(0).getContext("2d");
                var canvasWidth = canvas.width();
                var canvasHeight = canvas.height(); 
                
                var realSOC = new Soc(canvasWidth/4, canvasHeight/12, canvasWidth/2,canvasHeight/2);
               
		var startButton = $("#startAnimation");
		startButton.on("click",function() {
			
			if(playAnimation){
				playAnimation = false;
				$("#startAnimation").text('Start Discovery');
			
			}
			else {
				playAnimation = true;
				$("#startAnimation").text('Stop Discovery');
			}
				
			resizeCanvas();
			
		});

		
		
		$("#radio-1").on("change", function(e){
			setStateAnimation(e);
		});
		$("#radio-2").on("change", function(e){
			setStateAnimation(e);
		});
		$("#radio-3").on("change", function(e){
			setStateAnimation(e);
		});
		$("#radio-4").on("change", function(e){
			setStateAnimation(e);
		});
		$("#radio-5").on("change", function(e){
			setStateAnimation(e);
		});
		$("#radio-6").on("change", function(e){
			setStateAnimation(e);
		});


                //realCPU.push(new Cpu(10,10,100,50));
                $(window).resize(resizeCanvas);
                
                resizeCanvas();

                function drawLegend(){
                    context.save();
                    context.fillStyle ="#A7414A"; 
                    context.font = "18px Arial"; // Change the size and font
                    context.fillText("Legend", canvasWidth - 110,50);
                    
                    context.fillStyle ="rgb(0,0,255)"; 
                    context.beginPath();
                    context.arc(canvasWidth - 100,80,10, 0, Math.PI*2, false);
                    context.closePath();
                    context.fill();
                
                    context.fillStyle ="rgb(255,255,255)"; 
                    context.font = "15px Arial"; // Change the size and font
                    context.fillText("N", canvasWidth - 105,84);
                    context.fillStyle ="rgb(0,0,255)"; 
                    context.font = "15px Arial"; // Change the size and font
                    context.fillText("User config", canvasWidth - 85,84);

                    context.fillStyle ="rgb(255,0,0)"; 
                    context.beginPath();
                    context.arc(canvasWidth - 100,130,10, 0, Math.PI*2, false);
                    context.closePath();
                    context.fill();
                    context.fillStyle ="rgb(255,255,255)"; 
                    context.font = "15px Arial"; // Change the size and font
                    context.fillText("N", canvasWidth - 105,134);
                    context.fillStyle ="rgb(255,0,0)"; 
                    context.font = "15px Arial"; // Change the size and font
                    context.fillText("OpenOCD", canvasWidth - 85,130);
                    context.fillText("in action", canvasWidth - 85,146);
                    context.restore();
                }

               
                function drawTimeLine(){
                    var timeUnits = new Array();
                    verticalSpace = canvasHeight/6;
                    for(var i=0;i<6;i++){
                        timeUnits.push(new timeLineUnit(canvasWidth/12, verticalSpace*i + 30,25,(i+1)));
                        
                    }                    
                    
                    for(var i=0;i<timeUnits.length;i++){
                        var singleTimeUnit = timeUnits[i];
                        if (i<3){
                            if(animationStepCounter==i+1)
                        	    context.fillStyle ="rgb(0,0,255)";
			                else
				                context.fillStyle ="rgba(0,0,255,0.3)";                  

                        }

                        else {
                            if(animationStepCounter==i+1)
                        	    context.fillStyle ="rgb(255,0,0)";
			                else
				                context.fillStyle ="rgba(255,0,0,0.3)";                  
                        }
                        context.beginPath();
                        context.arc(singleTimeUnit.x,singleTimeUnit.y,singleTimeUnit.radius, 0, Math.PI*2, false);
                        context.closePath();
                        context.fill();

                        
                        context.fillStyle ="rgb(255,255,255)"; 
                        context.font = "30px Arial"; // Change the size and font
                        context.fillText(singleTimeUnit.text, singleTimeUnit.x-8,singleTimeUnit.y+7);
			
			

                }
                                        
                    
			switch(animationStepCounter){
				case 1:
					executeStep1();
				break;
				case 2:
					executeStep2();
				break;
				case 3:
					executeStep3();
				break;
				case 4:
					executeStep4();
				break;
				case 5:
					executeStep5();
				break;
				case 6:
					executeStep6();
				break;
			}

			if(animationStepCounter>0)
				knwoledgeStep1();
			if(animationStepCounter>1)
				knwoledgeStep2();
			if(animationStepCounter>2)
				knwoledgeStep3();
    
			if(animationStepCounter>3)
				knwoledgeStep4();
			if(animationStepCounter>4)
				knwoledgeStep5();
			if(animationStepCounter>5)
				knwoledgeStep6();
                }  
              
                function drawOpenOCD(){
                    myOpenOCD = new OpenOCD(canvasWidth/4, canvasHeight/3,canvasHeight/8, "OpenOCD");

                    //context.fillStyle ="rgb(255,0,255)";   
                    context.fillStyle ="#563838";                
                    context.beginPath();
                    context.arc(myOpenOCD.x + realSOC.width/2,myOpenOCD.y + realSOC.height - 20,myOpenOCD.radius, 0, Math.PI*2, false);
                    context.closePath();
                    context.fill();

                    
                    context.fillStyle ="rgb(255,255,255)"; 
                    context.font = "22px Arial"; // Change the size and font
                    context.fillText(myOpenOCD.text, myOpenOCD.x + realSOC.width/2 - 54, myOpenOCD.y + realSOC.height-15);
                }                

		
		function executeStep1(){
			var text = "set _CHIPNAME stm32f0407"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 90, canvasHeight - 20);	
		}
		
		function knwoledgeStep1(){
			text = "stm32f0407";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, 20);
			text = "is the ";
			context.fillText(text, canvasWidth/8+20, 32);
			text = "CPU name";
			context.fillText(text, canvasWidth/8, 45);

		}


		function executeStep2(){
			var text = "set _ENDIAN little"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 60, canvasHeight - 20);
		}

		function knwoledgeStep2(){
			text = "Endianess";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, verticalSpace+20);
			text = "is little";
			context.fillText(text, canvasWidth/8, verticalSpace+35);
			
		}

		function executeStep3(){
			var text = "set _CPUTAPID 0x4ba00477"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 86, canvasHeight - 20);
		}

		function knwoledgeStep3(){
			text = "Tap Controller";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, verticalSpace * 2+ 10);
			text = "of target";
			context.fillText(text, canvasWidth/8, verticalSpace * 2 +25);
			text = "has ID";
			context.fillText(text, canvasWidth/8, verticalSpace * 2 +40);

			text = "0x4ba00477";
			context.fillText(text, canvasWidth/8, verticalSpace * 2 +55);
			
		}

		function executeStep4(){
			var text = "jtag newtap $_CHIPNAME cpu -irlen 4 -expected-id $_CPUTAPID"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 210, canvasHeight - 20);
		}
		

		function knwoledgeStep4(){
			text = "Tap Controller";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, verticalSpace * 3+ 15);
			text = "detected with";
			context.fillText(text, canvasWidth/8, verticalSpace * 3 +30);
			text = "success!";
			context.fillText(text, canvasWidth/8, verticalSpace * 3 +45);
			
		}

		function executeStep5(){
			var text = "target create $_TARGETNAME cortex_m -chain-position $_TARGETNAME"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 245, canvasHeight - 20);
		}

		function knwoledgeStep5(){
			text = "Processor";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, verticalSpace * 4 + 15);
			text = "chip";
			context.fillText(text, canvasWidth/8, verticalSpace * 4 + 30);
			text = "detected";
			context.fillText(text, canvasWidth/8, verticalSpace * 4 + 45);
			
		}

		function executeStep6(){
			var text = "$_TARGETNAME configure -work-area-phys 0x00200000 -work-area-size 0x8000 -work-area-backup 0"
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "16px Arial"; // Change the size and font
                    	context.fillText(text, canvasWidth/2 - 320, canvasHeight - 20);
		}

		function knwoledgeStep6(){
			text = "SDRAM";
			//context.fillText(text, canvasWidth/12, verticalSpace);
			context.fillText(text, canvasWidth/8, verticalSpace * 5 + 15);
			text = "exists";
			context.fillText(text, canvasWidth/8, verticalSpace * 5 + 30);
			text = "to speed up";
			context.fillText(text, canvasWidth/8, verticalSpace * 5 + 45);
			text = "debugging";
			context.fillText(text, canvasWidth/8, verticalSpace * 5 + 60);
			
		}

                function drawTap(){
                    realTap = new Tap(canvasWidth/4,canvasHeight/12,canvasWidth/4,canvasHeight/12,"TAP Controller"); 
                    context.fillStyle ="#563838";                   
                    context.beginPath();
                    context.fillRect(realTap.x + realSOC.width/4,realTap.y/8 + realSOC.height,realTap.width,realTap.height);
                    context.fill();

			        //context.fillStyle ="#A37C27";
                    context.fillStyle="rgb(255,255,0)"; 
		            context.font = "20px Arial"; // Change the size and font
		            context.fillText(realTap.text, realSOC.x + realSOC.width/2 - 66, realTap.y/2 + realSOC.height);


                    if(animationStepCounter>3){
		            //context.fillStyle ="rgb(255,255,255)";

				
			            context.fillStyle ="rgb(255,255,255)"; 
		                context.font = "15px Arial"; // Change the size and font
		                context.fillText("TAP ID: 0x4ba00477", realSOC.x + realSOC.width/2 - 70, realTap.y/2 + realSOC.height+15);
		            }

                }

                function drawSOC(){
                    realSOC = new Soc(canvasWidth/4, canvasHeight/16, canvasWidth/2,canvasHeight/2);
                    context.fillStyle ="#A7414A";
                    context.fillRect(realSOC.x,realSOC.y,realSOC.width,realSOC.height);
                }

                function drawCPU(){
                    realCPU = new Cpu(canvasWidth/4,canvasHeight/10,canvasWidth/3,canvasHeight/5, "CPU");
                   // context.fillStyle ="rgb(255,125,255)";
		    context.fillStyle ="#282726";                   
                    context.beginPath();
                    context.fillRect(realCPU.x + realSOC.width/6,realCPU.y/2 + realSOC.y,realCPU.width,realCPU.height);
                    context.fill();


		    if(animationStepCounter>4){
		            context.fillStyle ="rgb(255,255,255)"; 
		            context.font = "60px Arial"; // Change the size and font
		            context.fillText(realCPU.text, realSOC.x + realSOC.width/2 - 65, realCPU.y + realCPU.height/2 + 35);

			    context.fillStyle ="rgb(125,255,255)"; 
			    context.font = "30px Arial"; // Change the size and font
		            context.fillText("stm32f0407", realSOC.x + realSOC.width/2 - 85, realCPU.y + 35);	
		    } else{
                    drawUnknownCPU();
                }
			
			 

                }


                function drawUnknownCPU(){
                    context.fillStyle ="rgb(255,255,255)"; 
		            context.font = "20px Arial"; // Change the size and font
		            context.fillText("Unknown CPU", realSOC.x + realSOC.width/2 - 65, realCPU.y + realCPU.height/2 + 15);

                }

                function drawInstructionRegister(){
                    var instRegister = new Register(canvasWidth/4,canvasHeight/10,canvasWidth/4,canvasHeight/10, "Instruction Register");
                    //context.fillStyle ="rgb(0,125,125)";                   
                    context.fillStyle ="#6A8A82"; 
		    context.beginPath();
                    context.fillRect(instRegister.x + realSOC.width/4,instRegister.y/2 + realCPU.y + realCPU.height + 10,instRegister.width,instRegister.height);
                    context.fill();
                    
                    
                    context.fillStyle ="rgb(255,255,255)"; 
                    context.font = "15px Arial"; // Change the size and font
                    context.fillText(instRegister.text, realSOC.x + realSOC.width/2 - 65, instRegister.y + realCPU.y + realCPU.height+12);
                    
                }


		function drawSDRAM(){
			var realSDRam = new sdram(realSOC.x+10,realCPU.y + realCPU.y/8,realCPU.x + realSOC.width/6 - canvasWidth/4,realCPU.height,"SDRAM");
			context.fillRect(realSDRam.x,realSDRam.y,realSDRam.width,realSDRam.height);
                context.fillStyle ="rgb(0,0,0)";
			    context.save();
			    context.rotate(-Math.PI/2);
           if(animationStepCounter>5){
			    context.font = "20px Arial"; // Change the size and font
                context.fillText("Detected",-realSDRam.y-realSDRam.height+9,realSDRam.x+16);                
                context.fillText(realSDRam.text,-realSDRam.y-realSDRam.height+9,realSDRam.x+realSDRam.width-7);
			    
     		}

            else{
			    context.font = "18px Arial"; // Change the size and font
                context.fillText("Unknown",-realSDRam.y-realSDRam.height+9,realSDRam.x+15);
                context.fillText(realSDRam.text,-realSDRam.y-realSDRam.height+9,realSDRam.x+realSDRam.width-7);
            }
			
			context.restore();
		}

		
		function drawTCK(){
			context.beginPath();
			context.moveTo(myOpenOCD.x + realSOC.width/2,myOpenOCD.y/2 + realSOC.height);
			context.lineTo(realTap.x + realSOC.width/2 - 1,realTap.y + realSOC.height+5);
			context.closePath();
			context.stroke();

			var text = "TCK";
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "20px Arial"; // Change the size and font
                    	context.fillText(text,myOpenOCD.x + realSOC.width/2 + 10,myOpenOCD.y/2 + realSOC.height-5);
			
			
		}


		function drawTMS(){
			context.beginPath();
			context.moveTo(myOpenOCD.x + realSOC.width/2 - myOpenOCD.radius,myOpenOCD.y + realSOC.height - 23);

			context.lineTo(realTap.x + realSOC.width/3.5 - 1,myOpenOCD.y + realSOC.height - 23);

			context.lineTo(realTap.x + realSOC.width/3.5 - 1,realTap.y + realSOC.height+5);
			//context.closePath();
			context.stroke();

			var text = "TMS";
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "20px Arial"; // Change the size and font
                    	context.fillText(text,realTap.x + realSOC.width/3.5 - 55,myOpenOCD.y + realSOC.height - 23);
		}

		function drawTRST(){
			context.beginPath();

			context.moveTo(myOpenOCD.x + realSOC.width/2 + myOpenOCD.radius,myOpenOCD.y + realSOC.height - 23);

			context.lineTo(realTap.x + realSOC.width/2+ realTap.width/2.5,myOpenOCD.y + realSOC.height - 23);

			

			context.lineTo(realTap.x + realSOC.width/2 + realTap.width/2.5 ,realTap.y + realSOC.height+5);
			//context.closePath();
			context.stroke();

			
			var text = "TRST";
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "20px Arial"; // Change the size and font
                    	context.fillText(text,realTap.x + realSOC.width/2+ realTap.width/2.5 + 10,myOpenOCD.y + realSOC.height - 23);
		}

		
		function drawTDI(){
			context.beginPath();
			context.moveTo(myOpenOCD.x + realSOC.width/2 - myOpenOCD.radius +4,myOpenOCD.y + realSOC.height);

			context.lineTo(realTap.x + realSOC.width/7 - 1,myOpenOCD.y + realSOC.height);

			context.lineTo(realTap.x + realSOC.width/7 - 1,realSOC.y + realSOC.height);
			//context.closePath();
			context.stroke();

			var text = "TDI";
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "20px Arial"; // Change the size and font
                    	context.fillText(text,realTap.x + realSOC.width/7 - 50,myOpenOCD.y + realSOC.height);
		}
		
		function drawTDO(){
			context.beginPath();

			context.moveTo(myOpenOCD.x + realSOC.width/2 + myOpenOCD.radius -4,myOpenOCD.y + realSOC.height);

			context.lineTo(realTap.x + realSOC.width/2 + realTap.width/1.5,myOpenOCD.y + realSOC.height);

			

			context.lineTo(realTap.x + realSOC.width/2 + realTap.width/1.5 ,realSOC.y + realSOC.height);
			//context.closePath();
			context.stroke();


			var text = "TDO";
			context.fillStyle ="rgb(0,0,0)"; 
                    	context.font = "20px Arial"; // Change the size and font
                    	context.fillText(text,realTap.x + realSOC.width/2 + realTap.width/1.5 +10,myOpenOCD.y + realSOC.height);
		}


		function drawExtensionSignalsCPUDetected(){
			// Path To instruction register
			context.beginPath();
			context.lineWidth = 5;
			context.moveTo(myOpenOCD.x + realSOC.width/2,realTap.y/8 + realSOC.height);
			context.lineTo(realTap.x + realSOC.width/2,canvasHeight/7 + realCPU.y + realCPU.height + 10);
			context.closePath();
			context.stroke();

			

			// Path to Data register
			
			

			
			context.beginPath();

			context.moveTo(realTap.x + realSOC.width/2 + realTap.width/2, realTap.y/16 + realSOC.height + realTap.height/2);

			context.lineTo(realCPU.x + realSOC.width/8 + realCPU.width, realTap.y/16 + realSOC.height + realTap.height/2);

			

			//context.lineTo(realTap.x + realSOC.width/2 + realTap.width/2.5 , realTap.y + realSOC.height+5);


			context.lineTo(realCPU.x + realSOC.width/8 + realCPU.width,realCPU.y/2 + realSOC.y + realCPU.height)
			//context.closePath();
			context.stroke();

			context.lineWidth = 1;

		}		

		function drawSignals(){

			if(animationStepCounter>3){
				context.lineWidth = 5;
				drawTCK();

				drawTMS();

				drawTRST();

				drawTDI();
				drawTDO();
				context.lineWidth = 1;
			}

			if(animationStepCounter>4){
				drawExtensionSignalsCPUDetected();
			}
		}

                function resizeCanvas(){
                    if(timerJavascriptJTAGSctrach)
                        clearTimeout(timerJavascriptJTAGSctrach);
                    canvas.attr("width",$(window).get(0).innerWidth-$(window).get(0).innerWidth/10);
                    $("body").attr("margin","auto");
                    canvasWidth = canvas.width();
                    canvasHeight = canvas.height();
                    animateOpenOCDCustomScripts();
                                      
                }

		function drawOpenOCDKnowledge(){
			context.save();
			context.rotate(-Math.PI/2);
            context.fillStyle="#A7414A";
			context.font = "30px Arial"; // Change the size and font
                    	context.fillText("OpenOCD knowledge",-(canvasHeight/2)-150,24);
			context.restore();
		}

		function animateOpenOCDCustomScripts(){
			
				if(animationStepCounter > 6)
					animationStepCounter = 1;
				$("#radio-" + animationStepCounter).prop('checked', true);
				//console.log(animationStepCounter)
				context.clearRect(0, 0, canvasWidth, canvasHeight);
				drawSOC();
		            	drawTap();

		            	drawOpenOCD();
		            	drawCPU(); 
		            	drawInstructionRegister(); 

				drawSDRAM();

		            	drawTimeLine();
                        drawLegend();			
				drawSignals();
				drawOpenOCDKnowledge();
				animationStepCounter++;
				
			if(playAnimation){
				timerJavascriptJTAGSctrach = setTimeout(animateOpenOCDCustomScripts, 2000);
			}
		}

		function setStateAnimation(e){
			animationStepCounter = parseInt(e.target.value,10);
		}		

            })
