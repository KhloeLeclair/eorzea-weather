import Weather from './weathers';
import Zone from './zones';

export type NotableWeather = {
  type: Weather;
  icon?: string;
};

const Notables = {} as Record<Zone, NotableWeather[]>;

Notables[Zone.EurekaAnemos] = [
  {
    type: Weather.Gales,
    icon: 'test',
  },
];
