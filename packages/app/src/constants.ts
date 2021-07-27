import EorzeaWeather from 'eorzea-weather';

export const AVAILABLE_LOCALES: Record<string, string> = {
  en: 'English',
  ja: '日本語',
  de: 'Deutsch',
  fr: 'Français',
};

export const HOUR = 175 * 1000;
export const EIGHT_HOURS = 8 * HOUR;
export const ONE_DAY = 24 * HOUR;

export const XIVAPI_DOMAIN = 'https://xivapi.com';

type IconList = {
  [id: string]: number;
};

export const WEATHER_ICONS = {
  blizzards: 60216,
  clearSkies: 60201,
  clouds: 60203,
  dustStorms: 60211,
  fairSkies: 60202,
  fog: 60204,
  gales: 60206,
  gloom: 60218,
  heatWaves: 60214,
  rain: 60207,
  showers: 60208,
  snow: 60215,
  thunder: 60209,
  thunderstorms: 60210,
  umbralStatic: 60220,
  umbralWind: 60219,
  wind: 60205,
} as IconList;

export const EORZEA_ZONE_LIST = [
  EorzeaWeather.ZONE_AMH_ARAENG,
  EorzeaWeather.ZONE_AZYS_LLA,
  EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
  EorzeaWeather.ZONE_CENTRAL_SHROUD,
  EorzeaWeather.ZONE_CENTRAL_THANALAN,
  EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS,
  EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS,
  EorzeaWeather.ZONE_EAST_SHROUD,
  EorzeaWeather.ZONE_EASTERN_LA_NOSCEA,
  EorzeaWeather.ZONE_EASTERN_THANALAN,
  EorzeaWeather.ZONE_EULMORE,
  EorzeaWeather.ZONE_EUREKA_ANEMOS,
  EorzeaWeather.ZONE_EUREKA_HYDATOS,
  EorzeaWeather.ZONE_EUREKA_PAGOS,
  EorzeaWeather.ZONE_EUREKA_PYROS,
  EorzeaWeather.ZONE_GRIDANIA,
  EorzeaWeather.ZONE_IDYLLSHIRE,
  EorzeaWeather.ZONE_IL_MHEG,
  EorzeaWeather.ZONE_ISHGARD,
  EorzeaWeather.ZONE_KHOLUSIA,
  EorzeaWeather.ZONE_KUGANE,
  EorzeaWeather.ZONE_LAKELAND,
  EorzeaWeather.ZONE_LIMSA_LOMINSA,
  EorzeaWeather.ZONE_LOWER_LA_NOSCEA,
  EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA,
  EorzeaWeather.ZONE_MIST,
  EorzeaWeather.ZONE_MOR_DHONA,
  EorzeaWeather.ZONE_NORTH_SHROUD,
  EorzeaWeather.ZONE_NORTHERN_THANALAN,
  EorzeaWeather.ZONE_OUTER_LA_NOSCEA,
  EorzeaWeather.ZONE_RHALGRS_REACH,
  EorzeaWeather.ZONE_SHIROGANE,
  EorzeaWeather.ZONE_SOUTH_SHROUD,
  EorzeaWeather.ZONE_SOUTHERN_THANALAN,
  EorzeaWeather.ZONE_THE_AZIM_STEPPE,
  EorzeaWeather.ZONE_THE_CHURNING_MISTS,
  EorzeaWeather.ZONE_THE_CRYSTARIUM,
  EorzeaWeather.ZONE_THE_DIADEM,
  EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS,
  EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS,
  EorzeaWeather.ZONE_THE_FRINGES,
  EorzeaWeather.ZONE_THE_GOBLET,
  EorzeaWeather.ZONE_THE_LAVENDER_BEDS,
  EorzeaWeather.ZONE_THE_LOCHS,
  EorzeaWeather.ZONE_THE_PEAKS,
  EorzeaWeather.ZONE_THE_RAKTIKA_GREATWOOD,
  EorzeaWeather.ZONE_THE_RUBY_SEA,
  EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS,
  EorzeaWeather.ZONE_THE_TEMPEST,
  EorzeaWeather.ZONE_ULDAH,
  EorzeaWeather.ZONE_UPPER_LA_NOSCEA,
  EorzeaWeather.ZONE_WESTERN_LA_NOSCEA,
  EorzeaWeather.ZONE_WESTERN_THANALAN,
  EorzeaWeather.ZONE_WOLVES_DEN_PIER,
  EorzeaWeather.ZONE_YANXIA,
  EorzeaWeather.ZONE_ZADNOR,
];
