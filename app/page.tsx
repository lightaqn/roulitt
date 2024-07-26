import Image from "next/image";
import {
  useAddress,
  useMetamask,
  useContract,
  useDisconnect,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
import {
  LoadingSpinner,
  Header,
  Login,
  Marquee,
  MainPage,
  Footer,
} from "@/components";
import { bgImg, logo } from "@/utils/constants";

export default function Home() {
  const address = useAddress();
  const { contract, isLoading } = useContract(process.env.CONTRACT_ADDRESS);
  if (isLoading) {
    return (
      <div className="w-full h-full p-20 space-y-6">
        <Image
          src={logo}
          className="rounded-full ring-4 ring-orange-500 object-contain"
          width={80}
          height={80}
          objectFit="contain"
          layout="responsive"
          alt="logo"
        />
        <p className="animate-pulse font-bold text-white text-xl mb-8">
          loading…{" "}
        </p>
        <LoadingSpinner /> //horizontal
      </div>
    );
  }
  if (!address) {
    return <Login />;
  }
  return (
    <main className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="absolute bottom-0 top-0 left-0 right-0 w-full h-full -z-10 opacity-85">
        <Image src={bgImg} layout="fill" objectFit="cover" alt="bgImg" />
      </div>
      <div className="w-full h-full backdrop-blur-lg bg-indigo-400/30 ">
        <Header />
        <Marquee />
        <div className="flex flex-col p-10 mx-auto max-w-8xl ">
          <MainPage />
        </div>
      </div>
      <Footer />
    </main>
  );
}
