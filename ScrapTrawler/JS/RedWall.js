redWall = function(x,y,lenght,height){
	var me = unit(x,y,lenght,height);
	me.onof = false;
	var OU = me.update;
	me.print = function(){
		ctx.save();
		ctx.fillStyle = "red";
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		ctx.fillRect(x,y,me.lenght,me.height);
		ctx.restore();
	}
	
	me.update = function(){
		if(me.onof == true)
		{	
			OU();
			for(var q in enemyList)
				if(enemyList[q].Collision(me) == true)enemyList[q].hp --;
		}
	}
	return me;
}