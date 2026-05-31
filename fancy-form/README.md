# Fancy Form - Crypto Currency Exchange

A beautiful, responsive crypto currency exchange form built with React and Material UI.

## Features

- **Token Selection** — Searchable popup dialog with token icons and prices
- **Real-time Conversion** — Live exchange rate calculation using CoinGecko prices
- **Form Validation** — Using react-hook-form with validation for:
  - Required amount
  - Positive numbers only
  - Max balance limit (10,000)
  - Invalid number detection
- **Swap Tokens** — Quick swap between From/To currencies
- **Responsive Design** — Mobile-first, works on all screen sizes

## Tech Stack

- **React 19** with TypeScript
- **Material UI 7** for components
- **React Query** for data fetching
- **React Hook Form** for form handling
- **Vite** for bundling

## Data Sources

- **Prices**: [CoinGecko API](https://api.coingecko.com/api/v3/simple/price)
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Project Structure

```
src/
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
├── types.ts                # TypeScript types
├── index.css               # Global styles
├── api/
│   └── coingecko.ts        # CoinGecko price fetching
├── constants/
│   └── index.ts            # App constants
├── hooks/
│   ├── index.ts            # Hook exports
│   ├── usePrices.ts        # Token price fetching hook
│   └── useSwap.ts          # Swap form logic hook
├── theme/
│   └── index.ts            # MUI theme configuration
├── utils/
│   └── format.ts           # Number formatting utilities
└── components/
    ├── index.ts            # Component exports
    ├── AmountInput.tsx     # Amount input with formatting
    ├── ErrorState.tsx      # Error display
    ├── ExchangeForm.tsx    # Main exchange form
    ├── Header.tsx          # Page header with logo
    ├── Layout.tsx          # Page layout wrapper
    ├── LoadingState.tsx    # Loading spinner
    ├── SwapButton.tsx      # Token swap button
    ├── SwapCard.tsx        # Exchange card container
    ├── TokenIcon.tsx       # Token icon with fallback
    └── TokenSelect.tsx     # Token picker dialog
```

## Scripts

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```
