# Fancy Form - Crypto Currency Exchange

A beautiful, responsive crypto currency exchange form built with React and Material UI.

## Features

- **Token Selection** — Searchable popup dialog with token icons and prices
- **Real-time Conversion** — Live exchange rate calculation
- **Form Validation** — Using react-hook-form with validation for:
  - Required amount
  - Positive numbers only
  - Max balance limit (10,000)
  - Invalid number detection
- **Number Formatting** — Thousand separators for amounts > 1,000
- **Swap Tokens** — Quick swap between From/To currencies
- **Loading States** — Simulated backend call with spinner
- **Success Notification** — Snackbar alert on successful exchange
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Accessible** — Keyboard navigation, ARIA labels, screen reader support

## Data Sources

- **Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`

## Project Structure

```
src/
├── App.tsx              # Main app component
├── main.tsx             # Entry point
├── types.ts             # TypeScript types
├── index.css            # Global styles
├── theme/
│   └── index.ts         # MUI theme configuration
├── hooks/
│   └── usePrices.ts     # Token price fetching hook
└── components/
    ├── Header.tsx       # Page header with logo
    ├── Layout.tsx       # Page layout wrapper
    ├── LoadingState.tsx # Loading spinner
    ├── ErrorState.tsx   # Error display
    ├── ExchangeForm.tsx # Main exchange form
    └── TokenSelect.tsx  # Token picker dialog
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
