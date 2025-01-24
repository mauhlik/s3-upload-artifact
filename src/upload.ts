import type { S3ClientConfig } from '@aws-sdk/client-s3'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'

interface UploadToS3Params {
  paths: string[]
  awsKeyId: string
  awsSecretAccessKey: string
  awsBucket: string
  awsRegion: string
  awsEndpoint?: string
  awsUsePathStyle?: boolean
  remoteNamePrefix?: string
}

export async function uploadToS3({
  awsBucket,
  awsEndpoint,
  awsKeyId,
  awsRegion,
  awsSecretAccessKey,
  awsUsePathStyle,
  paths,
  remoteNamePrefix
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

    const params = {
      Body: fileContent,
      Bucket: awsBucket,
      Key: resolveRemoteName(filePath, remoteNamePrefix)
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
  }
}

export function resolveRemoteName(
  filePath: string,
  remoteNamePrefix?: string
): string {
  if (remoteNamePrefix) {
    remoteNamePrefix = remoteNamePrefix.replace(/^\/+/, '')
    return `${remoteNamePrefix}/${filePath}`
  } else {
    return filePath
  }
}
