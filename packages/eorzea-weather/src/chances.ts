import Weather from './weathers';
import Zone from './zones';

export type ChanceEntry = [number, Weather];

const Chances = {} as Record<Zone, ChanceEntry[]>;
export default Chances;

export const DefaultChances = [[Infinity, Weather.FairSkies]] as ChanceEntry[];

Chances[Zone.AmhAraeng] = [
  [45, Weather.FairSkies],
  [60, Weather.Clouds],
  [70, Weather.DustStorms],
  [80, Weather.HeatWaves],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.AzysLla] = [
  [35, Weather.FairSkies],
  [70, Weather.Clouds],
  [Infinity, Weather.Thunder],
];

Chances[Zone.BozjanSouthernFront] = [
  [52, Weather.FairSkies],
  [64, Weather.Rain],
  [76, Weather.Wind],
  [88, Weather.Thunder],
  [Infinity, Weather.DustStorms],
];

Chances[Zone.CentralShroud] = [
  [5, Weather.Thunder],
  [20, Weather.Rain],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [55, Weather.FairSkies],
  [85, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.CentralThanalan] = [
  [15, Weather.DustStorms],
  [55, Weather.ClearSkies],
  [75, Weather.FairSkies],
  [85, Weather.Clouds],
  [95, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.CoerthasCentralHighlands] = [
  [20, Weather.Blizzards],
  [60, Weather.Snow],
  [70, Weather.FairSkies],
  [75, Weather.ClearSkies],
  [90, Weather.Clouds],
  [Infinity, Weather.Fog],
];

Chances[Zone.CoerthasWesternHighlands] = [
  [20, Weather.Blizzards],
  [60, Weather.Snow],
  [70, Weather.FairSkies],
  [75, Weather.ClearSkies],
  [90, Weather.Clouds],
  [Infinity, Weather.Fog],
];

Chances[Zone.EastShroud] = [
  [5, Weather.Thunder],
  [20, Weather.Rain],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [55, Weather.FairSkies],
  [85, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.EasternLaNoscea] = [
  [5, Weather.Fog],
  [50, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [90, Weather.Clouds],
  [95, Weather.Rain],
  [Infinity, Weather.Showers],
];

Chances[Zone.EasternThanalan] = [
  [40, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [70, Weather.Clouds],
  [80, Weather.Fog],
  [85, Weather.Rain],
  [Infinity, Weather.Showers],
];

// WeatherRate: 134
Chances[Zone.Elpis] = [
  [25, Weather.Clouds],
  [40, Weather.UmbralWind],
  [85, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

// WeatherRate: 142
Chances[Zone.Empyreum] = [
  [5, Weather.Snow],
  [25, Weather.FairSkies],
  [65, Weather.ClearSkies],
  [80, Weather.Clouds],
  [Infinity, Weather.Fog],
];

Chances[Zone.Eulmore] = [
  [10, Weather.Gales],
  [20, Weather.Rain],
  [30, Weather.Fog],
  [45, Weather.Clouds],
  [85, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.EurekaAnemos] = [
  [30, Weather.FairSkies],
  [60, Weather.Gales],
  [90, Weather.Showers],
  [Infinity, Weather.Snow],
];

Chances[Zone.EurekaHydatos] = [
  [12, Weather.FairSkies],
  [34, Weather.Showers],
  [56, Weather.Gloom],
  [78, Weather.Thunderstorms],
  [Infinity, Weather.Snow],
];

Chances[Zone.EurekaPagos] = [
  [10, Weather.FairSkies],
  [28, Weather.Fog],
  [46, Weather.HeatWaves],
  [64, Weather.Snow],
  [82, Weather.Thunder],
  [Infinity, Weather.Blizzards],
];

Chances[Zone.EurekaPyros] = [
  [10, Weather.FairSkies],
  [28, Weather.HeatWaves],
  [46, Weather.Thunder],
  [64, Weather.Blizzards],
  [82, Weather.UmbralWind],
  [Infinity, Weather.Snow],
];

// WeatherRate: 133
Chances[Zone.Garlemald] = [
  [45, Weather.Snow],
  [50, Weather.Thunder],
  [55, Weather.Rain],
  [60, Weather.Fog],
  [85, Weather.Clouds],
  [95, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.Gridania] = [
  [20, Weather.Rain],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [55, Weather.FairSkies],
  [85, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.Idyllshire] = [
  [10, Weather.Clouds],
  [20, Weather.Fog],
  [30, Weather.Rain],
  [40, Weather.Showers],
  [70, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.IlMheg] = [
  [10, Weather.Rain],
  [20, Weather.Fog],
  [35, Weather.Clouds],
  [45, Weather.Thunderstorms],
  [60, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.Ishgard] = [
  [60, Weather.Snow],
  [70, Weather.FairSkies],
  [75, Weather.ClearSkies],
  [90, Weather.Clouds],
  [Infinity, Weather.Fog],
];

Chances[Zone.Kholusia] = [
  [10, Weather.Gales],
  [20, Weather.Rain],
  [30, Weather.Fog],
  [45, Weather.Clouds],
  [85, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.Kugane] = [
  [10, Weather.Rain],
  [20, Weather.Fog],
  [40, Weather.Clouds],
  [80, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

// WeatherRate: 131
Chances[Zone.Labyrinthos] = [
  [15, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [85, Weather.Clouds],
  [Infinity, Weather.Rain],
];

Chances[Zone.Lakeland] = [
  [20, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [75, Weather.Clouds],
  [85, Weather.Fog],
  [95, Weather.Rain],
  [Infinity, Weather.Thunderstorms],
];

Chances[Zone.LimsaLominsa] = [
  [20, Weather.Clouds],
  [50, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [90, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.LowerLaNoscea] = [
  [20, Weather.Clouds],
  [50, Weather.ClearSkies],
  [70, Weather.FairSkies],
  [80, Weather.Wind],
  [90, Weather.Fog],
  [Infinity, Weather.Rain],
];

// WeatherRate: 135
Chances[Zone.MareLamentorum] = [
  [15, Weather.UmbralWind],
  [30, Weather.MoonDust],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.MiddleLaNoscea] = [
  [20, Weather.Clouds],
  [50, Weather.ClearSkies],
  [70, Weather.FairSkies],
  [80, Weather.Wind],
  [90, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.Mist] = [
  [20, Weather.Clouds],
  [50, Weather.ClearSkies],
  [70, Weather.FairSkies],
  [80, Weather.FairSkies],
  [90, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.MorDhona] = [
  [15, Weather.Clouds],
  [30, Weather.Fog],
  [60, Weather.Gloom],
  [75, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.NorthShroud] = [
  [5, Weather.Fog],
  [10, Weather.Showers],
  [25, Weather.Rain],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [70, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.NorthernThanalan] = [
  [5, Weather.ClearSkies],
  [20, Weather.FairSkies],
  [50, Weather.Clouds],
  [Infinity, Weather.Fog],
];

// WeatherRate: 137
Chances[Zone.OldSharlayan] = [
  [10, Weather.ClearSkies],
  [50, Weather.FairSkies],
  [70, Weather.Clouds],
  [85, Weather.Fog],
  [Infinity, Weather.Snow],
];

Chances[Zone.OuterLaNoscea] = [
  [30, Weather.ClearSkies],
  [50, Weather.FairSkies],
  [70, Weather.Clouds],
  [85, Weather.Fog],
  [Infinity, Weather.Rain],
];

// WeatherRate: 138
Chances[Zone.RadzAtHan] = [
  [10, Weather.Fog],
  [25, Weather.Rain],
  [40, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [Infinity, Weather.Clouds],
];

Chances[Zone.RhalgrsReach] = [
  [15, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [80, Weather.Clouds],
  [90, Weather.Fog],
  [Infinity, Weather.Thunder],
];

Chances[Zone.Shirogane] = [
  [10, Weather.Rain],
  [20, Weather.Fog],
  [40, Weather.Clouds],
  [80, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.SouthShroud] = [
  [5, Weather.Fog],
  [10, Weather.Thunderstorms],
  [25, Weather.Thunder],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [70, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.SouthernThanalan] = [
  [20, Weather.HeatWaves],
  [60, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [90, Weather.Clouds],
  [Infinity, Weather.Fog],
];

// WeatherRate: 132
Chances[Zone.Thavnair] = [
  [10, Weather.Fog],
  [20, Weather.Rain],
  [25, Weather.Showers],
  [40, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [Infinity, Weather.Clouds],
];

Chances[Zone.TheAzimSteppe] = [
  [5, Weather.Gales],
  [10, Weather.Wind],
  [17, Weather.Rain],
  [25, Weather.Fog],
  [35, Weather.Clouds],
  [75, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.TheChurningMists] = [
  [10, Weather.Clouds],
  [20, Weather.Gales],
  [40, Weather.UmbralStatic],
  [70, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.TheCrystarium] = [
  [20, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [75, Weather.Clouds],
  [85, Weather.Fog],
  [95, Weather.Rain],
  [Infinity, Weather.Thunderstorms],
];

Chances[Zone.TheDiadem] = [
  [30, Weather.FairSkies],
  [60, Weather.Fog],
  [90, Weather.Wind],
  [Infinity, Weather.UmbralWind],
];

Chances[Zone.TheDravanianForelands] = [
  [10, Weather.Clouds],
  [20, Weather.Fog],
  [30, Weather.Thunder],
  [40, Weather.DustStorms],
  [70, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.TheDravanianHinterlands] = [
  [10, Weather.Clouds],
  [20, Weather.Fog],
  [30, Weather.Rain],
  [40, Weather.Showers],
  [70, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.TheFringes] = [
  [15, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [80, Weather.Clouds],
  [90, Weather.Fog],
  [Infinity, Weather.Thunder],
];

Chances[Zone.TheGoblet] = [
  [40, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [85, Weather.Clouds],
  [95, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.TheLavenderBeds] = [
  [5, Weather.Clouds],
  [20, Weather.Rain],
  [30, Weather.Fog],
  [40, Weather.Clouds],
  [55, Weather.FairSkies],
  [85, Weather.ClearSkies],
  [Infinity, Weather.FairSkies],
];

Chances[Zone.TheLochs] = [
  [20, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [80, Weather.Clouds],
  [90, Weather.Fog],
  [Infinity, Weather.Thunderstorms],
];

Chances[Zone.ThePeaks] = [
  [10, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [75, Weather.Clouds],
  [85, Weather.Fog],
  [95, Weather.Wind],
  [Infinity, Weather.DustStorms],
];

Chances[Zone.TheRaktikaGreatwood] = [
  [10, Weather.Fog],
  [20, Weather.Rain],
  [30, Weather.UmbralWind],
  [45, Weather.ClearSkies],
  [85, Weather.FairSkies],
  [Infinity, Weather.Clouds],
];

Chances[Zone.TheRubySea] = [
  [10, Weather.Thunder],
  [20, Weather.Wind],
  [35, Weather.Clouds],
  [75, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.TheSeaOfClouds] = [
  [30, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [70, Weather.Clouds],
  [80, Weather.Fog],
  [90, Weather.Wind],
  [Infinity, Weather.UmbralWind],
];

Chances[Zone.TheTempest] = [
  [20, Weather.Clouds],
  [80, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.Uldah] = [
  [40, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [85, Weather.Clouds],
  [95, Weather.Fog],
  [Infinity, Weather.Rain],
];

// WeatherRate: 136
Chances[Zone.UltimaThule] = [
  [15, Weather.AstromagneticStorm],
  [70, Weather.FairSkies],
  [Infinity, Weather.UmbralWind],
];

Chances[Zone.UpperLaNoscea] = [
  [30, Weather.ClearSkies],
  [50, Weather.FairSkies],
  [70, Weather.Clouds],
  [80, Weather.Fog],
  [90, Weather.Thunder],
  [Infinity, Weather.Thunderstorms],
];

Chances[Zone.WesternLaNoscea] = [
  [10, Weather.Fog],
  [40, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [80, Weather.Clouds],
  [90, Weather.Wind],
  [Infinity, Weather.Gales],
];

Chances[Zone.WesternThanalan] = [
  [40, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [85, Weather.Clouds],
  [95, Weather.Fog],
  [Infinity, Weather.Rain],
];

Chances[Zone.WolvesDenPier] = [
  [20, Weather.Clouds],
  [50, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [90, Weather.Fog],
  [Infinity, Weather.Thunderstorms],
];

Chances[Zone.Yanxia] = [
  [5, Weather.Showers],
  [15, Weather.Rain],
  [25, Weather.Fog],
  [40, Weather.Clouds],
  [80, Weather.FairSkies],
  [Infinity, Weather.ClearSkies],
];

Chances[Zone.Zadnor] = [
  [60, Weather.FairSkies],
  [70, Weather.Rain],
  [80, Weather.Wind],
  [90, Weather.Thunder],
  [Infinity, Weather.Snow],
];

Chances[Zone.UnnamedIsland] = [
  [25, Weather.ClearSkies],
  [70, Weather.FairSkies],
  [80, Weather.Clouds],
  [90, Weather.Rain],
  [95, Weather.Fog],
  [Infinity, Weather.Showers]
];

// WeatherRate: 159
Chances[Zone.Tuliyollal] = [
  [40, Weather.ClearSkies],
  [80, Weather.FairSkies],
  [85, Weather.Clouds],
  [95, Weather.Fog],
  [Infinity, Weather.Rain]
];

// WeatherRate: 160
Chances[Zone.Urqopacha] = [
  [20, Weather.ClearSkies],
  [50, Weather.FairSkies],
  [70, Weather.Clouds],
  [80, Weather.Fog],
  [90, Weather.Wind],
  [Infinity, Weather.Snow]
];

// WeatherRate: 161
Chances[Zone.Kozamauka] = [
  [25, Weather.ClearSkies],
  [60, Weather.FairSkies],
  [75, Weather.Clouds],
  [85, Weather.Fog],
  [95, Weather.Rain],
  [Infinity, Weather.Showers]
];

// WeatherRate: 162
Chances[Zone.YakTel] = [
  [15, Weather.ClearSkies],
  [55, Weather.FairSkies],
  [70, Weather.Clouds],
  [85, Weather.Fog],
  [Infinity, Weather.Rain]
];

// Weather: 163
Chances[Zone.SolutionNine] = [
  [Infinity, Weather.FairSkies]
];

// Weather: 164
Chances[Zone.Shaaloani] = [
  [5, Weather.ClearSkies],
  [50, Weather.FairSkies],
  [70, Weather.Clouds],
  [85, Weather.DustStorms],
  [Infinity, Weather.Gales]
];

// Weather: 165
Chances[Zone.HeritageFound] = [
  [5, Weather.FairSkies],
  [25, Weather.Clouds],
  [40, Weather.Fog],
  [45, Weather.Rain],
  [50, Weather.Thunderstorms],
  [Infinity, Weather.UmbralStatic]
];

// Weather: 166
Chances[Zone.LivingMemory] = [
  [10, Weather.Rain],
  [20, Weather.Fog],
  [40, Weather.Clouds],
  [Infinity, Weather.FairSkies]
];
