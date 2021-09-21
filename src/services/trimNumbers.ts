type TrimNumberType = (paramToTrim: number, decimalNumber: number) => number;
export const trimNumber: TrimNumberType = (
  paramToTrim: number, decimalNumber: number,
) => {
  let decimalToTrim = paramToTrim;
  const splittedBalance = decimalToTrim.toString().split('.');
  if (splittedBalance.length > 1) {
    const decimals = splittedBalance[1];
    decimalToTrim = parseFloat(
      `${splittedBalance[0]}.${decimals.substring(0, decimalNumber)}`,
    );
  }
  return decimalToTrim;
};
