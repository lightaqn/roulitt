import { useState, useEffect } from "react" 
import {
    useAddress,
    useContractData,
    useContractCall,
    useContract,
    useDisconnect,
  } from "@thirdweb-dev/react";

const CountdownTimer = () => {
    const { contract, IsLoading } = useContract(process.env.CONTRACT_ADDRESS);
const { data: expiration, isLoading: isLoadingExpiration } = useContractData(contract, "expiration" )const duration = new Date(expiration * 1000) 

const [time, setTime] = useState(duration) 
const [isCompleted, setIsCompleted] = useState(false) 


useEffect(() => {
    const intervalId = setInterval(() => {
    if(time === 0 ) {
        clearInterval(intervalId)
        setIsCompleted(true)} else {
    setTime((prev) => prev - 1) } }, 1000) 
     return () => clearInterval(intervalId)
    setIsCompleted(true) }, [time] ) 

const hours = Math.floor(time /3600)
const minutes = Math.floor((time % 3600) /60)
 const seconds = time % 60

const formatTime= (value) => value < 10 ? `0${value}` : value






if(isCompleted) {return <div> <h2 className="animate-bounce" > The draw has ended</h2></div>

} 


return (<div className="w-full h-24 space-x-2 bg-transparent p-4" >

<div className="w-¼ h-full" ><div className="animate-pulse w-full h-⅘ flex text-center" >{formatTime(hour) } </div><p>Hours</p></div>
<div className="w-¼ h-full" ><div className="animate-pulse w-full h-⅘ flex text-center" >{formatTime(minutes)} </div><p>Minutes</p></div>

<div className="w-¼ h-full" ><div className="animate-pulse w-full h-⅘ flex text-center" >{formatTime(seconds)} </div><p>Seconds</p></div>

</div>)} 
export default CountdownTimer 
