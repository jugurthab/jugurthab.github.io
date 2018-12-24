
var mainContainer = function(x, y, width, height,color, text, colorText){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.text = text;
	this.colorText = colorText;
	
}


var eventContainer = function(x, y, radius, color, text, colortext){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.text = text;
	this.colorText = colorText;
}

var counter = 0;
var eventContainerArray = new Array();

var allowedKernelEvents = new Array('I','M', 'D','S');
var allowedKernelEventsMeaning = new Array('Interrupt', 'Memory access', 'Disk access', 'Scheduler event');
var CounterallowedKernelEvents = new Array(0, 0, 0, 0);
var allowedKernelEventsColor = new Array('#270101','#720017', '#D8D583','#D9AC2A', '#763F02');

var counterTimestamp = new Array(0,0,0,0);

var main_container, linux_container, linux_container_userspace, linux_container_kernel, main_tracer_profiler, main_tracer_profiler_probe;

var timerJavascript = false;
var animateScene =false;

var NUMBER_OF_EVENTS = 4;

var NUMBER_MAX_EVENTS = 20;

var counterEvents = 0;

var user_image;


var eventTracerName = new Array();
var eventTracerCounter = new Array();


$(document).ready(function(e){
                var canvasTracers = $("#linuxTracersAnim");
                var contextTracers = canvasTracers.get(0).getContext("2d");
                var canvasWidthTracers = canvasTracers.width();
                var canvasHeightTracers = canvasTracers.height(); 

		resizeCanvasTracer();
        	$(window).resize(resizeCanvasTracer);

		var startTracerAnimation = $("#playAnimationB");
		$("#selectTool").on("change",resizeCanvasTracer);
		startTracerAnimation.on("click",function() {
			
			if(animateScene){
				animateScene = false;
				
			
			}
			else {
				animateScene = true;
				
			}
				
			resizeCanvasTracer();
			
		});

		
		



		function drawKeyMap(){
			//'I','M', 'D','S'
			for(var i=0;i<NUMBER_OF_EVENTS;i++){
				contextTracers.fillStyle=allowedKernelEventsColor[i];
				contextTracers.beginPath();
				contextTracers.arc(main_container.x + eventContainerArray[i].radius + 170 * i,40, eventContainerArray[i].radius, 0, Math.PI*2, false);
				contextTracers.closePath();
				contextTracers.fill();

				contextTracers.fillStyle="rgb(255,255,255)";
				contextTracers.font = "20px serif";
				contextTracers.fillText(allowedKernelEvents[i], main_container.x + eventContainerArray[i].radius + 170 * i-8, 47);



				contextTracers.fillStyle="rgb(255,255,255)";
				contextTracers.font = "15px serif";
				contextTracers.fillText(allowedKernelEventsMeaning[i], main_container.x + eventContainerArray[i].radius + 25+ 170 * i, 44);

			}



				
			
		}

		function drawLinesEventToTracer(){
			for(var i=0;i<NUMBER_OF_EVENTS;i++){			
				// Draw lines to tracer
				contextTracers.beginPath(); 
				contextTracers.moveTo(eventContainerArray[i].x + eventContainerArray[i].radius, eventContainerArray[i].y);

				contextTracers.lineTo(main_tracer_profiler_probe.x, main_tracer_profiler_probe.y+ (Math.random()*main_tracer_profiler_probe.height));
				contextTracers.closePath(); 
				contextTracers.stroke(); 
			}
		}


		function drawEvents(){
            contextTracers.font = "bold 18px serif";

            contextTracers.beginPath(); 
            contextTracers.moveTo(linux_container_userspace.x + 15, linux_container_userspace.y + 50);

            contextTracers.lineTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2+88, linux_container_userspace.y + 50);
            contextTracers.closePath(); 
            contextTracers.stroke();

            contextTracers.beginPath(); 
            contextTracers.moveTo(linux_container_userspace.x + 15, linux_container_userspace.y + 100);

            contextTracers.lineTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2+88, linux_container_userspace.y + 100);
            contextTracers.closePath(); 
            contextTracers.stroke();

			if($("#selectTool").val()=="tracer"){
                contextTracers.fillStyle = "rgb(255,0,0)";
				
                contextTracers.fillText("Timestamp", linux_container_userspace.x + 20, linux_container_userspace.y + 70);
                contextTracers.fillStyle = "rgb(0,0,255)";
                contextTracers.fillText("Event Type", linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2-5, linux_container_userspace.y + 70);
		    } else if($("#selectTool").val()=="profiler"){
				contextTracers.fillStyle = "rgb(255,0,0)";  
                contextTracers.fillText("Event Type", linux_container_userspace.x + 20, linux_container_userspace.y + 70);
                contextTracers.fillStyle = "rgb(0,0,255)";
                contextTracers.fillText("Number of", linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2, linux_container_userspace.y + 70);
                contextTracers.fillText("occurences", linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2, linux_container_userspace.y + 90);


			}
            
             
             
             contextTracers.fillStyle = "rgb(0,0,0)";
			for(var i=0;i<NUMBER_OF_EVENTS;i++){
                    contextTracers.beginPath(); 
                        contextTracers.moveTo(linux_container_userspace.x + 15, linux_container_userspace.y + 140 + 35 * i);

                        contextTracers.lineTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2+88, linux_container_userspace.y + 140 + 35 * i);
                        contextTracers.closePath(); 
                        contextTracers.stroke();
		          if($("#selectTool").val()=="tracer"){					
	                    
                        

					    counter+=Math.floor(Math.random()*5);
					    counterTimestamp[i] = counter;
					    

                        contextTracers.font = "bold 18px serif";
                        contextTracers.fillText(("0000000"+counterTimestamp[i]).slice(-7), linux_container_userspace.x + 20, linux_container_userspace.y + 35*i + 130);

                        contextTracers.font = "18px serif";
                        contextTracers.fillText(eventContainerArray[i].text, linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2, linux_container_userspace.y + 35*i + 130);

				  } else if($("#selectTool").val()=="profiler"){
					index = allowedKernelEvents.indexOf(eventContainerArray[i].text);
					CounterallowedKernelEvents[index]++;
				  }

			}
			

			if($("#selectTool").val()=="profiler"){
				for(var i = 0; i < CounterallowedKernelEvents.length; i++){
					if(CounterallowedKernelEvents[i]>1){
						contextTracers.font = "bold 18px serif";
                        contextTracers.fillText(allowedKernelEvents[i], linux_container_userspace.x + 20, linux_container_userspace.y + 35*i + 130);

                        contextTracers.font = "18px serif";
                        contextTracers.fillText(CounterallowedKernelEvents[i] + " times", linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2, linux_container_userspace.y + 35*i + 130);
					} else {
						contextTracers.font = "bold 18px serif";
                        contextTracers.fillText(allowedKernelEvents[i], linux_container_userspace.x + 20, linux_container_userspace.y+ 35*i + 130);

                        contextTracers.font = "18px serif";
                        contextTracers.fillText(CounterallowedKernelEvents[i] + " time", linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2, linux_container_userspace.y + 35*i + 130);

					}
				}
			}

			

            /* Left most table bar userspace report */
            contextTracers.beginPath(); 
            contextTracers.moveTo(linux_container_userspace.x + 15, linux_container_userspace.y + 50);

            contextTracers.lineTo(linux_container_userspace.x + 15, linux_container_userspace.y + 247);
            contextTracers.closePath(); 
            contextTracers.stroke();

            /* Middle table bar userspace report */
            contextTracers.beginPath(); 
            contextTracers.moveTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2 - 10, linux_container_userspace.y + 50);

            contextTracers.lineTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2 - 10, linux_container_userspace.y + 247);
            contextTracers.closePath(); 
            contextTracers.stroke();

            /* Right most table bar userspace report */
            contextTracers.beginPath(); 
            contextTracers.moveTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2 + 88, linux_container_userspace.y + 50);

            contextTracers.lineTo(linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/2 + 88, linux_container_userspace.y + 247);
            contextTracers.closePath(); 
            contextTracers.stroke();

		}

		function drawTracerOrProfiler(){
			
				main_tracer_profiler = new mainContainer(linux_container_kernel.x+linux_container_kernel.width, linux_container_kernel.y + linux_container_kernel.height/2-canvasHeightTracers/8, linux_container_userspace.x - (linux_container_kernel.x+linux_container_kernel.width), canvasHeightTracers/4,"#04060F", "Tracer","rgba(255,255,255,1.0)");
			if($("#selectTool").val()=="profiler")		
				main_tracer_profiler.text = "Profiler";

			contextTracers.fillStyle = main_tracer_profiler.color;
			contextTracers.fillRect(main_tracer_profiler.x, main_tracer_profiler.y, main_tracer_profiler.width, main_tracer_profiler.height);

			
			contextTracers.fillStyle = main_tracer_profiler.colorText;
			contextTracers.font = "30px serif";
            		contextTracers.save();
			contextTracers.rotate(-Math.PI/2);
			contextTracers.fillText(main_tracer_profiler.text, -main_tracer_profiler.y - main_tracer_profiler.height/2 -40, main_tracer_profiler.x + main_tracer_profiler.width/2+8);
            contextTracers.restore();

			main_tracer_profiler_probe = new mainContainer(main_tracer_profiler.x-50, linux_container_kernel.y + linux_container_kernel.height/2-canvasHeightTracers/16, 50, canvasHeightTracers/8,"#03353E", "Probe","rgba(255,255,255,1.0)");
			contextTracers.fillStyle = main_tracer_profiler_probe.color;
			contextTracers.fillRect(main_tracer_profiler_probe.x,main_tracer_profiler_probe.y , main_tracer_profiler_probe.width, main_tracer_profiler_probe.height);

			
			contextTracers.fillStyle = main_tracer_profiler_probe.colorText;
			contextTracers.font = "15px serif";

			contextTracers.save();
			contextTracers.rotate(-Math.PI/2);
			contextTracers.fillText(main_tracer_profiler_probe.text , -main_tracer_profiler_probe.y -main_tracer_profiler_probe.height/2 -20,main_tracer_profiler_probe.x+main_tracer_profiler_probe.width/2+1);
			contextTracers.restore();

		}

		function generateKernelEvents(){

            /* if(counterEvents>NUMBER_MAX_EVENTS){
                    counterEvents =0;
                    CounterallowedKernelEvents =new Array(0, 0, 0, 0);
                    eventTracerName = new Array();
                    eventTracerCounter = new Array();
             }	*/	
			for(var i=0;i<NUMBER_OF_EVENTS;i++){



				x = Math.floor(20+linux_container_kernel.x + Math.random() * (linux_container_kernel.width - 90));
				y = Math.floor(50+linux_container_kernel.y + Math.random() * (linux_container_kernel.height - 70));
				radius = 20;

				text = allowedKernelEvents[Math.floor(Math.random()*allowedKernelEvents.length)];
                
                var index_Event = allowedKernelEvents.indexOf(text);

                color = allowedKernelEventsColor[index_Event];
				colorText = 'rgb(255,255,255)';
				eventContainerArray.push(new eventContainer(x,y,radius,color,text,colorText));
				contextTracers.fillStyle = eventContainerArray[i].color;
				contextTracers.beginPath();
				contextTracers.arc(eventContainerArray[i].x,eventContainerArray[i].y, eventContainerArray[i].radius, 0, Math.PI*2, false);
				contextTracers.closePath();
				contextTracers.fill();

				contextTracers.fillStyle = eventContainerArray[i].colorText;
				contextTracers.font = "20px serif";
				contextTracers.fillText(eventContainerArray[i].text, eventContainerArray[i].x-8, eventContainerArray[i].y+5);

                counterEvents++;	

                eventTracerName.push(text);
                 //eventTracerCounter

                console.log(eventTracerName);		

			}	
		}
		

		function drawUserSpace(){
			linux_container_userspace = new mainContainer(canvasWidthTracers/2,linux_container.y+40,canvasWidthTracers/3,linux_container.height-60,"#D9AC2A", "Userspace","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = linux_container_userspace.color;
			contextTracers.fillRect(linux_container_userspace.x, linux_container_userspace.y, linux_container_userspace.width, linux_container_userspace.height);

			
			contextTracers.fillStyle = linux_container_userspace.colorText;
			contextTracers.font = "30px serif";
			contextTracers.fillText(linux_container_userspace.text, linux_container_userspace.x + linux_container_userspace.width/2 - 65, linux_container_userspace.y+35);
		}


		function drawKernelSpace(){
			linux_container_kernel = new mainContainer(canvasWidthTracers/10,linux_container.y+40,canvasWidthTracers/3,linux_container.height-60,"#A79C93", "Kernel","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = linux_container_kernel.color;
			contextTracers.fillRect(linux_container_kernel.x, linux_container_kernel.y, linux_container_kernel.width, linux_container_kernel.height);

			
			contextTracers.fillStyle = linux_container_kernel.colorText;
			contextTracers.font = "30px serif";
			contextTracers.fillText(linux_container_kernel.text, linux_container_kernel.x + linux_container_kernel.width/2 - 50, linux_container_kernel.y+35);
		}


		function drawLinux(){
			linux_container = new mainContainer(canvasWidthTracers/40,100,canvasWidthTracers - canvasWidthTracers/20,canvasHeightTracers/2+ canvasHeightTracers/3 -60,"#C1403D", "Linux OS","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = linux_container.color;
			contextTracers.fillRect(linux_container.x, linux_container.y, linux_container.width, linux_container.height);

			
			contextTracers.fillStyle = linux_container.colorText;
			contextTracers.font = "30px serif";
			contextTracers.fillText(linux_container.text, linux_container.x + linux_container.width/2 - 110, linux_container.y+35);
		}

		function drawContainerMachine(){
			main_container = new mainContainer(canvasWidthTracers/50,20,canvasWidthTracers - canvasWidthTracers/30,canvasHeightTracers/2+ canvasHeightTracers/3 +20,"#0294A5", "Host Machine","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = main_container.color;
			contextTracers.fillRect(main_container.x, main_container.y, main_container.width, main_container.height);

			
			contextTracers.fillStyle = main_container.colorText;
			contextTracers.font = "40px serif";
			contextTracers.fillText(main_container.text, main_container.x + main_container.width/2 - 125, main_container.y+75);
		}


		function drawUser(){
			user_image = new Image();
			user_image.src = "img/user_tracing.png";
			$(user_image).on("load",function() {
				contextTracers.drawImage(user_image, linux_container_userspace.x+linux_container_userspace.width-linux_container_userspace.width/4, linux_container_userspace.y+linux_container_userspace.height/2, linux_container_userspace.width/4, linux_container_userspace.height/2);
			});
		}


		function drawTracersProfilersScene(){
           		contextTracers.clearRect(0, 0, canvasWidthTracers, canvasHeightTracers);


			drawContainerMachine();
			drawLinux();


	
			drawKernelSpace();

			drawUserSpace();
			eventContainerArray= new Array();

			


			generateKernelEvents();

			drawTracerOrProfiler();
			
			drawLinesEventToTracer();

			drawEvents();
			drawUser();
	
			drawKeyMap();
			if(animateScene){
             			timerJavascript = setTimeout(drawTracersProfilersScene, 1000);
				if($("#selectTool").val()=="tracer")
					$("#playAnimationB").text('Stop Tracing');
				else
					$("#playAnimationB").text('Stop Profiling');
			} else {
				if($("#selectTool").val()=="tracer")
					$("#playAnimationB").text('Start Tracing');
				else
					$("#playAnimationB").text('Start Profiling');
			}
 		}

                function resizeCanvasTracer(){
                    if(timerJavascript)
                        clearTimeout(timerJavascript);
                    canvasTracers.attr("width",$(window).get(0).innerWidth - 100);
                    canvasTracers.attr("height",$(window).get(0).innerHeight - 120);
                    canvasWidthTracers = canvasTracers.width();
                    canvasHeightTracers = canvasTracers.height();
                    
			

		    
                    drawTracersProfilersScene();
                                        
                }

});
