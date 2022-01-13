import {ScopedAws, Stack, StackProps} from '@aws-cdk/core';
import { Construct } from 'constructs';
import {Artifact, Pipeline} from "@aws-cdk/aws-codepipeline";
import {Function} from "@aws-cdk/aws-lambda";
import {LambdaFunction} from "@aws-cdk/aws-events-targets";
import {CodeCommitSourceAction, ManualApprovalAction} from "@aws-cdk/aws-codepipeline-actions";
import {Repository} from "@aws-cdk/aws-codecommit";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLambdaEventStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new Pipeline(this, 'Pipeline', {
    });
    pipeline.addStage({
      actions: [
        new CodeCommitSourceAction({
          actionName: 'source',
          repository: new Repository(this, 'repository', {
            repositoryName: 'hello-world'
          }),
          output: new Artifact("sourceArtifcact")
        })
      ],
      stageName: 'first'
    })
    pipeline.addStage({
      actions: [
        new ManualApprovalAction({actionName: 'approve'})
      ],
      stageName: 'second'
    })

    const {region, accountId} = new ScopedAws(this);
    const functionName = "some-function-name-in-same-account";
    const lambda = Function.fromFunctionArn(this, 'lambda', `arn:aws:lambda:${region}:${accountId}:function:${functionName}`);

    pipeline.onStateChange('Notify', {target: new LambdaFunction(lambda)});

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkLambdaEventQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
