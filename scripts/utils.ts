import { ContractFactory, ethers } from "ethers";

export function getArtifactFactory<T extends ContractFactory>(artifact: {
  abi: ethers.ContractInterface,
  bytecode: { object: string } | string
}) : new (signer: ethers.Signer) => T {
  const bytecode = typeof artifact.bytecode === "string" ? artifact.bytecode : artifact.bytecode.object;
  return class extends ContractFactory {
    constructor(signer: ethers.Signer) {
      super(artifact.abi, bytecode, signer);
    }
  } as any
}
