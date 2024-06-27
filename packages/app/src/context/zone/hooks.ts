import { useMessageFormatter } from '@react-aria/i18n';
import EorzeaWeather from 'eorzea-weather';
import snakeCase from 'lodash/snakeCase';
import { useContext } from 'react';
import Context, { Zone } from './Context';
import messages from './intl';

export function useZone({ id }: { id: string }): Zone {
  const { zones } = useContext(Context);

  return zones[id];
}

type AreaDict = {
  [id: string]: string[];
};

export const areaMap = {
  laNoscea: [
    EorzeaWeather.ZONE_LIMSA_LOMINSA,
    EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA,
    EorzeaWeather.ZONE_LOWER_LA_NOSCEA,
    EorzeaWeather.ZONE_EASTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_WESTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_UPPER_LA_NOSCEA,
    EorzeaWeather.ZONE_OUTER_LA_NOSCEA,
    EorzeaWeather.ZONE_WOLVES_DEN_PIER,
  ],
  theBlackShroud: [
    EorzeaWeather.ZONE_GRIDANIA,
    EorzeaWeather.ZONE_CENTRAL_SHROUD,
    EorzeaWeather.ZONE_EAST_SHROUD,
    EorzeaWeather.ZONE_SOUTH_SHROUD,
    EorzeaWeather.ZONE_NORTH_SHROUD,
  ],
  thanalan: [
    EorzeaWeather.ZONE_ULDAH,
    EorzeaWeather.ZONE_WESTERN_THANALAN,
    EorzeaWeather.ZONE_CENTRAL_THANALAN,
    EorzeaWeather.ZONE_EASTERN_THANALAN,
    EorzeaWeather.ZONE_SOUTHERN_THANALAN,
    EorzeaWeather.ZONE_NORTHERN_THANALAN,
  ],
  ilsabardAndNorth: [
    EorzeaWeather.ZONE_OLD_SHARLAYAN,
    EorzeaWeather.ZONE_LABYRINTHOS,
    EorzeaWeather.ZONE_RADZ_AT_HAN,
    EorzeaWeather.ZONE_THAVNAIR,
    EorzeaWeather.ZONE_GARLEMALD,
  ],
  ishgardAndSurroundingAreas: [
    EorzeaWeather.ZONE_ISHGARD,
    EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS,
    EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS,
    EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS,
    EorzeaWeather.ZONE_AZYS_LLA,
    EorzeaWeather.ZONE_IDYLLSHIRE,
    EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS,
    EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS,
    EorzeaWeather.ZONE_THE_CHURNING_MISTS,
    EorzeaWeather.ZONE_THE_DIADEM,
  ],
  gyrAbania: [
    EorzeaWeather.ZONE_RHALGRS_REACH,
    EorzeaWeather.ZONE_THE_FRINGES,
    EorzeaWeather.ZONE_THE_PEAKS,
    EorzeaWeather.ZONE_THE_LOCHS,
  ],
  othard: [
    EorzeaWeather.ZONE_KUGANE,
    EorzeaWeather.ZONE_THE_RUBY_SEA,
    EorzeaWeather.ZONE_YANXIA,
    EorzeaWeather.ZONE_THE_AZIM_STEPPE,
  ],
  norvrandt: [
    EorzeaWeather.ZONE_THE_CRYSTARIUM,
    EorzeaWeather.ZONE_EULMORE,
    EorzeaWeather.ZONE_LAKELAND,
    EorzeaWeather.ZONE_KHOLUSIA,
    EorzeaWeather.ZONE_AMH_ARAENG,
    EorzeaWeather.ZONE_IL_MHEG,
    EorzeaWeather.ZONE_THE_RAKTIKA_GREATWOOD,
    EorzeaWeather.ZONE_THE_TEMPEST,
  ],
  yokTural: [
    EorzeaWeather.ZONE_TULIYOLLAL,
    EorzeaWeather.ZONE_URQOPACHA,
    EorzeaWeather.ZONE_KOZAMAUKA,
    EorzeaWeather.ZONE_YAK_TEL
  ],
  xakTural: [
    EorzeaWeather.ZONE_SHAALOANI,
    EorzeaWeather.ZONE_HERITAGE_FOUND
  ],
  others: [
    EorzeaWeather.ZONE_MIST,
    EorzeaWeather.ZONE_THE_LAVENDER_BEDS,
    EorzeaWeather.ZONE_THE_GOBLET,
    EorzeaWeather.ZONE_SHIROGANE,
    EorzeaWeather.ZONE_EMPYREUM,
    EorzeaWeather.ZONE_MOR_DHONA,
    EorzeaWeather.ZONE_MARE_LAMENTORUM,
    EorzeaWeather.ZONE_ULTIMA_THULE,
    EorzeaWeather.ZONE_ELPIS,
    EorzeaWeather.ZONE_UNNAMED_ISLAND,
    EorzeaWeather.ZONE_LIVING_MEMORY
  ],
  eureka: [
    EorzeaWeather.ZONE_EUREKA_ANEMOS,
    EorzeaWeather.ZONE_EUREKA_PAGOS,
    EorzeaWeather.ZONE_EUREKA_PYROS,
    EorzeaWeather.ZONE_EUREKA_HYDATOS,
  ],
  bozja: [EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT, EorzeaWeather.ZONE_ZADNOR],
} as AreaDict;

export type ZoneList = {
  [area: string]: {
    id: string;
    name: string;
    zones: Zone[];
  };
};

export function useZoneList(): ZoneList {
  const { zones } = useContext(Context);
  const formatMessage = useMessageFormatter(messages);

  const out = {} as ZoneList;
  for (const [key, ids] of Object.entries(areaMap)) {
    out[key] = {
      id: key,
      name: formatMessage(snakeCase(key)),
      zones: ids.map((id) => zones[id]),
    };
  }

  return out;

  /*return Object.entries(areaMap).reduce(
    (list, [key, ids]) => ({
      ...list,
      [formatMessage(snakeCase(key))]: ids.map((id) => zones[id]),
    }),
    {},
  );*/
}
