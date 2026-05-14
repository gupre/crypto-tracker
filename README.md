# CryptoTracker

Дашборд для отслеживания криптовалют в реальном времени. Данные — CoinGecko API, цены обновляются автоматически каждые 30–60 секунд.

🔗 **[Live Demo](https://gupre.github.io/crypto-tracker/)**

---

## Функциональность

- 📈 Список топ-50 монет по рыночной капитализации с пагинацией
- 🔍 Поиск по названию и тикеру в реальном времени
- 📊 Детальная страница монеты с интерактивным графиком (1D / 7D / 30D / 90D)
- ⭐ Watchlist — избранные монеты с сохранением между сессиями
- 🔄 Автообновление цен без перезагрузки страницы (polling)
- 📱 Адаптивный дизайн

---

## Стек

| Технология | Версия | Назначение |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Типизация |
| Redux Toolkit | 2 | Стейт-менеджмент |
| RTK Query | — | Запросы к API, кеширование, polling |
| React Router | 6 | Клиентская маршрутизация |
| Tailwind CSS | 4 | Стилизация |
| Recharts | — | Графики цен |
| Jest + RTL | — | Unit-тесты |
| Vite | — | Сборка |

---

## Архитектура — Feature-Sliced Design (FSD)

```
src/
├── app/
│   └── providers/
│       ├── store/        # Redux store, typed hooks
│       └── router/       # React Router конфиг
├── entities/
│   └── coin/
│       ├── api/          # RTK Query — getCoins, getCoinById, getCoinChart
│       └── types/        # TypeScript типы Coin, CoinDetail, CoinMarketChart
├── features/
│   ├── watchlist/        # Slice + useWatchlist hook + WatchlistButton
│   ├── search/           # Slice + SearchBar
│   └── coin-chart/       # График с polling и выбором периода
├── widgets/
│   └── coin-table/       # Таблица монет
├── pages/
│   ├── coins-list/       # Главная — список, поиск, пагинация
│   ├── coin-detail/      # Детальная — график, статистика, описание
│   └── watchlist/        # Страница избранного
└── shared/
    ├── ui/               # Spinner, PriceChange, ErrorMessage, MainLayout
    └── lib/              # formatPrice, formatMarketCap, formatDate
```

---

## Ключевые решения

**RTK Query polling** — цены обновляются автоматически: на главной каждые 60 сек, на детальной странице каждые 30 сек. RTK Query управляет жизненным циклом запроса: дедуплицирует вызовы, отменяет при размонтировании, инвалидирует кеш.

**Watchlist persistence** — Redux slice синхронно пишет в `localStorage` при каждом изменении. При инициализации стора данные восстанавливаются — список сохраняется между сессиями.

**FSD слои** — строгое соблюдение границ: `entities` не знают о `features`, `features` не знают о `pages`, `shared` не импортирует ничего выше себя.

---

## Запуск

```bash
git clone https://github.com/gupre/crypto-tracker.git
cd crypto-tracker
npm install
npm run dev
```

Откроется на `http://localhost:5173`

---

## Тесты

```bash
npm test
```

Покрыто unit-тестами:
- `formatters.ts` — форматирование цен, капитализации, дат
- `watchlistSlice` — добавление, удаление, защита от дублей, персистентность в localStorage
- `PriceChange` — рендер положительных и отрицательных значений
