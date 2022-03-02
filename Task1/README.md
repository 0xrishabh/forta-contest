# Monitoring Whales on Solace

## Description

This agent detects Transfer events with value greater or equal to a 1,000,000

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- SOLACE-1
    - Fired when a Transfer event has value equal to greater than 1,000,000
	- Severity is always set to "Info".
    - Type is always set to "Info".
    - Metadata contains:
        - to: the sender of the tokens
        - from: the reciever of the tokens
        - value: the amount of SOLACE transferred


## Test Data

The agent behaviour can be verified with the following transactions:

- 0xfb02b9536a806f15d9641ff78c5fe84d0aef24aeb64cece413bc41f89b3b1ebc
