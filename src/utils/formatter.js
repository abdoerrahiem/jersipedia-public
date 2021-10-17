export const rupiahFormatter = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
