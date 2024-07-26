import "@openzeppelin/contracts/utils/Strings.sol" 

pragma solidity >= 0.7.0 <0.9.0
contract Lottery {uint256 public constant pricePerTicket = 0.01 etheruint256 public constant maxTickets = 100uint256 public constant ticketCommission = 0.001 etheruint256 public constant duration = 30 minutes

uint256 public expirationaddress public lotteryOperator uint256 public operatorTotalCommission = 0address public lastWinneruint256 public lastWinnerAmount
mapping( address => uint256 ) public winningsaddress[] public tickets;

modifier isOperator() {require ((msg.sender === lotteryOperator), "Caller is not the lottery operator" ) } 
modifier isWinner () {require ((isWinner() ), "Caller is not a winner" ) } 
constructor() {lotteryOperator = msg.senderexpiration = block.timestamp + duration} 

function getTickets() public view returns (address[] memory) {return tickets} 
function getWinningsForAddress(address addr) public view returns (uint256) {return winnings[addr] } 

function BuyTickets() public payable  {require (msg.value % pricePerTicket == 0,string.concat("the value must be multiple of", Strings.toString(pricePerTicket),"Ether" )) 
uint256  numOfTicketsToBuy = msg.value / pricePerTicket
require (numOfTicketsToBuy <= RemainingTickets(), "Not enough tickets available" ) 
for(uint256 i=0; i < numOfTicketsToBuy; i++) {tickets.push(msg.sender)} 
} 
function DrawWinnerTicket() public isOperator {require(tickets.length > 0, " No tickets were purchased" ) 
bytes32 blockHash = blockhash(block.number - tickets.length) 
uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, blockHash) ) ) 
uint256 winningTicket = randomNumber % tickets.length
address winner = tickets[winningTicket]lastWinner = winnerwinnings[winner] += (tickets.length * (pricePerTicket - ticketCommission)) lastWinnerAmount = winnings[winner] operatorTotalCommission += (tickets.length * ticketCommission) 
delete tickets
expiration = block.timestamp + duration
} 

function restartDraw() public isOperator {require(tickets.length == 0, "Cannot restart ongoing draw" ) 
delete ticketsexpiration = block.timestamp + duration
} 
function checkWinningsAmount () public view returns (uint256) {address payable winner = payable(msg.sender) uint256 reward2Transfer = winnings[winner]return reward2Transfer} 
function withdrawWinnings () public isWinner {address payable winner = payable(msg.sender) uint256 reward2Transfer = winnings[winner]winnings[winner] = 0winner.transfer(reward2Transfer)} 
function RefundAll() public  {require(block.timestamp >= expiration, "the lottery not expired yet" ) 
for(uint256 i=0; i < tickets.length; i++) {address payable to = payable(tickets[i])tickets[i] = address[0]to.transfer(pricePerTicket)} delete tickets} 

function WithdrawCommission() public isOperator {address payable operator = payable(msg.sender) 
uint256 commission2Transfer = operatorTotalCommissionoperatorTotalCommission = 0operator.transfer(commission2Transfer)} 

function IsWinner () public view returns (bool) {return winnings[msg.sender] > 0} 
function CurrentWinningReward() public view returns (uint256) {return tickets.length * pricePerTicket} 
function RemainingTickets() public view returns (uint256) {return maxTickets - tickets.length} 

} 


