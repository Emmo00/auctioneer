const auctions = [
  {
    id: "owner-address",
    owner: "owner",
    activeBidder: "activeBidder",
    activeAmount: 100,
  },
];

function createAuction(owner) {
  const auction = {
    id: owner,
    owner: owner,
    activeBidder: "",
    activeAmount: 1,
  };
  auctions.push(auction);
  return auction;
}

function updateBid(id, sender) {
  const sawAuction = auctions.reduce((prev, curr) => {
    if (id === curr.id) {
      prev = true;

      if (curr.activeAmount === 1) curr.activeAmount = 2;
      else curr.activeAmount += (curr.activeAmount / 4) * 3;

      curr.activeBidder = sender;
    }
  }, false);

  return sawAuction;
}

function getAuction(id) {
  return auctions.find((auction) => auction.id === id);
}

function getAuctions() {
  return auctions;
}

function removeAuction() {}

module.exports = {
  createAuction,
  updateBid,
  getAuction,
  getAuctions,
  removeAuction,
};
