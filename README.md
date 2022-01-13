# Reproducer for https://github.com/aws/aws-cdk/pull/18255

* `npm install`
* `npm run cdk synth` (=> should produce a yaml with success)
* `git checkout aws-cdk-1-139-0`
* `npm install` 
* `npm run cdk synth` (=> should fail with "You need to provide a concrete account for the target stack when using cross-account or cross-region events")
