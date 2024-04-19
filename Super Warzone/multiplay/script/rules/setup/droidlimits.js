function droidLimit(player)	// inside hackNetOff()
{
	setDroidLimit(player, 9999, DROID_ANY);
	setDroidLimit(player, 10, DROID_COMMAND);
	setDroidLimit(player, 25, DROID_CONSTRUCT);
}
