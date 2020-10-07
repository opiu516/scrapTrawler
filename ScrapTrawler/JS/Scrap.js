	Ore = function(x,y,Hp){
	var me = unit(x,y,2*tileHeight,2*tileLenght)
	me.Hp = Hp;
	me.skin = new Image();
	me.skin.src = "Img/Scrap.png";
	me.id = 0;
	me.value = 0;
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
	me.POM();
	if(me.Collision(player.drill)) {
		me.Hp -= player.Drilldmg;
		console.log("mining - " + me.id + " HP -" + me.Hp);
	}
	if(me.Hp < 0){
		me.COM();
		player.score++;
		delete scrapList[me.id];
		if(me.value % 2 == 1)
		player.scrap += 2;
		else 
		if(player.hp < player.maxhp)
			player.hp +=3;
		else
			player.scrap += 2;	
	}
	}
	return me;
	}
	
	makeScrap = function(){
		var x = (Math.floor(Math.random()*8)+11)*tileLenght;
		var y = (Math.floor(Math.random()*19)+1)*tileHeight;
		var id = Math.random();
		var Hp = Math.floor(Math.random()*15) + 40;
		var scrap = Ore(x,y,Hp);
		var counter = 0;
		while(IPVR(scrap) == false || IPVE(scrap) == false || IPVP(scrap) == false || IPVM(scrap) == false) {
			scrap.x = (Math.floor(Math.random()*8)+11)*tileLenght;
			scrap.y = (Math.floor(Math.random()*19)+1)*tileHeight;
			counter++;
			if(counter > 100) return false;
			
		}
		console.log(x+"- x y -"+y+" Hp - "+Hp+" ID- "+id + "  From try - "+ counter);
		scrap.value = Math.floor(Math.random()*4);
		scrap.POM(); 
		scrap.id = id;
		scrapList[id] = scrap;
	}
	