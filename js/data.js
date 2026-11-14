// Last-known status of each machine (used by the home page ticker)
var machines = [
  { name: "Apollo Lunar Modules", slug: "apollo-lunar-modules", year: 1972, note: "Apollo 17 left the last descent stage" },
  { name: "Lunar Roving Vehicles", slug: "lunar-roving-vehicles", year: 1972, note: "Apollo 17 rover parked at Taurus-Littrow" },
  { name: "ALSEP Science Stations", slug: "alsep-science-stations", year: 1977, note: "Ground control switched off all stations on 30 September" },
  { name: "Surveyor Landers", slug: "surveyor-landers", year: 1968, note: "Surveyor 7 fell silent after the lunar night" },
  { name: "Sojourner Rover", slug: "sojourner-rover", year: 1997, note: "Last signal from the Pathfinder system, 27 September" },
  { name: "Spirit and Opportunity", slug: "spirit-and-opportunity", year: 2018, note: "Opportunity lost to a global dust storm; Spirit ended 2010" },
  { name: "Viking 1 and 2 Landers", slug: "viking-1-and-2-landers", year: 1982, note: "Viking 1 lander lost after a command error, 11 November" },
  { name: "Phoenix and InSight", slug: "phoenix-and-insight", year: 2022, note: "InSight mission ended 21 December after dust covered its panels" },
  { name: "Dawn", slug: "dawn", year: 2018, note: "Fuel ran out; NASA announced the end on 1 November" },
  { name: "NEAR Shoemaker", slug: "near-shoemaker", year: 2001, note: "Last contact on 28 February, two weeks after landing" },
  { name: "Pioneer 10 and 11", slug: "pioneer-10-and-11", year: 2003, note: "Pioneer 10's last faint signal, 23 January (Pioneer 11 lost 1995)" },
  { name: "Ingenuity Helicopter", slug: "ingenuity-helicopter", year: 2024, note: "NASA ended the mission on 25 January" },
  { name: "Kepler Space Telescope", slug: "kepler-space-telescope", year: 2018, note: "Fuel ran out; retired on 30 October" }
];
