#!/usr/bin/env node
"use strict";

// uniques calls: ["create","force_create","destroy","mint","burn","transfer","redeposit","freeze","thaw","freeze_class","thaw_class","transfer_ownership","set_team","approve_transfer","cancel_approval","force_asset_status","set_attribute","clear_attribute","set_metadata","clear_metadata","set_class_metadata","clear_class_metadata"]
// instanse calls: [mint, freeze,  thaw, burn, transfer, set_metadata, clear_metadata]
// class calls: [create, freeze_class, thaw_class, destroy, transfer_ownership, set_class_metadata, clear_class_metadata ]

const { Command } = require("commander");
const program = new Command();
const uniques = require("./uniques");

program.version("0.0.1");

// mint
program
  .command("mint")
  .description("create an instance")
  .requiredOption(
    "--classId <classId>",
    "the classId for an asset of the asset"
  )
  .requiredOption("--instanceId <instanceId>", "the instanceId of the asset")
  .requiredOption(
    "--owner <ownerAddr>",
    "the address of the initial owner of the asset"
  )
  .action(async (options) => {
    try {
      const { classId, instanceId, owner } = options;
      let events = await uniques.mint(classId, instanceId, owner);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// create
program
  .command("create")
  .description("create an asset class")
  .requiredOption("--classId <classId>", "the classId of the asset")
  .requiredOption(
    "--admin <adminAddr>",
    "the address of the admin of the asset class"
  )
  .action(async (options) => {
    try {
      const { classId, admin } = options;
      let events = await uniques.create(classId, admin);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// freeze
program
  .command("freeze")
  .description(
    "freeze an asset class or an instance of the class if instanceId is specified"
  )
  .requiredOption("--classId <classId>", "the classId of the asset")
  .option(
    "--instanceId <instanceId>",
    "the instanceId of the asset. if specified only the specific instance will be frozen"
  )
  .action(async (options) => {
    try {
      const { classId, instanceId } = options;
      let events = await uniques.freeze(classId, instanceId);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// thaw
program
  .command("thaw")
  .description(
    "thaw a frozen asset class or an instance of the class if instanceId is specified"
  )
  .requiredOption("--classId <classId>", "the classId of the asset")
  .option(
    "--instanceId <instanceId>",
    "the instanceId of the asset. if specified only the specific instance will be frozen"
  )
  .action(async (options) => {
    try {
      const { classId, instanceId } = options;
      let events = await uniques.thaw(classId, instanceId);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// burn
program
  .command("burn")
  .description("burn an instance of the class")
  .requiredOption("--classId <classId>", "the classId of the asset")
  .requiredOption("--instanceId <instanceId>", "the instanceId of the asset.")
  .action(async (options) => {
    try {
      const { classId, instanceId } = options;
      let events = await uniques.burn(classId, instanceId);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// destroy
program
  .command("destroy")
  .description("destroy an an asset class")
  .requiredOption(
    "--classId <classId>",
    "the classId of the asset class to be destroyed"
  )
  .requiredOption(
    "--witness <witness>",
    `Information on the instances minted in the asset class. This must be correct.
    Emits Destroyed event when successful.
    Weight: O(n + m) where:
    \t n = witness.instances
    \t m = witness.instance_metdadatas
    \t a = witness.attributes`
  )
  .action(async (options) => {
    try {
      const { classId, witness } = options;
      let events = await uniques.destroy(classId, witness);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// transfer
program
  .command("transfer")
  .description(
    "Move the ownership of an asset class or an asset instance from the sender account to another."
  )
  .requiredOption("--classId <classId>", "the classId of the asset")
  .option(
    "--instanceId <instanceId>",
    "the instanceId of the asset. if specified only the specific instance will be transferred"
  )
  .requiredOption(
    "--dest <dest>",
    "the address of the destination account that the asset will be tranferred to."
  )
  .action(async (options) => {
    try {
      const { classId, instanceId, dest } = options;
      let events = await uniques.transfer(classId, instanceId, dest);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

// metadata
const metaCmd = program
  .command("meta")
  .description("set or clear the metadat for an asset class or instance.")
  .requiredOption("--classId <classId>", "the classId of the asset")
  .option(
    "--instanceId <instanceId>",
    "the instanceId of the asset. if specified only the specific instance will be transferred"
  );

metaCmd
  .command("set")
  .requiredOption(
    "--data <data>",
    "The general information of this asset. Limited in length by StringLimit."
  )
  .requiredOption(
    "--freeze",
    "if specified the metadata should be frozen against further changes."
  )
  .action(async (options) => {
    try {
      const { classId, instanceId, data, freeze } = options;
      let events = await uniques.setMetadata(classId, instanceId, data, freeze);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

metaCmd.command("clear").action(async (options) => {
  try {
    const { classId, instanceId } = options;
    let events = await uniques.clearMetadata(classId, instanceId);
    console.log("call succeeded");
    process.exit(0);
  } catch (error) {
    console.log(`call failed with error: \n\t ${error}`);
    process.exit(1);
  }
});

// attributes
// metadata
const attrCmd = program
  .command("attributes")
  .description("Set or clear attributes for an asset class or instance")
  .requiredOption("--classId <classId>", "the classId of the asset")
  .option(
    "--instanceId <instanceId>",
    "the instanceId of the asset. if specified only the specific instance will be transferred"
  )
  .requiredOption("--key <key>", "The key for an attribute");

metaCmd
  .command("set")
  .requiredOption("--value <vlaue>", "The value of the attribute to be set.")
  .action(async (options) => {
    try {
      const { classId, instanceId, key, value } = options;
      let events = await uniques.setAttribute(classId, instanceId, key, value);
      console.log("call succeeded");
      process.exit(0);
    } catch (error) {
      console.log(`call failed with error: \n\t ${error}`);
      process.exit(1);
    }
  });

metaCmd.command("clear").action(async (options) => {
  try {
    const { classId, instanceId, key } = options;
    let events = await uniques.clearAttribute(classId, instanceId, key);
    console.log("call succeeded");
    process.exit(0);
  } catch (error) {
    console.log(`call failed with error: \n\t ${error}`);
    process.exit(1);
  }
});

program.parseAsync().catch((error) => console.log("error"));
