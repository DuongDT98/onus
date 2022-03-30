import React, { useState } from "react";
import "./row-info.css";
import { getPercentFluctuating, calculatePercent } from "./../../func/func";

const RowInfo = ({
  name,
  vndcPrice,
  usdtPrice,
  usdtVndcFixed,
  pcAlert,
  percentInlation,
  handleALert,
  percentShowWarning,
}) => {
  const [percentAlert, setPercentAlert] = useState(pcAlert || 1);
  const [percentAlertFixed, setPercentAlertFixed] = useState(pcAlert || 1);

  const avgVndcPrice = Number((vndcPrice?.ask + vndcPrice?.bid) / 2);
  const avgAskVndc = Number(vndcPrice?.ask);
  const avgBidVndc =
    name === "ITAMCUBE"
      ? Number(usdtPrice) * Number(usdtVndcFixed)
      : name === "BCOIN"
      ? Number(usdtPrice) * Number(usdtVndcFixed)
      : Number(vndcPrice?.bid);
  const avgAskUsdt =
    name === "ITAMCUBE"
      ? Number(usdtPrice) * Number(usdtVndcFixed)
      : name === "BCOIN"
      ? Number(usdtPrice) * Number(usdtVndcFixed)
      : Number(usdtPrice?.ask) * Number(usdtVndcFixed);
  const avgBidUsdt = Number(usdtPrice?.bid) * Number(usdtVndcFixed);
  const avgUsdtPrice =
    name === "ITAMCUBE"
      ? usdtPrice
      : name === "BCOIN"
      ? usdtPrice
      : Number((Number(usdtPrice?.ask) + Number(usdtPrice?.bid)) / 2);
  const usdtExchangePrice = Number(usdtVndcFixed * avgUsdtPrice);

  // const percentFluctuating = getPercentFluctuating(
  //   avgVndcPrice,
  //   usdtExchangePrice,
  //   percentInlation || 0.01
  // );
  // console.log("avgVndcPrice", avgVndcPrice);
  // console.log("avgUsdtPrice", avgUsdtPrice);
  const percentFluctuating =
    name === "ITAMCUBE"
      ? getPercentFluctuating(
          avgVndcPrice,
          usdtExchangePrice,
          percentInlation || 0.01
        )
      : name === "BCOIN"
      ? getPercentFluctuating(
          avgVndcPrice,
          usdtExchangePrice,
          percentInlation || 0.01
        )
      : calculatePercent(avgAskVndc, avgBidVndc, avgAskUsdt, avgBidUsdt);

  if (percentFluctuating > Number(percentAlertFixed)) {
    handleALert();
  }
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          <div className="price usdt">
            {name === "ITAMCUBE" ? (
              <>
                Buy USDT: {Number(usdtPrice).toFixed(4)}
                <br />
                Sell VNDC:
                {Number(Number(usdtPrice) * usdtVndcFixed).toFixed(0)}
              </>
            ) : name === "BCOIN" ? (
              <>
                Buy USDT: {Number(usdtPrice).toFixed(4)}
                <br />
                Sell VNDC:
                {Number(Number(usdtPrice) * usdtVndcFixed).toFixed(0)}
              </>
            ) : (
              <>
                Buy:{(usdtPrice?.bid * usdtVndcFixed).toFixed(2)}
                <br />
                Sell:
                {(usdtPrice?.ask * usdtVndcFixed).toFixed(2)}
              </>
            )}
          </div>
        </td>
        <td>
          <div className="price vndc">
            Buy: {vndcPrice?.bid}
            <br />
            Sell: {vndcPrice?.ask}
          </div>
          <div>
            <input
              onChange={(e) => {
                setPercentAlert(e.target.value);
              }}
              value={percentAlert}
            />
            <button
              onClick={() => {
                setPercentAlertFixed(percentAlert);
              }}
            >
              Set
            </button>
          </div>
        </td>
        <td className={`${percentFluctuating > 0 ? "up-price" : "down-price"}`}>
          {usdtExchangePrice?.toFixed(2)}
          <br /> {percentFluctuating}%
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          {Number(avgVndcPrice) < Number(usdtExchangePrice) &&
            percentFluctuating > percentShowWarning && (
              <div className="alert-buy">
                BUY {name} BY<span className="vndc"> VNDC </span> {"===>"} SELL{" "}
                {name}
                TO <span className="usdt">USDT</span>
              </div>
            )}
          {Number(avgVndcPrice) > Number(usdtExchangePrice) &&
            percentFluctuating > percentShowWarning && (
              <div className="alert-buy">
                BUY {name} BY<span className="usdt"> USDT </span> {"===>"} SELL{" "}
                {name}
                TO <span className="vndc"> VNDC </span>
              </div>
            )}
        </td>
      </tr>
    </>
  );
};
export default RowInfo;
