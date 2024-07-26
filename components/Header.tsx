"use client";
import {
  useAddress,
  useContractData,
  useContractCall,
  useContract,
  useDisconnect,
} from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import { HeaderButton } from "@/components";
import ethers from "ethers";
import { useState } from "react";
// import{ useToast} from ""

type Props = {};

const Header = (props: Props) => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [qty, setQty] = useState<number>(1);
  const { contract, IsLoading } = useContract(process.env.CONTRACT_ADDRESS);
  const { data: pricePerTicket } = useContractData(contract, "pricePerTicket");
  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");

  const toast = useToast();

  const handleBuyTicket = async () => {
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

  return (
    <div className="grid lg:grid-cols-2 items-center w-full h-[10vh] bg-transparent hover:shadow-md">
      <div className="">
        <Link href="/">
          <Image
            src={logo}
            className="rounded-full ring-4 ring-orange-500 object-contain"
            width={40}
            height={40}
            objectFit="contain"
            layout="responsive"
            alt="logo"
          />
        </Link>
        <p className="text-2xl text-white hover:text-indigo-500 font-medium hover:font-extrabold hidden hover:block">
          User: {address?.substring(0, 5)}...
          {address?.substring(address.length, address.length - 5)}
        </p>
      </div>

      <div className="flex space-x-2">
        <HeaderButton
          isEnabled
          caption="Get Ticket"
          onClick={handleBuyTicket}
        />
        <HeaderButton caption="Opt out" onClick={disconnect} />
      </div>
    </div>
  );
};

export default Header;
