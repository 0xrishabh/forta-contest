
const SOLACE_USDC_CONTRACT:string = "0x9c051f8a6648a51ef324d30c235da74d060153ac";
const TRANSFER_EVENT_ABI:string = "event Transfer(address indexed from, address indexed to, uint value)";
const THRESHOLD_TRANSFER_AMOUNT =  1000000;
const TRANSFER_ABI_SIGHASH = "Transfer(address,address,uint256)";
export {
    SOLACE_USDC_CONTRACT,
    TRANSFER_EVENT_ABI,
    THRESHOLD_TRANSFER_AMOUNT,
    TRANSFER_ABI_SIGHASH
}
