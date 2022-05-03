export const round = (value: number): number =>
  Number(
    value.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );

export const formatCycles = (value: bigint): string =>
  new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
  })
    .format(Number(value) / 1_000_000_000_000)
    .replace(',', '.');
