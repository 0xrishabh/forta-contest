import {
  FindingType,
  FindingSeverity,
  Finding,
} from "forta-agent"

import { 
  TestTransactionEvent,
  encodeParameter,
} from "forta-agent-tools";

import agent from "./agent"
import { 
    SOLACE_USDC_CONTRACT,
    TRANSFER_ABI_SIGHASH
 } from "./constants";

const createFinding = (metadata:any) => {
    return Finding.fromObject({
        name: "Tranfer event",
        description: `Tranfer of ${metadata["value"]} SOLACE`,
        alertId: "Solace-1",
        type: FindingType.Info,
        severity: FindingSeverity.Info,
        metadata: metadata
      })
}

describe("Monitoring Whale Transfer", () => {
  it("should alert transfers of over or equal 1 Million", async () => {
    const toAddress: string = "0x5efC0d9ee3223229Ce3b53e441016efC5BA83435"
    const fromAddress: string = "0xEF013a60f765f34b0FD7C5aAf83b9C65BB10A9af"
    const amount:Number = 10000000 // 10 Million
    const data = encodeParameter("uint",amount)
    const topics:string[] = [
        encodeParameter("address", fromAddress),
        encodeParameter("address", toAddress)
    ];
    let metadata:any = {
      to: toAddress,
      from: fromAddress,
      value: amount.toString()
    }
    const txEvent = new TestTransactionEvent().addEventLog(TRANSFER_ABI_SIGHASH, SOLACE_USDC_CONTRACT,data,...topics)
    const findings = await agent.handleTransaction(txEvent)
    expect(findings).toStrictEqual([createFinding(metadata)])
  })

  it("should not alert transfer for less than 1 Million", async () => {
    const toAddress: string = "0x5efC0d9ee3223229Ce3b53e441016efC5BA83435"
    const fromAddress: string = "0xEF013a60f765f34b0FD7C5aAf83b9C65BB10A9af"
    const amount:Number = 999999
    const data = encodeParameter("uint",amount)
    const topics:string[] = [
        encodeParameter("address", fromAddress),
        encodeParameter("address", toAddress)
    ];
    let metadata:any = {
      to: toAddress,
      from: fromAddress,
      value: amount.toString()
    }
    const txEvent = new TestTransactionEvent().addEventLog(TRANSFER_ABI_SIGHASH, SOLACE_USDC_CONTRACT,data,...topics)
    const findings = await agent.handleTransaction(txEvent)
    expect(findings).toStrictEqual([])
  })
})


