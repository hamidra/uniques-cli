const { Keyring } = require("@polkadot/keyring");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { signAndSendTx } = require("./txHandler");

// uniques calls: ["create","force_create","destroy","mint","burn","transfer","redeposit","freeze","thaw","freeze_class","thaw_class","transfer_ownership","set_team","approve_transfer","cancel_approval","force_asset_status","set_attribute","clear_attribute","set_metadata","clear_metadata","set_class_metadata","clear_class_metadata"]
// instanse calls: [mint, freeze,  thaw, burn, transfer, set_metadata, clear_metadata]
// class calls: [create, freeze_class, thaw_class, destroy, transfer_ownership, set_class_metadata, clear_class_metadata ]

let connect = async () => {
  const wsProvider = new WsProvider("wss://dotdropdemo.deepnosis.com");
  const keyring = new Keyring({ type: "sr25519" });
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;
  return { api, keyring };
};

let getPair = (keyring, seed = "//Alice") => {
  return keyring.createFromUri(seed);
};
exports.mint = async (classId, instanceId, ownerAddr) => {
  let { api, keyring } = await connect();
  let call = api.tx.uniques.mint(classId, instanceId, ownerAddr);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// create(class: Compact<ClassId>, admin: LookupSource)
exports.create = async (classId, admin) => {
  let { api, keyring } = await connect();
  let call = api.tx.uniques.create(classId, admin);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// freeze(class: Compact<ClassId>, instance: Compact<InstanceId>)
// freezeClass(class: Compact<ClassId>)
exports.freeze = async (classId, instanceId) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.freeze(classId, instanceId)
    : api.tx.uniques.freezeClass(classId);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};
