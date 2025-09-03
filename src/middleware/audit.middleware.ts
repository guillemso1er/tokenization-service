import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service';
import { redact } from '../utils/redact';

const auditService = new AuditService();

export const auditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalSend = res.send;
  res.send = function (body) {
    const logDetails = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      requestBody: redact(req.body),
      responseBody: redact(JSON.parse(body)),
      statusCode: res.statusCode,
    };

    auditService.log('API_REQUEST', req.user?.id, logDetails);
    return originalSend.call(this, body);
  };
  next();
};