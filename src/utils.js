export const getTotals = (cart) => {
  console.log(cart);
  let totalAmount = 0;
  let totalCost = 0;
  // value() is used in map to get the values of the map
  for (let { amount, price } of cart.values()) {
    totalAmount += amount;
    totalCost += amount * price;
  }

  return { totalAmount, totalCost };
};
