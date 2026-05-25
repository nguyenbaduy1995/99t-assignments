# Sum to N - Three Ways

Three implementations to calculate the sum of integers from 1 to n.

## Implementations

| Function | Approach | Time Complexity | Space Complexity |
|----------|----------|-----------------|------------------|
| `sum_to_n_a` | Formula: n × (n + 1) / 2 | O(1) | O(1) |
| `sum_to_n_b` | Loop iteration | O(n) | O(1) |
| `sum_to_n_c` | Recursion | O(n) | O(n) |

## Usage

```typescript
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./src/sum";

sum_to_n_a(10); // 55
sum_to_n_b(10); // 55
sum_to_n_c(10); // 55
```

## Scripts

```bash
# Run demo
npm run start

# Run tests
npm run test

# Lint
npm run lint
```

## Notes

- All functions return 0 for n <= 0
- The recursion approach (`sum_to_n_c`) may cause stack overflow for large n (e.g., 10^6)
- For large values, prefer the formula (`sum_to_n_a`) or loop (`sum_to_n_b`) approach
