angular
  .module('casserole')
  .controller('LoginCtrl', LoginCtrl);
 
function LoginCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	
	var myCanvas = document.getElementById("myCanvas");
	this.pizarron = myCanvas.getContext("2d");
	
	this.subscribe("pizarrones",()=>{
		return [{}]
	});

  this.credentials = {
    username: '',
    password: ''
  };

  this.login = function () {
    $meteor.loginWithPassword(this.credentials.username, this.credentials.password).then(
      function () {
	      toastr.success("Bienvenido al Sistema");
        $state.go('root.home');        
      },
      function (error) {
        toastr.error(error.reason);
      }
    )
  }
  
  this.guardarPizarron = function(pizarron){
	  var pizarra = Pizarrones.findOne();
	  if(pizarra){
		  Pizarrones.update(rc.pizarron._id, {$set:rc.pizarron});
		  
		}else{
			Pizarrones.insert(rc.pizarron);
		}
  }
  
  this.autorun(() => {
    console.log('Autorun!!', this.getReactively('pizarron'));
  });
  
  this.helpers({
	  pizarrones : () => {
		  return Pizarrones.findOne();
	  }
  })
  
  window.onload = function() {
		
	    
    // Fill Window Width and Height
    myCanvas.width = window.innerWidth;
		myCanvas.height = window.innerHeight;
		
		// Set Background Color
    rc.pizarron.fillStyle="#fff";
    rc.pizarron.fillRect(0,0,myCanvas.width,myCanvas.height);
		
		// Mouse Event Handlers
		if(myCanvas){
			rc.isDown = false;
			var canvasX, canvasY;
			rc.pizarron.lineWidth = 5;
			
			$(myCanvas)
			.mousedown(function(e){
				
				rc.isDown = true;
				rc.pizarron.beginPath();
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				rc.pizarron.moveTo(canvasX, canvasY);
			})
			.mousemove(function(e){
				if(rc.isDown !== false) {
					canvasX = e.pageX - myCanvas.offsetLeft;
					canvasY = e.pageY - myCanvas.offsetTop;
					rc.pizarron.lineTo(canvasX, canvasY);
					rc.pizarron.strokeStyle = "#000";
					rc.pizarron.stroke();					
				}
			})
			.mouseup(function(e){
				console.log(rc.pizarron);
				rc.isDown = false;
				rc.pizarron.closePath();
				
			});
		}
		
		// Touch Events Handlers
		draw = {
			started: false,
			start: function(evt) {
				rc.pizarron.beginPath();
				rc.pizarron.moveTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);
	
				this.started = true;
	
			},
			move: function(evt) {
	
				if (this.started) {
					rc.pizarron.lineTo(
						evt.touches[0].pageX,
						evt.touches[0].pageY
					);
	
					rc.pizarron.strokeStyle = "#000";
					rc.pizarron.lineWidth = 5;
					rc.pizarron.stroke();
				}
	
			},
			end: function(evt) {
				this.started = false;
				console.log("terminé", evt);
			}
		};
		
		// Touch Events
		myCanvas.addEventListener('touchstart', draw.start, false);
		myCanvas.addEventListener('touchend', draw.end, false);
		myCanvas.addEventListener('touchmove', draw.move, false);
		
		// Disable Page Move
		document.body.addEventListener('touchmove',function(evt){
			evt.preventDefault();
		},false);
	};
}