
const env = process.env;
export enum RoleEnum {
  SUPERADMIN = 'SUPERADMIN',
  USER = 'USER',
}

export const messagingConfig = {
  emailSender: env.EMAIL_SENDER,
  apiKey: env.MAILJET_API_KEY,
  secret: env.MAILJET_SECRET_KEY,
  resetPasswordUrls: {
    backoffice: env.BACKOFFICE_RESET_PASSWORD_URL,
  },
};



export const awsConfig = {
  client: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
  },
  s3: {
    bucket: env.S3_BUCKET,
  },
} as const;

console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log(process.env.AWS_BUCKET);