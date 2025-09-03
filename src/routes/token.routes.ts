import { Router } from 'express';
import { TokenService } from '../core/token.service';
import { KmsService } from '../services/kms.service';
import { TokenRepository } from '../data/repositories/token.repository';
import { authMiddleware, rbacMiddleware } from '../middleware/auth.middleware';
import { validateTokenizeRequest } from '../middleware/validation.middleware';

const router = Router();
const kmsService = new KmsService();
const tokenRepository = new TokenRepository();
const tokenService = new TokenService(kmsService, tokenRepository);

router.post(
  '/tokenize',
  authMiddleware,
  rbacMiddleware(['admin', 'editor']),
  validateTokenizeRequest,
  async (req, res) => {
    const { data } = req.body;
    const token = await tokenService.tokenize(data);
    res.json({ token });
  },
);

router.get(
  '/detokenize/:token',
  authMiddleware,
  rbacMiddleware(['admin']),
  async (req, res) => {
    const { token } = req.params;
    try {
      const data = await tokenService.detokenize(token);
      res.json({ data });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
);

export default router;