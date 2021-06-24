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

program.parseAsync().catch((error) => console.log("error"));
