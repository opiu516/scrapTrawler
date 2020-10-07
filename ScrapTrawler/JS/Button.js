button = function(x,y,lenght,height){
	var me = unit(x,y,lenght,height);
	me.cooldown = 0;
	me.toggle = false;
	
	me.print = function(){
		ctx.save();
		if(me.toggle == false)ctx.fillStyle = "red";
		else ctx.fillStyle = "blue";
		var x = me.x - player.x;
		var y = me.y - player.y;
		
		x += Clenght/2;
		y += Cheight/2;
		
		x -= me.lenght/2;
		y -= me.height/2;
		ctx.fillRect(x,y,me.lenght,me.height);
		ctx.restore();
	}
	
	var OU = me.update;
	me.update = function(){
		OU();
		me.cooldown++;
		if(me.cooldown > 25 && me.Collision(player))
		{
			if(rwl.onof == true) rwl.COM();
			else rwl.POM();
			me.toggle = !me.toggle;
			rwl.onof = !rwl.onof;
			console.log("Toggle ");
			me.cooldown = 0 ;
		}
	}
	return me;
}