import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
} from '@aws-sdk/client-kms';
import { kmsConfig } from '../config';

export class KmsService {
  private readonly client = new KMSClient({ region: kmsConfig.region });

  async encrypt(data: string): Promise<string> {
    const command = new EncryptCommand({
      KeyId: kmsConfig.keyId,
      Plaintext: Buffer.from(data),
    });

    const { CiphertextBlob } = await this.client.send(command);
    return Buffer.from(CiphertextBlob).toString('base64');
  }

  async decrypt(encryptedData: string): Promise<string> {
    const command = new DecryptCommand({
      KeyId: kmsConfig.keyId,
      CiphertextBlob: Buffer.from(encryptedData, 'base64'),
    });

    const { Plaintext } = await this.client.send(command);
    return Buffer.from(Plaintext).toString();
  }
}