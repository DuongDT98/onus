export function getPercentFluctuating(avgVndc, usdtVndc, inflation) {
  if (Number(avgVndc) > Number(usdtVndc)) {
    const difference = Number(avgVndc) - Number(usdtVndc);
    return Number((difference / Number(avgVndc) - inflation) * 100).toFixed(2);
  }
  if (Number(avgVndc) < Number(usdtVndc)) {
    const difference = Number(usdtVndc) - Number(avgVndc);

    return ((Number(difference) / Number(usdtVndc) - inflation) * 100).toFixed(
      2
    );
  }
  return 0;
}
export const calculatePercent = (
  avgAskVndc,
  avgBidVndc,
  avgAskUsdt,
  avgBidUsdt
) => {
  const deviation1 = Number(avgAskVndc) - Number(avgBidUsdt);
  const deviation2 = Number(avgAskUsdt) - Number(avgBidVndc);
  if (deviation1 > deviation2) {
    const deviation = Number(avgAskVndc) - Number(avgBidUsdt);
    console.log("deviationVNDC > USDT", deviation);
    return Number((deviation / Number(avgBidUsdt)) * 100).toFixed(2);
  } else {
    const deviation = Number(avgAskUsdt) - Number(avgBidVndc);
    console.log("deviationVNDC < USDT", deviation);
    return Number((deviation / Number(avgBidVndc)) * 100).toFixed(2);
  }
};
