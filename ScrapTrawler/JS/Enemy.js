makeenemy = function(x,y,lenght,height,hp,spdX,spdY){
	var me = unit(x,y,lenght,height);
	me.hp = hp;
	me.spdX = spdX;
	me.spdY = spdY;
	me.direction = 0;
	me.dirc = 0;
	me.id = 0;
	me.skin = new Image;
	me.skin.src = "Img/Enemy.png";
	
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
	
	me.roam = function(){
		
	if(me.dirc % 10 == 0){
		me.direction = Math.floor(Math.random()*4);
	}
	me.dirc ++;
	
	var Tb = {x:me.x , y:me.y - me.height/2 - 1};
	var Bb = {x:me.x , y:me.y + me.height/2};
	var Lb = {x:me.x - me.lenght/2 ,y:me.y};
	var Rb = {x:me.x + me.lenght/2 + 1,y:me.y};
	var RUb = {x:me.x + me.height/3,y:me.y - me.height/3};
	var RDb = {x:me.x + me.height/3,y:me.y + me.height/3};
	var LUb = {x:me.x - me.height/3,y:me.y - me.height/3};
	var LDb = {x:me.x - me.height/3,y:me.y + me.height/3};
		
	 if(me.direction == 3  && IPV(Lb) && IPV(LUb) && IPV(LDb))
		me.x -= me.spdX;
	  if(me.direction == 1 && IPV(Rb) && IPV(RUb) && IPV(RDb))
		me.x += me.spdX;
	  if(me.direction == 0 && IPV(Tb) && IPV(LUb) && IPV(RUb))
		me.y -= me.spdY;
	  if(me.direction == 2 && IPV(Bb) && IPV(RDb) && IPV(LDb))
		me.y += me.spdY;
		
	  if(me.x + me.lenght/2 > mapLenght*tileLenght )me.x = mapLenght*tileLenght - me.lenght/2;
      if(me.x - me.lenght/2 < 0) me.x = 0 + me.lenght/2;
	  if(me.y + me.height/2 > mapHeight*tileHeight )me.y = mapHeight*tileHeight - me.height/2;
	  if(me.y - me.height/2 < 0) me.y = 0 + me.height/2;
	
	}
	me.chase = function(){
	
	var Tb = {x:me.x , y:me.y - me.height/2 - 1};
	var Bb = {x:me.x , y:me.y + me.height/2};
	var Lb = {x:me.x - me.lenght/2 ,y:me.y};
	var Rb = {x:me.x + me.lenght/2 + 1,y:me.y};
	var RUb = {x:me.x + me.height/3,y:me.y - me.height/3};
	var RDb = {x:me.x + me.height/3,y:me.y + me.height/3};
	var LUb = {x:me.x - me.height/3,y:me.y - me.height/3};
	var LDb = {x:me.x - me.height/3,y:me.y + me.height/3};
		
	 if(me.x > player.x  && IPV(Lb) && IPV(LUb) && IPV(LDb)){
		me.x -= me.spdX;
		me.direction = 3;
	 }
	  if(me.x < player.x && IPV(Rb) && IPV(RUb) && IPV(RDb)){
		me.x += me.spdX;
		me.direction = 1;
	  }
	  if(me.y > player.y  && IPV(Tb) && IPV(LUb) && IPV(RUb)){
		me.y -= me.spdY;
		me.direction = 0;
	  }
	  if(me.y < player.y && IPV(Bb) && IPV(RDb) && IPV(LDb)){
		me.y += me.spdY;
		me.direction = 2;
	  }
		
	  if(me.x + me.lenght/2 > mapLenght*tileLenght )me.x = mapLenght*tileLenght - me.lenght/2;
      if(me.x - me.lenght/2 < 0) me.x = 0 + me.lenght/2;
	  if(me.y + me.height/2 > mapHeight*tileHeight )me.y = mapHeight*tileHeight - me.height/2;
	  if(me.y - me.height/2 < 0) me.y = 0 + me.height/2;
	
	}
	var OU = me.update;
	me.update = function(){
		OU();
		if(me.distance(player) < 5*tileHeight ){
		me.chase();
		me.spdY = 3;
		me.spdX = 3;
		}
		else{
		me.roam();
		me.spdY = 1;
		me.spdX = 1;
		}
		if(me.Collision (player)) player.hp--;
		if(me.Collision(player.drill)) me.hp -= player.Drilldmg;
		if(me.hp < 0){
		delete enemyList[me.id];
	}
	}
	return me;
}
generateEnemy = function(){
		var x = (Math.floor(Math.random()*13)+6)*tileLenght;
		var y = (Math.floor(Math.random()*19)+1)*tileHeight;
		var id = Math.random();
		var Hp = Math.floor(Math.random()*15) + 15;
		var enemy = makeenemy(x,y,1*tileLenght,1*tileHeight,Hp,1,1);
		var counter = 0;
		while(IPVR(enemy) == false || IPVE(enemy) == false || IPVP(enemy) == false|| IPVM(enemy) == false || enemy.distance(player) < 5*tileLenght) {
			enemy.x = (Math.floor(Math.random()*13)+6)*tileLenght;
			enemy.y = (Math.floor(Math.random()*19)+1)*tileHeight;
			counter++;
			if(counter > 100) return;
			
		}
		console.log("Enemy : "+x+"- x y -"+y+" Hp - "+Hp+" ID- "+id + "  From try - "+ counter); 
		enemy.id = id;
		enemyList[id] = enemy;
	}