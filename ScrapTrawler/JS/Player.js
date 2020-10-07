makeplayer = function(x,y,lenght,height,spdX,spdY){
	var me = unit(x,y,lenght,height);
	me.spdX = spdX;
	me.spdY = spdY;
	me.skin = new Image();
	me.skin.src = "Img/Player.png";
	me.Left = false;
	me.Right = false;
	me.Up = false;
	me.Down = false;
	me.direction = 0;
	me.score = 0;
	me.hp = 20;
	me.scrap = 0;
	me.maxhp = 30
	me.level = 1;
	me.maxLevel = 5;
	
	
	//drill
	me.Drill = false;
	me.DrillLevel = 1;
	me.Drilldmg = 1;
	me.drill = unit(me.x,me.y,me.lenght/2,me.height);
	me.drill.skinvert = new Image();
	me.drill.skinvert.src = "Img/Drillvert.png";
	me.drill.skinhorz = new Image();
	me.drill.skinhorz.src = "Img/Drillhorz.png";
	me.drill.print = function(){
		
		ctx.save();
		var x = me.drill.x - player.x;
		var y = me.drill.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.drill.lenght/2;
		y -= me.drill.height/2;
		
		lenght = me.drill.skinhorz.width/2;
		
		if(me.direction == 0 )
		ctx.drawImage(me.drill.skinvert,
			0,0,lenght,me.drill.skinvert.height,
			x,y ,me.drill.lenght,me.drill.height,me.drill.lenght
		);
		if(me.direction == 2)
			ctx.drawImage(me.drill.skinvert,
			lenght,0,lenght,me.drill.skinvert.height,
			x ,y,me.drill.lenght,me.drill.height
		);
		if(me.direction == 1)
		ctx.drawImage(me.drill.skinhorz,
			0,0,me.drill.skinhorz.width,lenght,
			x ,y ,me.drill.lenght,me.drill.height
		);	
		if(me.direction == 3)
		ctx.drawImage(me.drill.skinhorz,
			0,lenght,me.drill.skinhorz.width,lenght,
			x ,y,me.drill.lenght,me.drill.height
		);
	 }
	var DOU = me.drill.update;
	me.drill.update = function(){
		
		if(me.direction == 0)
		{
		me.drill.height = me.height;
		me.drill.lenght = me.lenght/2;
		me.drill.x = me.x ;
		me.drill.y = me.y - me.drill.height/2;
		}
		if(me.direction == 2)
		{
		me.drill.height = me.height;
		me.drill.lenght = me.lenght/2;
		me.drill.x = me.x;
		me.drill.y = me.y + me.drill.height/2;
		}
		if(me.direction == 1)
		{
		me.drill.height = me.height/2;
		me.drill.lenght = me.lenght;
		me.drill.x = me.x + me.drill.lenght/2;
		me.drill.y = me.y;
		}
		if(me.direction == 3)
		{
		me.drill.height = me.height/2;
		me.drill.lenght = me.lenght;
		me.drill.x = me.x - me.drill.lenght/2;
		me.drill.y = me.y;
		}
		DOU();
	}
	
	me.dodrill = function(){
	 if(me.Drill == true)
		me.drill.update();
	  else
	  {
		  me.drill.x = 0;
		  me.drill.y = 0;
	  }
	}
	//drill end
	
	me.print = function(){
		ctx.save();
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		
		lenght = me.skin.width/4;
		
		ctx.drawImage(me.skin,
			lenght*me.direction,0,lenght,me.skin.height,
			x,y,me.lenght,me.height
		);
		
		ctx.restore();
	}
	
	
	me.move = function(){
	
	var Tb = {x:me.x , y:me.y - me.height/2 - 1};
	var Bb = {x:me.x , y:me.y + me.height/2};
	var Lb = {x:me.x - me.lenght/2 ,y:me.y};
	var Rb = {x:me.x + me.lenght/2 + 1,y:me.y};
	var RUb = {x:me.x + me.height/3,y:me.y - me.height/3};
	var RDb = {x:me.x + me.height/3,y:me.y + me.height/3};
	var LUb = {x:me.x - me.height/3,y:me.y - me.height/3};
	var LDb = {x:me.x - me.height/3,y:me.y + me.height/3};
		
	 if(me.Left == true && IPV(Lb) && IPV(LUb) && IPV(LDb))
		me.x -= me.spdX;
	  if(me.Right == true && IPV(Rb) && IPV(RUb) && IPV(RDb))
		me.x += me.spdX;
	  if(me.Up == true && IPV(Tb) && IPV(LUb) && IPV(RUb))
		me.y -= me.spdY;
	  if(me.Down == true && IPV(Bb) && IPV(RDb) && IPV(LDb))
		me.y += me.spdY;
		
	  if(me.x + me.lenght/2 > mapLenght*tileLenght )me.x = mapLenght*tileLenght - me.lenght/2;
      if(me.x - me.lenght/2 < 0) me.x = 0 + me.lenght/2;
	  if(me.y + me.height/2 > mapHeight*tileHeight )me.y = mapHeight*tileHeight - me.height/2;
	  if(me.y - me.height/2 < 0) me.y = 0 + me.height/2;
	
	}
	me.printsc = function(){
		ctx.save();
		ctx.font = '15px Arial';
		ctx.fillStyle = "red";
		ctx.fillRect(0,500,500,50);
		ctx.restore();
		ctx.save();
		ctx.font = '15px Arial';
		ctx.fillText("score = " + me.score,10,545);
		ctx.fillText("Hp = " + me.hp + "/"+me.maxhp,10,530);
		ctx.fillText("Scrap = "+ me.scrap, 10,515);
		if(player.DrillLevel < player.maxLevel)
		ctx.fillText("DrillUp cost  -  " + me.DrillLevel*4,200,545);
		else
		ctx.fillText("Drill Max Level ",200,545);
		if(player.level < player.maxLevel)
		ctx.fillText("PlayerUp cost  -  " + me.level*3,200,530);
		else
		ctx.fillText("Player Max Level",200,530);
		ctx.fillText("Mine cost - " + 3,200,515);
		ctx.restore();
		return me.score;
		}
	var OU = me.update;
	me.update = function(){
	me.dodrill();
	OU();
	me.printsc();
	if(me.hp > me.maxhp) me.hp = me.maxhp;
	}
	
	return me;
	}