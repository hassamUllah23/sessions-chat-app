import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { Config } from "./config.service";
const { region, accessKeyId, bucketName, secretKey } = Config.aws;
const client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretKey,
  },
});

async function upload({
  key,
  file,
}: {
  key: string;
  file: File;
}): Promise<number | undefined> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Body: file,
    Key: key,
  });
  const putObjectCommandOutput: PutObjectCommandOutput =
    await client.send(command);
  return putObjectCommandOutput.$metadata.httpStatusCode;
}
const S3Service = {
  upload,
};

export { S3Service };
