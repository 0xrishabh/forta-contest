import BigNumber from 'bignumber.js'
import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'
import {
    SOLACE_USDC_CONTRACT,
    TRANSFER_EVENT_ABI,
    THRESHOLD_TRANSFER_AMOUNT
} from './constants'

export const provideHandleTransaction = (contractAddress: string): HandleTransaction => { 
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = []
    const transferFunctionInvocations = txEvent.filterLog(TRANSFER_EVENT_ABI,contractAddress);    
    transferFunctionInvocations.forEach((functionInvocation) => {
        // Extract values of the params
        let toAddress:string = functionInvocation.args["to"]
        let fromAddress:string = functionInvocation.args["from"]
        let amount:BigNumber = functionInvocation.args["value"]
        
        // Create metadata to be pushed
        let metadata:any = {
          to: toAddress,
          from: fromAddress,
          value: amount.toString()
        }

        /*
        if amount tranfered is greater or equal to THRESHOLD_TRANSFER_AMOUNT 
        create Finding
        */
        if (amount.gte(THRESHOLD_TRANSFER_AMOUNT)) {
          findings.push(Finding.fromObject({
            name: "Tranfer event",
            description: `Tranfer of ${amount.toString()} SOLACE`,
            alertId: "Solace-1",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: metadata
          }))
        }
    })
    return findings
  }
}

export default {
  handleTransaction: provideHandleTransaction(
    SOLACE_USDC_CONTRACT
  ),
}
