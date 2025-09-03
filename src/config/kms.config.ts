import dotenv from 'dotenv';

dotenv.config();

export const kmsConfig = {
  region: process.env.AWS_REGION,
  keyId: process.env.KMS_KEY_ID,
};