#!/usr/bin/env node
"use strict";

// uniques calls: ["create","force_create","destroy","mint","burn","transfer","redeposit","freeze","thaw","freeze_class","thaw_class","transfer_ownership","set_team","approve_transfer","cancel_approval","force_asset_status","set_attribute","clear_attribute","set_metadata","clear_metadata","set_class_metadata","clear_class_metadata"]
// instanse calls: [mint, freeze,  thaw, burn, transfer, set_metadata, clear_metadata]
// class calls: [create, freeze_class, thaw_class, destroy, transfer_ownership, set_class_metadata, clear_class_metadata ]

const { Command } = require("commander");
const program = new Command();
const uniques = require("./uniques");

program.version("0.0.1");

program
  .command("mint")
  .description("create an instance")
  .requiredOption("-c, --classId <classId>", "the classId of the asset")
  .requiredOption(
    "-i, --instanceId <instanceId>",
    "the instanceId of the asset"
  )
  .requiredOption(
    "-o, --owner <ownerAddr>",
    "the address of the initial owner of the asset"
  )
  .action(async (options) => {
    try {
      const { classId, instanceId, ownerAddr } = options;
      let result = await uniques.mint(classId, instanceId, ownerAddr);
      console.log(result);
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });

program
  .command("create")
  .description("create an asset class")
  .requiredOption("-c, --classId <classId>", "the classId of the asset")
  .requiredOption(
    "-o, --owner <ownerAddr>",
    "the address of the admin/owner of the asset"
  )
  .action((options) => {
    console.log(options);
  });

program.parseAsync().catch((error) => console.log("error"));
