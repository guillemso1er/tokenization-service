import { KmsService } from '../services/kms.service';
import { TokenRepository } from '../data/repositories/token.repository';

export class TokenService {
  constructor(
    private readonly kmsService: KmsService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async tokenize(data: string): Promise<string> {
    const encryptedData = await this.kmsService.encrypt(data);
    const token = await this.tokenRepository.create(encryptedData);
    return token.id;
  }

  async detokenize(token: string): Promise<string> {
    const tokenData = await this.tokenRepository.findById(token);
    if (!tokenData) {
      throw new Error('Token not found');
    }
    return this.kmsService.decrypt(tokenData.encrypted_data);
  }
}