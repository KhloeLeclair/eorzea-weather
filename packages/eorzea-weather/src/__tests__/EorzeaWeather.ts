import EorzeaWeather from '../EorzeaWeather';

test('validate() returns a boolean', () => {
  const eorzeaWeather = new EorzeaWeather(EorzeaWeather.Zone.EurekaAnemos);
  expect(eorzeaWeather.validate()).toBe(true);
});

test('getWeather() returns a weather', () => {
  const eorzeaWeather = new EorzeaWeather(EorzeaWeather.Zone.EurekaAnemos);
  const date = new Date(1522399121529);
  expect(eorzeaWeather.getWeather(date)).toMatch('Showers');
});

test('getZoneName() returns a zone name', () => {
  const eorzeaWeather = new EorzeaWeather(EorzeaWeather.Zone.EurekaAnemos);
  expect(eorzeaWeather.getZoneName()).toMatch('Eureka Anemos');
});
