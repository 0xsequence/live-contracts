import { ContractFactory, type ethers } from "ethers";

type ContractFactoryWithSigner<T extends ethers.ContractFactory> = new (signer: ethers.Signer) => T;

export function getArtifactFactory<T extends ContractFactory>(artifact: {
  abi: ethers.ContractInterface,
  bytecode: { object: string } | string
}) : ContractFactoryWithSigner<T> {
  const bytecode = typeof artifact.bytecode === "string" ? artifact.bytecode : artifact.bytecode.object;
  return class extends ContractFactory {
    constructor(signer: ethers.Signer) {
      super(artifact.abi, bytecode, signer);
    }
  } as unknown as ContractFactoryWithSigner<T>;
}
