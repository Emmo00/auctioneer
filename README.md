# Auctioneer
<sub>simple auction application</sub>

A dApp where you can participate and create your own auctions.

For this implementation, A user can create only one active auction at a time.

## Getting Started

Below you'll find instructions on how setting up this dapp locally.

### Prerequisites

Here are some packages you need to have installed on your PC:

* [nodejs](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [docker](https://docs.docker.com/get-docker/)

* [cartesi-cli](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/Emmo00/auctioneer.git
   ```
2. Install NPM packages
   ```sh
   yarn  install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```

## Usage

Here you can access the examples of dapp communication and resources consume.

There are these resources available on this dapp:

### Advanced handlers
* #### create auction

Creates an auction with the user's address

* #### update bid

Updates the active amount for an auction. this changes the bid amount of an auction to 7/4 of the original amount and sets the active bidder

### Inspect handlers 
* #### list auctions

lists all the auctions on the dApp


* #### show auction

Shows the details of an auction. owner, activeAmount and ActiveBidder

## License

MIT License