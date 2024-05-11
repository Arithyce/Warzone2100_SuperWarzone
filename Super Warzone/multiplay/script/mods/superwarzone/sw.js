// Super Warzone

function declarations()
{
	var nuke=0;
	var cool=0;
	var lCool=0;
	var cLimit=0;
	var lCLimit=0;
	var nuke1=0;
	var lNuke1=0;
	var nuke2=0;
	var lNuke2=0;
	var nuke3=0;
	var lNuke3=0;
	var nukeUp=0;
	var lNukeUp=0;
	var nukeC=0;
	var power=0;
	var lPower=0;
	var tPower=0;
	var fPower=0;
	var ticker=0;
	var loplay=0;
	var loname="";
	var nPrint="";
	var cPrint="";
	var lCPrint="";
	var cheat=false;
}

const reactor_upgrades=
{
	nuke1: "ReactorUpgrade01",
	nuke2: "ReactorUpgrade02",
	nuke3: "ReactorUpgrade03"
}; 

const team=playerData.team;

function eventResearched(research,structure,player)
{
	if (getResearch(reactor_upgrades.nuke1,team).done&&player==team)
	{
		nuke1=15;
		lNuke1=30;
	}
	if (getResearch(reactor_upgrades.nuke2,team).done&&player==team)
	{
		nuke2=15;
		lNuke2=30;
	}
	if (getResearch(reactor_upgrades.nuke3,team).done&&player==team)
	{
		nuke3=20;
		lNuke3=40;
	}
	nukeUp=(nuke1+nuke2+nuke3);
	lNukeUp=(lNuke1+lNuke2+lNuke3);
}

function eventCheatMode(entered)
{
	cheat=entered;
	if (cheat===true)
	{
		console("Send \"SpectateMe\" to enter spectator mode...\nThis cannot be undone!");
	}
}

function eventChat(from,to,message)
{
	if (cheat===true&&from==me&&message==="SpectateMe")
	{
		loplay=String(me);
		loname=playerData.name;
		transformPlayerToSpectator(me);
		console("Player ",loplay,"; \"",loname,"\", has become a spectator");
	}
}

function consoleLog()
{
	nPrint=String(tPower);
	cPrint=String(cLimit);
	lCPrint=String(lCLimit);
	console("Nuclear Power = ",nPrint);
	console("Remaining Cooling Towers = ",cPrint);
	console("Remaining Large Cooling Towers = ",lCPrint);
}

function counter()
{
	++ticker;
	if (ticker=>120)
	{
		consoleLog();
		ticker=0;
	}
}

function countNuke()
{
	nuke=countStruct("Nuclear Reactor",me);
	cool=countStruct("Cooling Tower",me);
	lCool=countStruct("Large Cooling Tower",me);
}

function setNuke()
{
	countNuke();
	cLimit=(nuke*4-cool);
	lCLimit=(nuke*2-lCool);
	if ((nuke>=1&&cool>=1)||(nuke>=1&&lCool>=1))
	{
		nukeC=(nuke*(400+nukeUp+lNukeUp));
		power=(cool*(50+nukeUp));
		lPower=(lCool*(100+lNukeUp));
		tPower=(power+lPower);
		if (tPower>nukeC)
		{
			tpower=nukeC;
		}
		fPower=(tPower+(tPower*powerType/2));
		setPower(playerPower(me)+fPower);
		counter();
	}
	else 
	{
		tPower=0;
		counter();
	}
}

function superWarzoneLoaded()
{
	setTimer("setNuke",5000);
	console("Super Warzone Loaded");
}

function eventStartLevel()
{
	queue("declarations",1000);
	queue("superWarzoneLoaded",5000);
}
