import { AuditLogRepository } from '../data/repositories/audit-log.repository';

export class AuditService {
  private readonly auditLogRepository = new AuditLogRepository();

  async log(
    action: string,
    userId: string | undefined,
    details: Record<string, unknown>,
  ) {
    await this.auditLogRepository.create({
      action,
      user_id: userId,
      details,
    });
  }
}