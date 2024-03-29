import { hasEmptyValues } from "../utils/functions.utils";
type RootConfig = {
  aws: {
    region: string;
    bucketName: string;
    bucketUrl?: string;
    accessKeyId: string;
    secretKey: string;
  };
};
const Config: RootConfig = {
  aws: {
    region: import.meta.env.VITE_AWS_REGION,
    bucketName: import.meta.env.VITE_AWS_BUCKET_NAME,
    bucketUrl: import.meta.env.VITE_AWS_BUCKET_URL,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
};

if (hasEmptyValues(Config)) {
  console.error("\n\nPLEASE ENSURE ALL ENVIRONMENT VARIABLES ARE SET\n\n");
}

export { Config };
