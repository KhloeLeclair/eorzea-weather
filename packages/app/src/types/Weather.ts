type Weather = {
  id: string;
  name: string;
  startedAt: Date;
  endedAt: Date;
};

export type RawWeather = {
  id: string;
  name: string;
  startedAt: string;
};

export type PossibleWeather = {
  id: string;
  name: string;
};

export default Weather;
