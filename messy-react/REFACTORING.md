# Refactoring Notes

## Issues Fixed

### 1. Missing `blockchain` Property in Interface
**Original:** `WalletBalance` interface was missing the `blockchain` property, but it was used in `getPriority(balance.blockchain)`.

**Fix:** Added `blockchain: string` to the `WalletBalance` interface.

---

### 2. Added Unique Identifier
**Original:** No unique identifier for balances, making it impossible to distinguish duplicates.

**Fix:** Added `uid: string` to `WalletBalance` interface to uniquely identify each balance.

---

### 3. Undefined Variable `lhsPriority`
**Original:** Used `lhsPriority` which was never defined — should have been `balancePriority`.

**Fix:** Changed `lhsPriority` to `balancePriority`.

---

### 4. Wrong Filter Logic
**Original:** `balance.amount <= 0` returned `true`, which filtered for empty/negative balances (likely incorrect).

**Fix:** Changed to `balance.amount > 0` to filter for balances with positive amounts.

---

### 5. Move `getPriority` Outside Component
**Original:** `getPriority` was defined inside the component, causing it to be recreated on every render.

**Fix:** Moved `getPriority` outside the component for better performance and to avoid adding it to dependency arrays.

---

### 6. Unnecessary `prices` in Dependency Array
**Original:** `useMemo` had `[balances, prices]` as dependencies, but `prices` was not used inside.

**Fix:** Removed `prices` from the dependency array — now just `[balances]`.

---

### 7. Simplified Sorting Logic
**Original:**
```typescript
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
// Missing return for equal case
```

**Fix:** Simplified to `return rightPriority - leftPriority;`

---

### 8. Combined `sortedBalances` and `formattedBalances`
**Original:** Two separate operations — `sortedBalances` from `useMemo`, then `formattedBalances` from `.map()` outside.

**Fix:** Combined into single `useMemo` → `formattedBalances` to avoid recalculating on every render.

---

### 9. Using Index as Key
**Original:** `key={index}` — using array index as React key is an anti-pattern.

**Fix:** Changed to `key={balance.uid}` using the unique identifier.

---

### 10. `toFixed()` Without Decimal Places
**Original:** `balance.amount.toFixed()` — no argument leads to unexpected rounding (defaults to 0 decimal places).

**Fix:** Changed to `balance.amount.toFixed(2)` for consistent decimal formatting.

---

### 11. Potential Null/Undefined Price
**Original:** `prices[balance.currency] * balance.amount` — could crash if price is undefined.

**Fix:** Added nullish coalescing: `(prices[balance.currency] ?? 0) * balance.amount`.

---

### 12. Unused Destructured Variables
**Original:** `const { children, ...rest } = props;` — `children` was destructured but never used.

**Fix:** Removed unnecessary destructuring, spread props directly with `{...props}`.

---

### 13. Type Safety
**Original:** `getPriority(blockchain: any)` — using `any` type.

**Fix:** Changed to `getPriority(blockchain: string)` for proper type safety.

---

### 14. Interface Inheritance
**Original:** `FormattedWalletBalance` duplicated properties from `WalletBalance`.

**Fix:** `FormattedWalletBalance extends WalletBalance` to avoid duplication.
