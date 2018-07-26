
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

var eventContainerArray = new Array();

var allowedKernelEvents = new Array('I','M', 'D','S');
var CounterallowedKernelEvents = new Array(0, 0, 0, 0);
var allowedKernelEventsColor = new Array('#270101','#720017', '#D8D583','#D9AC2A', '#763F02');


var main_container, linux_container, linux_container_userspace, linux_container_kernel, main_tracer_profiler, main_tracer_profiler_probe;

var timerJavascript = false;
var animateScene =false;

var NUMBER_OF_EVENTS = 5;

$(document).ready(function(e){
                var canvasTracers = $("#linuxTracersAnim");
                var contextTracers = canvasTracers.get(0).getContext("2d");
                var canvasWidthTracers = canvasTracers.width();
                var canvasHeightTracers = canvasTracers.height(); 

		resizeCanvasTracer();
        	$(window).resize(resizeCanvasTracer);

		var startTracerAnimation = $("#playAnimationB");
		startTracerAnimation.on("click",function() {
			
			if(animateScene){
				animateScene = false;
				startTracerAnimation.text('Start Tracing');
			
			}
			else {
				animateScene = true;
				startTracerAnimation.text('Stop Tracing');
			}
				
			resizeCanvasTracer();
			
		});

		$("#selectTool").on("change",resizeCanvasTracer);
		
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
			CounterallowedKernelEvents =new Array(0, 0, 0, 0);
			text = "<ul>";
			counter = 0;
			for(var i=0;i<NUMBER_OF_EVENTS;i++){
		                if($("#selectTool").val()=="tracer")			{	
					counter += Math.floor(Math.random() * 20);
					text += "<li>Timestamp : " + counter + " ==> Event " + eventContainerArray[i].text + "</li>";
				}

				else if($("#selectTool").val()=="profiler"){
					index = allowedKernelEvents.indexOf(eventContainerArray[i].text);
					CounterallowedKernelEvents[index]++;
				}

			}
			

			if($("#selectTool").val()=="profiler"){
				for(var i = 0; i < CounterallowedKernelEvents.length; i++){
					text += "<li>Event : " + allowedKernelEvents[i] + " produced : " + CounterallowedKernelEvents[i] + " times</li>";
				}
			}

			text+="</ul>";
			$("#logData").empty();
			$("#logData").append(text);


			
		}

		function drawTracerOrProfiler(){
			
				main_tracer_profiler = new mainContainer(linux_container_kernel.x+linux_container_kernel.width, linux_container_kernel.y + linux_container_kernel.height/2-canvasHeightTracers/8, linux_container_userspace.x - (linux_container_kernel.x+linux_container_kernel.width), canvasHeightTracers/4,"#04060F", "Tracer","rgba(255,255,255,1.0)");
			if($("#selectTool").val()=="profiler")		
				main_tracer_profiler.text = "Profiler";

console.log($("#selectTool").val());
			contextTracers.fillStyle = main_tracer_profiler.color;
			contextTracers.fillRect(main_tracer_profiler.x, main_tracer_profiler.y, main_tracer_profiler.width, main_tracer_profiler.height);

			
			contextTracers.fillStyle = main_tracer_profiler.colorText;
			contextTracers.font = "30px serif";
            			    contextTracers.save();
			    contextTracers.rotate(-Math.PI/2);
			contextTracers.fillText(main_tracer_profiler.text, -main_tracer_profiler.y - main_tracer_profiler.height/3, main_tracer_profiler.x +8);
            contextTracers.restore();

			main_tracer_profiler_probe = new mainContainer(main_tracer_profiler.x-50, linux_container_kernel.y + linux_container_kernel.height/2-canvasHeightTracers/16, 50, canvasHeightTracers/8,"#03353E", "Probe","rgba(255,255,255,1.0)");
			contextTracers.fillStyle = main_tracer_profiler_probe.color;
			contextTracers.fillRect(main_tracer_profiler_probe.x,main_tracer_profiler_probe.y , main_tracer_profiler_probe.width, main_tracer_profiler_probe.height);

			
			contextTracers.fillStyle = main_tracer_profiler_probe.colorText;
			contextTracers.font = "15px serif";
			contextTracers.fillText(main_tracer_profiler_probe.text, main_tracer_profiler_probe.x+8 , main_tracer_profiler_probe.y +main_tracer_profiler_probe.height/2+5);

		}

		function generateKernelEvents(){
			
			for(var i=0;i<NUMBER_OF_EVENTS;i++){

				x = Math.floor(20+linux_container_kernel.x + Math.random() * (linux_container_kernel.width - 90));
				y = Math.floor(50+linux_container_kernel.y + Math.random() * (linux_container_kernel.height - 70));
				radius = 20;

				text = allowedKernelEvents[Math.floor(Math.random()*allowedKernelEvents.length)];

                var index_Event = allowedKernelEvents.indexOf(text);
                console.log(index_Event)
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

			}	
		}
		

		function drawUserSpace(){
			linux_container_userspace = new mainContainer(canvasWidthTracers/2,linux_container.y+40,canvasWidthTracers/3,linux_container.height-60,"#D9AC2A", "Userspace","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = linux_container_userspace.color;
			contextTracers.fillRect(linux_container_userspace.x, linux_container_userspace.y, linux_container_userspace.width, linux_container_userspace.height);

			
			contextTracers.fillStyle = linux_container_userspace.colorText;
			contextTracers.font = "30px serif";
			contextTracers.fillText(linux_container_userspace.text, linux_container_userspace.x + linux_container_userspace.width/2 - 60, linux_container_userspace.y+35);
		}


		function drawKernelSpace(){
			linux_container_kernel = new mainContainer(canvasWidthTracers/10,linux_container.y+40,canvasWidthTracers/3,linux_container.height-60,"#A79C93", "Kernel","rgba(255,255,255,1.0)");

			contextTracers.fillStyle = linux_container_kernel.color;
			contextTracers.fillRect(linux_container_kernel.x, linux_container_kernel.y, linux_container_kernel.width, linux_container_kernel.height);

			
			contextTracers.fillStyle = linux_container_kernel.colorText;
			contextTracers.font = "30px serif";
			contextTracers.fillText(linux_container_kernel.text, linux_container_kernel.x + linux_container_kernel.width/2 - 60, linux_container_kernel.y+35);
		}


		function drawLinux(){
			linux_container = new mainContainer(canvasWidthTracers/40,60,canvasWidthTracers - canvasWidthTracers/20,canvasHeightTracers/2+ canvasHeightTracers/3 -60,"#C1403D", "Linux OS","rgba(255,255,255,1.0)");

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
			contextTracers.fillText(main_container.text, main_container.x + main_container.width/2 - 140, main_container.y+35);
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

			if(animateScene){
             			timerJavascript = setTimeout(drawTracersProfilersScene, 1000);
			}
 		}

                function resizeCanvasTracer(){
                    if(timerJavascript)
                        clearTimeout(timerJavascript);
                    canvasTracers.attr("width",$(window).get(0).innerWidth - 100);
                    canvasTracers.attr("height",$(window).get(0).innerHeight - 250);
                    canvasWidthTracers = canvasTracers.width();
                    canvasHeightTracers = canvasTracers.height();
                    

		    
                    drawTracersProfilersScene();
                                        
                }

});
