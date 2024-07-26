import { useState } from "react";
import { StarIcon } from "lucide-react";
import { SpinningWheel } from "@/components";
import {
  useAddress,
  useContractData,
  useContractCall,
  useContract,
  useDisconnect,
} from "@thirdweb-dev/react";

const AdminConsole = () => {
  const [spin, setSpin] = useState(false);
  const { contract, IsLoading } = useContract(process.env.CONTRACT_ADDRESS);
  const { mutateAsync: DrawWinnerTicket } = useContractCall(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");

  const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");

  const { mutateAsync: withdrawCommission } = useContractCall(
    contract,
    "withdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading(" picking a lucky winner …");
    setSpin(true);
    try {
      const data = await DrawWinnerTicket([{}]);
      toast.success("Lucky winner has been selected", { id: notification });
      console.info("contract call success", data);
      setSpin(false);
    } catch (error) {
      setSpin(false);
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };
  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission … ");
    try {
      const data = await withdrawCommission([{}]).success(
        "Commission has been successfully withdrawn",
        { id: notification }
      );
      console.info("contract call success", data);
    } catch (error) {
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };
  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting draw… ");
    try {
      const data = await restartDraw([{}]);
      toast.success("Draw has been successfully restarted", {
        id: notification,
      });
      console.info("contract call success", data);
    } catch (error) {
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };
  const onRefundAll = async () => {
    const notification = toast.loading("Refunding all participants… ");
    try {
      const data = await RefundAll([{}]);
      toast.success("Participants have been successfully refunded", {
        id: notification,
      });
      console.info("contract call success", data);
    } catch (error) {
      toast.error("Oops something went haywire", { id: notification });
      console.error("Contract call error", error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="">
        <h2>Operator Console</h2>
        <p>Total commission to be withdrawn… </p>
        <div>
          <button onClick={drawWinner}>
            Draw Winner 
            <StarIcon />
          </button>
          <button onClick={onWithdrawCommission}>
            Withdraw Commission
            <DollarSign />
          </button>
          <button onClick={restartDraw}>
            Restart draw
            <ArrowRecycleIcon />
          </button>
          <button onClick={onRefundAll}>
            Refund all
            <ArrowDownIcon />
          </button>
        </div>
      </div>
      //spinning wheel
      <div
        className={`absolute top-20 left-10 right-10 flex w-full z-20 items-center justify-center min-h-[70vh] p-20 bg-gray-500/30 backdrop-blur-lg hidden ${
          spin && "block"
        } `}
      >
        <div className="w-¾ h-¾ m-10">
          {spin && <SpinningWheel spin={spin} />} 
        </div>
      </div>
    </div>
  );
};
export default AdminConsole;
