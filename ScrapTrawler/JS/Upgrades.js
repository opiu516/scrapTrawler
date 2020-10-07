upgrade = function(){
	if(player.scrap >= 3*player.level)
	if(player.level < player.maxLevel){
		player.scrap -=3*player.level;
		player.maxhp += 5;
		player.level ++;
	}

}
drillUpgrade = function(){
	if(player.scrap >= 4*player.DrillLevel)
	if(player.DrillLevel < player.maxLevel){
		player.scrap -= 4*player.DrillLevel;
		player.DrillLevel ++;
		player.Drilldmg += 0.2;
	}
}
upgradestruct = function(x,y,lenght,height,upgradeid){
	var me = unit(x,y,lenght,height);
	me.upgradeid = upgradeid;
	me.skin  = new Image();
	me.timer = 0;
	if(me.upgradeid == 2)
		me.skin.src = "Img/DrillUpgrader.png";
	else 
		me.skin.src = "Img/PlayerUpgrader.png";
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
		me.timer++;
		if(me.timer > 25){
		if(me.Collision(player) == true)
		{
		if(me.upgradeid == 1) upgrade();
		else drillUpgrade();
		me.timer = 0;
		}
		}
	}
	return me;
}