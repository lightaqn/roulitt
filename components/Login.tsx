import { useMetamask } from "@thirdweb-dev/react";
import { PowerButton } from "lucide-react";
import { LoadingSpinner } from "@/components";

type Props = {};

const Login = (props: Props) => {
  const loginWithMetamask = useMetamask();
  return (
    <div className="flex flex-col mx-auto p-10 gap-y-6 items-center justify-center max-w-8xl">
      //changing color scheme like zeitgeist
      <h1 className="text-5xl text-white font-extrabold leading-10">
        {" "}
        Roulitt
      </h1>
      <p className="my-8 text-indigo-200 font-semibold text-2xl">
        Get started by logging in with your metamask
      </p>
      <button
        className="px-6 py-3 w-full h-16 text-center items-center justify-center whitespace-nowrap bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400 hover:shadow-lg shadow-md hover:transform hover:translate hover:duration-300 hover:ease-out "
        onClick={loginWithMetamask}
      >
        {loading ? <LoadingSpinner /> : <PowerButton />} 
      </button>
    </div>
  );
};

export default Login;
