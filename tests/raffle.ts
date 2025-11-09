import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Raffle } from "../target/types/raffle";
import { assert } from "chai";

describe("raffle", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Raffle as Program<Raffle>;

  it("Initializes a raffle", async () => {
    // TODO: Implement test
    console.log("Test: Initialize raffle");
  });

  it("Allows users to enter raffle", async () => {
    // TODO: Implement test
    console.log("Test: Enter raffle");
  });

  it("Draws a winner", async () => {
    // TODO: Implement test
    console.log("Test: Draw winner");
  });

  it("Winner can claim prize", async () => {
    // TODO: Implement test
    console.log("Test: Claim prize");
  });
});
