mine = function(x,y,lenght,height){
var me = unit(x,y,lenght,height);
me.id = 0;
me.dmg = 0;
me.skin = new Image();
me.skin.src = "Img/Mine.png";

me.print = function(){
		ctx.save();
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		
		ctx.drawImage(me.skin,
			0,0,me.skin.width,me.skin.height,
			x,y,me.lenght,me.height
		);
		
		ctx.restore();
	}

var OU = me.update;
me.update = function(){
OU();
var td = false;
for(var i in enemyList)
{
	if(me.Collision(enemyList[i])){
		enemyList[i].hp -= me.dmg;
		td = true;
	}
}
if(td == true) delete mineList[me.id];
}	
return me;
}
makeMine = function(){
	var Mine = mine(player.x,player.y,tileLenght/2,tileHeight/2);
	Mine.id = Math.random();
	Mine.dmg = Math.floor(Math.random()*15)+15;
	console.log("making mine");
	mineList[Mine.id] = Mine;
}
