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

export default Weather;
