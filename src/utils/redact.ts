const SENSITIVE_KEYS = ['pan', 'creditCard', 'ssn', 'password'];

export function redact(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(redact);
  }

  return Object.keys(obj).reduce((acc, key) => {
    if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
      acc[key] = 'REDACTED';
    } else {
      acc[key] = redact(obj[key]);
    }
    return acc;
  }, {} as any);
}