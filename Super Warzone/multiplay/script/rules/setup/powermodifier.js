/*
To change how much power each Power Level setting gives,
adjust the values 128 and 30. 128 is the base value, while 30 is
how much it changes between Power Level settings.

The math `128 + 30 * powerType`,
is interpreted in this way:
Low Power = 128,
Medium Power = 158,
High Power = 188.

The variable powerType is as follows:
powerType = 0 for Low Power,
powerType = 1 for Medium Power,
powerType = 2 for High Power,
powerType is a variable from the source code,
and is set when a Power Level setting is selected by the player,
please do not attempt to modify it.

To change the difficulty factor of bots,
adjust the last number in the bot section below.

The difficulty factor is interpreted in this way:
Easy = -25% power per second (0.75x),
Medium = +10% power per second (1.1x),
Hard = +50% power per second (1.5x),
Insane = +100% power per second (2x).
*/
function setupPowerModifier(player)
{
	// This sets the player(s) power modifier,
	// it also sets the bots power modifier briefly,
	// but that is quickly overwritten in the bot section below.
	setPowerModifier(128 + 30 * powerType, player);

	// The following sets the power modifier for bots.
	// Insane difficulty is meant to be insane...
	if (playerData[player].difficulty === INSANE)
	{
		setPowerModifier((128 + 30 * powerType) * 2, player);
	}
	else if (playerData[player].difficulty === HARD)
	{
		setPowerModifier((128 + 30 * powerType) * 1.5, player);
	}
	else if (playerData[player].difficulty === MEDIUM)
	{
		setPowerModifier((128 + 30 * powerType) * 1.1, player);
	}
	else if (playerData[player].difficulty === EASY)
	{
		setPowerModifier((128 + 30 * powerType) * 0.75, player);
	}
}

// Power modifier data is currently not saved. Reset it during eventGameLoaded for the moment.
function setupPowerModifierGameLoaded()
{
	for (let i = 0; i < maxPlayers; ++i)
	{
		setupPowerModifier(i);
	}
}
