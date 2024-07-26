import React from "react";
import { useContractData, useContract } from "@thirdweb-dev/react";

type Props = {};

const Marquee = () => {
  const { contract, IsLoading } = useContract(process.env.CONTRACT_ADDRESS);
  const { data: lastWinner } = useContractData(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractData(
    contract,
    "lastWinnerAmount"
  );

  //scrolling marquee
  return (
    <div className="flex space-x-4 p-4 text-xl">
      <p>Last Winner: {lastWinner.toString()} </p>
      <p>Previous Winnings: {lastWinnerAmount.toString()}</p>
    </div>
  );
};
export default Marquee;
