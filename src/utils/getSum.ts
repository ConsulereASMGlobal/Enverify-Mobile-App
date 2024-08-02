export const sumQuantity = (orderDetail: any) =>
  orderDetail?.reduce((acc: any, category: { items: any[] }) => {
    const categoryTotal = category?.items?.reduce((categoryAcc, item) => {
      return categoryAcc + item?.quantity;
    }, 0);
    return acc + categoryTotal;
  }, 0);

export const totalSalesPrice = (orderDetail: any) =>
  orderDetail?.reduce((acc: any, category: { items: any[] }) => {
    const categoryTotalSales = category?.items?.reduce((categoryAcc, item) => {
      return categoryAcc + item?.quantity * item?.price - item?.deduction;
    }, 0);
    return acc + categoryTotalSales;
  }, 0);

export const totalPrice = (orderDetail: Array<any>) =>
  orderDetail?.reduce(
    (categoryAcc: number, item: { quantity: number; price: number }) => {
      return categoryAcc + item?.quantity * 1; // Note : this is removed * item?.price;
    },
    0
  );

export const totalProdOut = (detail: Array<any>) =>
  detail?.reduce((seed: number, item: { quantity: number }) => {
    return seed + Number(item?.quantity); // Note : this is removed * item?.price;
  }, 0);

export const truncateToTwoDecimalPlaces = (number: number) => {
  return Math.floor(number * 100) / 100;
};

export const joinItemDetails = (name, color, grade) => {
  return `${name ? name + " " : ""}${color ? color + " " : ""}${
    grade ? grade : ""
  }`.trim();
};
