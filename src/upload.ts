import type { S3ClientConfig } from '@aws-sdk/client-s3'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'
import { basename } from 'path'

interface UploadToS3Params {
  paths: string[]
  awsKeyId: string
  awsSecretAccessKey: string
  awsBucket: string
  awsRegion: string
  awsEndpoint?: string
  awsUsePathStyle?: boolean
}

export async function uploadToS3({
  awsBucket,
  awsEndpoint,
  awsKeyId,
  awsRegion,
  awsSecretAccessKey,
  awsUsePathStyle,
  paths
}: UploadToS3Params): Promise<void> {
  const s3Options: S3ClientConfig = {
    credentials: {
      accessKeyId: awsKeyId,
      secretAccessKey: awsSecretAccessKey
    },
    forcePathStyle: awsUsePathStyle,
    region: awsRegion
  }
  if (awsEndpoint) {
    s3Options.endpoint = awsEndpoint
  }

  const s3Client = new S3Client(s3Options)

  for (const filePath of paths) {
    const fileContent = readFileSync(filePath)
    const fileName = basename(filePath)

    const params = {
      Body: fileContent,
      Bucket: awsBucket,
      Key: fileName
    }

    //logger.info(`Uploading ${fileName} to ${awsBucket}/${fileName}`);
    //logger.info(`File size: ${fileContent.length} bytes`);

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    //logger.info(`Successfully uploaded ${fileName} to ${awsBucket}/${fileName}`);
  }
}
