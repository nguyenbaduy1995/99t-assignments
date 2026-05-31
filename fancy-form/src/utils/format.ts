export function formatNumber(num: number): string {
  return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export function formatAmountWithCommas(value: string): string {
  if (!value) return "";
  const cleanValue = value.replace(/,/g, "");
  const num = parseFloat(cleanValue);
  if (isNaN(num)) return value;

  const parts = cleanValue.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  const formattedInteger = parseInt(integerPart, 10).toLocaleString();

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }
  if (cleanValue.endsWith(".")) {
    return `${formattedInteger}.`;
  }
  return formattedInteger;
}

export function parseAmountFromCommas(value: string): string {
  return value.replace(/,/g, "");
}

export function formatPrice(price: number | undefined | null): string {
  if (price == null || isNaN(price)) return "0.00";
  if (price >= 1) {
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return price.toPrecision(4);
}
