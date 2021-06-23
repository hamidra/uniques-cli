const { Keyring } = require("@polkadot/keyring");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { signAndSendTx } = require("./txHandler");

let connect = async () => {
  const wsProvider = new WsProvider("wss://dotdropdemo.deepnosis.com");
  const keyring = new Keyring({ type: "sr25519" });
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;
  return { api, keyring };
};

exports.mint = async (classId, instanceId, ownerAddr) => {
  let { api, keyring } = await connect();
  let call = api.tx.uniques.mint(classId, instanceId, ownerAddr);
  let pair = keyring.createFromUri("//Alice");
  return signAndSendTx(api, call, pair);
};
