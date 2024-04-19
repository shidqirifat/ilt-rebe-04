export const formatCurrency = (number) => {
  if (Number.isNaN(number)) return "Invalid number";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(number);
};

export const formatNominal = (value) => {
  const numberValue = Number(value.replace(/\./g, ""));
  return new Intl.NumberFormat("id-ID").format(Math.abs(numberValue));
};

export const formatNumber = (nominal) => {
  return Number(nominal.replace(/[,.]/g, ""));
};
