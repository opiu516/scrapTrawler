unit = function(x,y,lenght,height){
	var me = {
	x:x,
	y:y,
	lenght:lenght,
	height:height,
	}
	me.update = function(){
		me.print();
		me.move();
	}
	me.move = function(){
	}
	me.print = function(){
		ctx.save();
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		ctx.fillRect(x,y,me.lenght,me.height);
	}
	me.POM = function(){
		var TX = me.x - me.lenght/2;
		var TY = me.y - me.height/2
		var Xcord = Math.floor(TX/tileLenght);
		var Ycord = Math.floor(TY/tileHeight);
		var Tlenght = me.lenght/tileLenght;
		var Theight  = me.height/tileHeight;
		for(var iy = 0; iy < Theight;iy++)
			for(var ix = 0; ix < Tlenght;ix++)
				map[Ycord + iy][Xcord + ix] = 0;
	}
	me.COM = function(){
	var TX = me.x - me.lenght/2;
		var TY = me.y - me.height/2
		var Xcord = Math.floor(TX/tileLenght);
		var Ycord = Math.floor(TY/tileHeight);
		var Tlenght = me.lenght/tileLenght;
		var Theight  = me.height/tileHeight;
		for(var iy = 0; iy < Theight;iy++)
			for(var ix = 0; ix < Tlenght;ix++)
				map[Ycord + iy][Xcord + ix] = 1;
	}
	
	me.Collision = function(E2){
		var rect1 = {
		x:me.x-me.lenght/2,
		y:me.y-me.height/2,
		lenght:me.lenght,
		height:me.height,
		}
		var rect2 = {
		x:E2.x-E2.lenght/2,
		y:E2.y-E2.height/2,
		lenght:E2.lenght,
		height:E2.height,
		}
		return Rcollision(rect1,rect2)
	}
	Rcollision = function(E1,E2){
	  return E1.x <= E2.x + E2.lenght
		  && E2.x <= E1.x + E1.lenght
		  && E1.y <= E2.y + E2.height
		  && E2.y <= E1.y + E1.height;
	}
	me.distance = function( pt ){
		var diffX = me.x - pt.x;
		var diffY = me.y - pt.y;
		return Math.sqrt(diffX*diffX+diffY*diffY);
		
	}
	return me;
	}
	
	