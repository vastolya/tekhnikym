// City-level coordinates, not bistro entrances. Sources: docs/MAP.md.
export type MapCity = {
  id: string;
  name: string;
  coordinates: [number, number];
  locationIds: string[];
  symbol?: string;
};

export const mapCities: MapCity[] = [
  {"id":"moscow","name":"Москва","coordinates":[37.6175,55.75055555555556],"locationIds":["moscow-dmitrovka","moscow-atrium"],"symbol":"moscow"},
  {"id":"sochi","name":"Роза Хутор","coordinates":[40.296456,43.671261],"locationIds":["rosa-khutor"],"symbol":"sochi"},
  {"id":"tyumen","name":"Тюмень","coordinates":[65.53333333333333,57.15],"locationIds":["tyumen"],"symbol":"tyumen"},
  {"id":"novosibirsk","name":"Новосибирск","coordinates":[82.91666666666667,55.03333333333333],"locationIds":["novosibirsk"],"symbol":"novosibirsk"},
  {"id":"rostov","name":"Ростов-на-Дону","coordinates":[39.71,47.222500000000004],"locationIds":["rostov"],"symbol":"rostov"},
  {"id":"perm","name":"Пермь","coordinates":[56.24888888888889,58.013888888888886],"locationIds":["perm"]},
  {"id":"izhevsk","name":"Ижевск","coordinates":[53.21666666666667,56.85],"locationIds":["izhevsk"]},
  {"id":"almaty","name":"Алма-Ата","coordinates":[76.915,43.24],"locationIds":["almaty"]},
];
