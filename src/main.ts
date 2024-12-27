import * as core from '@actions/core'
import { uploadToS3 } from './upload'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const awsKeyId = core.getInput('aws-access-key-id', { required: true })
    const awsSecretAccessKey = core.getInput('aws-secret-access-key', {
      required: true
    })
    const awsBucket = core.getInput('aws-bucket', { required: true })
    const awsRegion = core.getInput('aws-region', { required: true })
    const paths = core.getMultilineInput('path', { required: true })
    const awsEndpoint = core.getInput('aws-endpoint-url', { required: false })
    const awsUsePathStyle = core.getBooleanInput('aws-use-path-style', {
      required: false
    })

    await uploadToS3({
      paths,
      awsKeyId,
      awsSecretAccessKey,
      awsBucket,
      awsRegion,
      awsEndpoint,
      awsUsePathStyle
    })
  } catch (error) {
    console.error(error)
    core.setFailed((error as Error).message)
  }
}
