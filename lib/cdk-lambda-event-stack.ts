import { Stack, StackProps } from '@aws-cdk/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLambdaEventStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkLambdaEventQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
