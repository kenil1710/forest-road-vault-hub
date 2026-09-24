// Format from a fixed-precision decimal string so half-way values round up as
// expected (112.995 → 113.00) instead of down via float error (112.99499…).
function exact(n: number) {
  return n.toFixed(8) as `${number}`;
}

export function usd(n: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(exact(n));
}

export function num(n: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(exact(n));
}

export function pct(n: number, decimals = 2) {
  return `${num(n, decimals)}%`;
}
