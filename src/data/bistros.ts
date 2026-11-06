// Map page data. Source: the mind-map diagram supplied by the user on 05.11.2026.
// These are supplied design data, not independently verified opening statuses.
// Do not add phone numbers, coordinates, opening dates or routes by inference.
export const locations = [
  {
    id: "moscow-dmitrovka",
    name: { ru: "Москва — Большая Дмитровка", en: "Moscow — Bolshaya Dmitrovka" },
    address: { ru: "ул. Большая Дмитровка, 7/5, стр. 2", en: "7/5 Bolshaya Dmitrovka St., Bldg. 2" },
    mapQuery: "Москва, Большая Дмитровка, 7/5, строение 2",
  },
  {
    id: "moscow-atrium",
    name: { ru: "Москва — Атриум", en: "Moscow — Atrium" },
    address: { ru: "ул. Земляной Вал, 33", en: "33 Zemlyanoy Val St." },
    mapQuery: "Москва, Земляной Вал, 33",
  },
  {
    id: "tyumen",
    name: { ru: "Тюмень — Ленина", en: "Tyumen — Lenina" },
    address: { ru: "ул. Ленина, 10", en: "10 Lenina St." },
    mapQuery: "Тюмень, Ленина, 10",
  },
  {
    id: "novosibirsk",
    name: { ru: "Новосибирск — Советская", en: "Novosibirsk — Sovetskaya" },
    address: { ru: "ул. Советская, 18", en: "18 Sovetskaya St." },
    mapQuery: "Новосибирск, Советская, 18",
  },
  {
    id: "rostov",
    name: { ru: "Ростов-на-Дону — Соборный", en: "Rostov-on-Don — Soborny" },
    address: { ru: "пер. Соборный, 19", en: "19 Soborny Lane" },
    mapQuery: "Ростов-на-Дону, Соборный переулок, 19",
  },
  {
    id: "rosa-khutor",
    name: { ru: "Роза Хутор", en: "Rosa Khutor" },
    // Address confirmed at https://sch.tehnikumbistro.ru/contacts on 06.11.2026.
    address: { ru: "площадь Мзымты, 1", en: "1 Mzymta Square" },
    mapQuery: "Сочи, Роза Хутор, площадь Мзымты, 1",
    status: { ru: "До встречи в зимнем сезоне", en: "See you in the winter season" },
  },
  {
    id: "perm",
    name: { ru: "Пермь", en: "Perm" },
    status: { ru: "Скоро открытие", en: "Coming soon" },
  },
  {
    id: "almaty",
    name: { ru: "Алма-Ата", en: "Almaty" },
    status: { ru: "Скоро открытие", en: "Coming soon" },
  },
  {
    id: "izhevsk",
    name: { ru: "Ижевск", en: "Izhevsk" },
    status: { ru: "Скоро открытие", en: "Coming soon" },
  },
] as const;
