import Chances, { ChanceEntry, DefaultChances } from './chances';
import * as locales from './locales';
import calculateForecastTarget from './utils/calculateForecastTarget';
import { EIGHT_HOURS, getDayStartTime, ONE_DAY } from './utils/time';
import WeatherType from './weathers';
import Zone from './zones';

const DEFAULT_LOCALE = 'en';

export type Locale = keyof typeof locales;
export type LocaleKey = keyof typeof locales.en;

export interface EorzeaWeatherOptions {
  locale?: Locale;
}

export type ForecastEntry = {
  id: WeatherType;
  name: string;
  startedAt: Date;
  endedAt: Date;
};

function pickChance(chance: number, chances: ChanceEntry[]): WeatherType {
  for (const entry of chances) {
    if (chance < entry[0]) return entry[1];
  }

  return WeatherType.FairSkies;
}

export default class EorzeaWeather {
  static WEATHER_ASTROMAGNETIC_STORM = WeatherType.AstromagneticStorm;
  static WEATHER_BLIZZARDS = WeatherType.Blizzards;
  static WEATHER_CLEAR_SKIES = WeatherType.ClearSkies;
  static WEATHER_CLOUDS = WeatherType.Clouds;
  static WEATHER_DUST_STORMS = WeatherType.DustStorms;
  static WEATHER_FAIR_SKIES = WeatherType.FairSkies;
  static WEATHER_FOG = WeatherType.Fog;
  static WEATHER_GALES = WeatherType.Gales;
  static WEATHER_GLOOM = WeatherType.Gloom;
  static WEATHER_HEAT_WAVES = WeatherType.HeatWaves;
  static WEATHER_MOON_DUST = WeatherType.MoonDust;
  static WEATHER_RAIN = WeatherType.Rain;
  static WEATHER_SHOWERS = WeatherType.Showers;
  static WEATHER_SNOW = WeatherType.Snow;
  static WEATHER_THUNDER = WeatherType.Thunder;
  static WEATHER_THUNDERSTORMS = WeatherType.Thunderstorms;
  static WEATHER_UMBRAL_STATIC = WeatherType.UmbralStatic;
  static WEATHER_UMBRAL_WIND = WeatherType.UmbralWind;
  static WEATHER_WIND = WeatherType.Wind;

  static WeatherType = WeatherType;
  static Zone = Zone;

  static ZONE_AMH_ARAENG = Zone.AmhAraeng;
  static ZONE_AZYS_LLA = Zone.AzysLla;
  static ZONE_BOZJAN_SOUTHERN_FRONT = Zone.BozjanSouthernFront;
  static ZONE_CENTRAL_SHROUD = Zone.CentralShroud;
  static ZONE_CENTRAL_THANALAN = Zone.CentralThanalan;
  static ZONE_COERTHAS_CENTRAL_HIGHLANDS = Zone.CoerthasCentralHighlands;
  static ZONE_COERTHAS_WESTERN_HIGHLANDS = Zone.CoerthasWesternHighlands;
  static ZONE_EAST_SHROUD = Zone.EastShroud;
  static ZONE_EASTERN_LA_NOSCEA = Zone.EasternLaNoscea;
  static ZONE_EASTERN_THANALAN = Zone.EasternThanalan;
  static ZONE_ELPIS = Zone.Elpis;
  static ZONE_EMPYREUM = Zone.Empyreum;
  static ZONE_EULMORE = Zone.Eulmore;
  static ZONE_EUREKA_ANEMOS = Zone.EurekaAnemos;
  static ZONE_EUREKA_HYDATOS = Zone.EurekaHydatos;
  static ZONE_EUREKA_PAGOS = Zone.EurekaPagos;
  static ZONE_EUREKA_PYROS = Zone.EurekaPyros;
  static ZONE_GARLEMALD = Zone.Garlemald;
  static ZONE_GRIDANIA = Zone.Gridania;
  static ZONE_IDYLLSHIRE = Zone.Idyllshire;
  static ZONE_IL_MHEG = Zone.IlMheg;
  static ZONE_ISHGARD = Zone.Ishgard;
  static ZONE_KHOLUSIA = Zone.Kholusia;
  static ZONE_KUGANE = Zone.Kugane;
  static ZONE_LABYRINTHOS = Zone.Labyrinthos;
  static ZONE_LAKELAND = Zone.Lakeland;
  static ZONE_LIMSA_LOMINSA = Zone.LimsaLominsa;
  static ZONE_LOWER_LA_NOSCEA = Zone.LowerLaNoscea;
  static ZONE_MARE_LAMENTORUM = Zone.MareLamentorum;
  static ZONE_MIDDLE_LA_NOSCEA = Zone.MiddleLaNoscea;
  static ZONE_MIST = Zone.Mist;
  static ZONE_MOR_DHONA = Zone.MorDhona;
  static ZONE_NORTH_SHROUD = Zone.NorthShroud;
  static ZONE_NORTHERN_THANALAN = Zone.NorthernThanalan;
  static ZONE_OLD_SHARLAYAN = Zone.OldSharlayan;
  static ZONE_OUTER_LA_NOSCEA = Zone.OuterLaNoscea;
  static ZONE_RADZ_AT_HAN = Zone.RadzAtHan;
  static ZONE_RHALGRS_REACH = Zone.RhalgrsReach;
  static ZONE_SHIROGANE = Zone.Shirogane;
  static ZONE_SOUTH_SHROUD = Zone.SouthShroud;
  static ZONE_SOUTHERN_THANALAN = Zone.SouthernThanalan;
  static ZONE_THAVNAIR = Zone.Thavnair;
  static ZONE_THE_AZIM_STEPPE = Zone.TheAzimSteppe;
  static ZONE_THE_CHURNING_MISTS = Zone.TheChurningMists;
  static ZONE_THE_CRYSTARIUM = Zone.TheCrystarium;
  static ZONE_THE_DIADEM = Zone.TheDiadem;
  static ZONE_THE_DRAVANIAN_FORELANDS = Zone.TheDravanianForelands;
  static ZONE_THE_DRAVANIAN_HINTERLANDS = Zone.TheDravanianHinterlands;
  static ZONE_THE_FRINGES = Zone.TheFringes;
  static ZONE_THE_GOBLET = Zone.TheGoblet;
  static ZONE_THE_LAVENDER_BEDS = Zone.TheLavenderBeds;
  static ZONE_THE_LOCHS = Zone.TheLochs;
  static ZONE_THE_PEAKS = Zone.ThePeaks;
  static ZONE_THE_RAKTIKA_GREATWOOD = Zone.TheRaktikaGreatwood;
  static ZONE_THE_RUBY_SEA = Zone.TheRubySea;
  static ZONE_THE_SEA_OF_CLOUDS = Zone.TheSeaOfClouds;
  static ZONE_THE_TEMPEST = Zone.TheTempest;
  static ZONE_ULDAH = Zone.Uldah;
  static ZONE_ULTIMA_THULE = Zone.UltimaThule;
  static ZONE_UPPER_LA_NOSCEA = Zone.UpperLaNoscea;
  static ZONE_WESTERN_LA_NOSCEA = Zone.WesternLaNoscea;
  static ZONE_WESTERN_THANALAN = Zone.WesternThanalan;
  static ZONE_WOLVES_DEN_PIER = Zone.WolvesDenPier;
  static ZONE_YANXIA = Zone.Yanxia;
  static ZONE_ZADNOR = Zone.Zadnor;

  static getWeather(
    zone: Zone,
    date: Date,
    options: EorzeaWeatherOptions = {},
  ): string {
    return new EorzeaWeather(zone, options).getWeather(date);
  }

  #zone: Zone;
  #locale: Locale;

  constructor(
    zone: Zone,
    { locale = DEFAULT_LOCALE }: EorzeaWeatherOptions = {},
  ) {
    this.#zone = zone;
    this.#locale = locale;

    if (!this.validate())
      throw new TypeError(`'${this.#zone}' is not a valid zone ID.`);
  }

  get chances(): ChanceEntry[] {
    return Chances[this.#zone] || DefaultChances;
  }

  get zone(): Zone {
    return this.#zone;
  }

  get locale(): Locale {
    return this.#locale;
  }

  getPossibleWeathers(): WeatherType[] {
    const out = new Set<WeatherType>();
    for (const entry of this.chances) out.add(entry[1]);
    return Array.from(out);
  }

  getWeather(date: Date): string {
    return this.translate(`weathers.${this.getWeatherId(date)}`);
  }

  getWeatherId(date: Date): WeatherType {
    const chance = calculateForecastTarget(date);
    return pickChance(chance, this.chances);
  }

  getZoneName(): string {
    return this.translate(`zones.${this.#zone}`);
  }

  getForecast(date: Date, previousDays = 2, nextDays = 8): ForecastEntry[] {
    const today = getDayStartTime(date).getTime();
    const startTime = today - ONE_DAY * previousDays;
    const endTime = today + ONE_DAY * nextDays;

    const out = [] as ForecastEntry[];

    for (let time = startTime; time < endTime; time += EIGHT_HOURS) {
      const startedAt = new Date(time),
        endedAt = new Date(time + EIGHT_HOURS),
        id = this.getWeatherId(startedAt);

      out.push({
        id,
        name: this.translate(`weathers.${id}`),
        startedAt,
        endedAt,
      });
    }

    return out;
  }

  translate(key: LocaleKey): string {
    const value = locales[this.#locale][key] ?? locales[DEFAULT_LOCALE][key];
    if (!value) {
      throw new TypeError(`'${key}' is undefined translate ID.`);
    }
    return value;
  }

  validate(): boolean {
    const key = `ZONE_${this.#zone
      .replace(/[A-Z]/g, (w) => `_${w}`)
      .toUpperCase()}`;
    return EorzeaWeather[key] === this.#zone;
  }
}
