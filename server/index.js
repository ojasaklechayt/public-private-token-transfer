const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04d8924540ba7f36fed64f52a80c696faa880530cbcdeef857ce50034ceb3fdf3a447a428f681884a690dfd2d63908a6841c2b617b47b0e2e64d8ab64bf644966a": 100,
  "04751f388930b7899df41738d15ad202fcac5e1b974d9a6c997b77c6d622faa749d75f40242616cc515b3c5d813b05208366bb2abd4231db22eca85e362d599447": 50,
  "0481c1a070172220fed6a72c0fd7b4a5520ac374ede72a1419222ec6875a1a908ccbff03fc4e0d9734b841efa5de9fb007e5246e5e173d09da91f984e6ba1a3d6d": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
