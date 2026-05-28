/*
  I think we should add unique id for each balance to prevent duplicate balances
  For example, we have two balances with the same currency and blockchain but different amounts
  We should use id to identify each balance uniquely
*/

interface WalletBalance {
  uid: string;
  currency: string;
  amount: number;
  blockchain: string; // Missing blockchain property
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends React.ComponentProps<"div"> {}

// I prefer move getPriority function to outside of the WalletPage. We can put it in utils folder
// Each time WalletPage re-render, getPriority don't need to be re-created so it's more efficient and do not need add to dependency arrays for creating sortedBalances
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  // const { children, ...rest } = props; - We don't need this since we don't use children elsewhere
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          // lhsPriority is not defined, so we use balancePriority here.
          if (balancePriority > -99) {
            // The condition balance.amount <= 0 and return true is wrong. We should find balances with amount > 0.
            if (balance.amount > 0) {
              return true;
            }
          }
          return false;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          // Simplify sorting logic
          return rightPriority - leftPriority;
        })
        // Add formatted amount into useMemo since the formattedBalances is re-calculated every time.
        .map((balance: WalletBalance) => {
          return {
            ...balance,
            formatted: balance.amount.toFixed(2), // I think we should put decimal places as a parameter here since empty decimal leads to unexpectet rounding result
          };
        })
    );
  }, [balances]); // remove "prices" from dependency arrays since we don't use it.

  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        // key={index} // Prevent to use index as key
        key={balance.uid} // if we can make sure that each balance + currency is unique, we can use key as: `${balance.uid}-${balance.currency}`.
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
