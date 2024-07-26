import { useState, useEffect } from "react";
import {
  useAddress,
  useMetamask,
  useContract,
  useDisconnect,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "@/utils/constants";
import toast from "react-hot-toast";
type Props = {};

const MainPage = (props: Props) => {
  const [qty, setQty] = useState<number>(1);
  const [userTickets, setUserTickets] = useState<number>(0);
  const { contract, IsLoading } = useContract(process.env.CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractData(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractData(
    contract,
    "CurrentWinningReward"
  );
  const { data: pricePerTicket } = useContractData(contract, "pricePerTicket");
  const { data: ticketCommission } = useContractData(
    contract,
    "ticketCommission"
  );
  const { data: expiration } = useContractData(contract, "expiration");
  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");
  const { mutateAsync: withdrawWinnings } = useContractCall(
    contract,
    "WithdrawWinnings"
  );
  const { data: tickets } = useContractData(contract, "getTickets");

  const { data: winnings } = useContractData(
    contract,
    "getWinningsForAddress",
    address
  );
  const { data: isLotteryOperator } = useContractData(
    contract,
    "lotteryOperator"
  );
  const { data: operatorTotalCommission } = useContractData(
    contract,
    "totalCommission"
  );

  useEffect(() => {
    if (!tickets) return;
    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (acc, ticketAddress) => (ticketAddress === address ? acc + 1 : acc),
      0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets, address]);

  //similar to spinning the wheel
  const handleClick = async () => {
    if (!pricePerTicket) return;
    const notification = toast.loading("Purchasing your ticket… ");
    try {
      const data = await BuyTickets([
        {
          value: ethers.utils
            .parseEther(Number(ethers.utils.formatEther(pricePerTicket)) * qty)
            .toString(),
        },
      ]);
      toast.success("Ticket purchased successfully", { id: notification });
      console.info("contract call success", data);
    } catch (error) {
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };

  const withdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings … ");
    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winning withdrawn successfully", { id: notification });
      console.info("contract call success", data);
    } catch (error) {
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };

  return (
    <div>
      {isLotteryCreator === address && <AdminConsole />} 
      {wininings > 0 && (
        <div className="my-5 max-w-md lg:max-w-4xl mx-auto">
          <button onClick={withdrawWinnings}>
            <p>CONGRATS!! you won?!! </p>
            <p>
              Total winining: {ethers.utils.formatEther(winnings.toString())}{" "}
              {currency}{" "}
            </p>
            <br />
            <p>Click here to withdraw your winnings</p>
          </button>
        </div>
      )}
       
      <div className="border-2 rounded-xl p-6">
        <h1 className="text-5xl text-white font-extrabold">The Next Raffle</h1>
        <div className="space-x-2">
          <div className="border-2">
            <h2>Total Pool</h2>
            <p>
              {currentWinningReward &&
                ethers.utils.formatEther(currentWinningReward.toString())}{" "}
              {currency}{" "}
            </p>
          </div>
          <div className="border-2">
            <h2>Tickets Remaining</h2>
            <p>{remainingTickets?.toNumber()}</p>
          </div>
        </div>
        //coundown timer
        <div>
          <CountdownTimer />
        </div>
      </div>
      <div className="border-2">
        <div className="flex justify-between">
          <h2>Price per ticket</h2>
          <p>
            {pricePerTicket &&
              ethers.utils.formatEther(pricePerTicket.toString())}
          </p>
        </div>
        <div className="border-2 flex p-4">
          <p>Tickets</p>
          <input
            type="number"
            className="outline-none w-full bg-transparent text-right"
            min={1}
            max={10}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>
        <div>
          <div className="flex items-center justify-between text-sm italic">
            <p>Total cost of tickets</p>
            <p>
              {pricePerTicket &&
                Number(ethers.utils.formatEther(pricePerTicket.toString())) *
                  qty}{" "}
              {currency}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm italic">
            <p>Service fees</p>
            <p>
              {ticketCommission &&
                ethers.utils.formatEther(ticketCommision.toString())}{" "}
              {currency}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm italic">
            <p>Network Charges</p>
            <p>TBC</p>
          </div>

          <button
            disabled={
              expiration.toString() < Date.now().toString() ||
              remainingTickets.toNumber() === 0
            }
            onClick={handleClick}
            className="px-10 py-5 flex text-center w-full text-white rounded-lg shadow-sm bg-gradient from-purple-500 to-purple-700 disabled:from-gray-500 disabled:to-gray-400"
          >
            Buy {qty} Ticket(s) for{" "}
            {pricePerTicket &&
              Number(ethers.utils.formatEther(pricePerTicket.toString()))}{" "}
            * qty {currency}{" "}
          </button>
        </div>
        {userTickets && (
          <div>
            <p> You have {userTickets} tickets in this draw </p>
            <div className="flex flex-wrap max-w-sm space-x-2">
              {Array(userTickets)
                .fill("")
                .map((_, index) => (
                  <p
                    key={index}
                    className="w-12 h-18 flex flex-shrink-0 rounded-lg text-sm items-center justify-center"
                  >
                    {index + 1}{" "}
                  </p>
                ))}
               
            </div>
          </div>
        )}
         
      </div>
      <div>//spinning wheel</div>
    </div>
  );
};

export default MainPage;
