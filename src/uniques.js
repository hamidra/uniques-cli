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

// thaw(class: Compact<ClassId>, instance: Compact<InstanceId>)
// thawClass(class: Compact<ClassId>)
exports.thaw = async (classId, instanceId) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.thaw(classId, instanceId)
    : api.tx.uniques.thawClass(classId);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// burn(class: Compact<ClassId>, instance: Compact<InstanceId>, check_owner: Option<LookupSource>)#
exports.burn = async (classId, instanceId, owner) => {
  let { api, keyring } = await connect();
  let call = api.tx.uniques.burn(classId, instanceId, owner);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// destroy(class: Compact<ClassId>, witness: DestroyWitness)
exports.destroy = async (classId, witness) => {
  let { api, keyring } = await connect();
  let call = api.tx.uniques.destroy(classId, witness);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// transfer(class: Compact<ClassId>, instance: Compact<InstanceId>, dest: LookupSource)
// transferOwnership(class: Compact<ClassId>, owner: LookupSource)
exports.transfer = async (classId, instanceId, dest) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.transfer(classId, instanceId, dest)
    : api.tx.uniques.transferOwnership(classId, dest);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// setMetadata(class: Compact<ClassId>, instance: Compact<InstanceId>, data: Bytes, is_frozen: bool)
// setClassMetadata(class: Compact<ClassId>, data: Bytes, is_frozen: bool)
exports.setMetadata = async (classId, instanceId, metaData, isFrozen) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.setMetadata(classId, instanceId, metaData, isFrozen)
    : api.tx.uniques.setClassMetadata(classId, metaData, isFrozen);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// clearMetadata(class: Compact<ClassId>, instance: Compact<InstanceId>)
// clearClassMetadata(class: Compact<ClassId>)
exports.clearMetadata = async (classId, instanceId) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.clearMetadata(classId, instanceId)
    : api.tx.uniques.clearClassMetadata(classId);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// setAttribute(class: Compact<ClassId>, maybe_instance: Option<InstanceId>, key: Bytes, value: Bytes)
exports.setAttribute = async (classId, instanceId, key, value) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.setAttribute(classId, instanceId, key, value)
    : api.tx.uniques.setAttribute(classId, key, value);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};

// clearAttribute(class: Compact<ClassId>, maybe_instance: Option<InstanceId>, key: Bytes)
exports.clearAttribute = async (classId, instanceId, key) => {
  let { api, keyring } = await connect();
  let call = !!instanceId
    ? api.tx.uniques.clearAttribute(classId, instanceId, key)
    : api.tx.uniques.clearAttribute(classId, key);
  let pair = getPair(keyring);
  return signAndSendTx(api, call, pair);
};
