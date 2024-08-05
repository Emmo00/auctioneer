const { hex2string, string2hex } = require("./utils");
const {
  createAuction,
  updateBid,
  getAuction,
  getAuctions,
} = require("./auction");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);
S;

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));
  const metadata = data.metadata;
  const sender = metadata.msg_sender;
  const payload = data.payload;

  let action = hex2string(payload);
  let response;

  // create auction
  if (action === "create") {
    response = JSON.stringify(createAuction(sender));
  }
  // bid
  else {
    response = updateBid(action, sender);
  }

  const notice_req = await fetch(rollup_server + "/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: string2hex(response) }),
  });
  return "accept";
}

async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));

  const payload = data.payload;

  const route = hex2string(payload);

  let response;

  // list auctions
  if (route === "list") {
    response = JSON.stringify(getAuctions());
  } else {
    // get auction
    response = JSON.stringify(getAuction(route));
  }

  const report_req = await fetch(rollup_server + "/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload: string2hex(response) }),
  });
  return "accept";
}

var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
