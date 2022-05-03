// Subset of the interfaces of the IC provider we are using directly - i.e. not through the sync provider
export declare class Principal {
  private _arr;
  static anonymous(): Principal;
  static selfAuthenticating(publicKey: Uint8Array): Principal;
  static from(other: unknown): Principal;
  static fromHex(hex: string): Principal;
  static fromText(text: string): Principal;
  static fromUint8Array(arr: Uint8Array): Principal;
  readonly _isPrincipal = true;
  protected constructor(_arr: Uint8Array);
  isAnonymous(): boolean;
  toUint8Array(): Uint8Array;
  toHex(): string;
  toText(): string;
  toString(): string;
}

export interface CanisterBalance {
  bucketId: Principal | undefined;
  balance: bigint;
}

export interface CanistersBalance {
  data: CanisterBalance;
  storage: CanisterBalance;
}
