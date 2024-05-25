import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

const stack = pulumi.getStack();

const defaultVpc = new awsx.ec2.DefaultVpc('default-vpc');

const serverTg = pulumi.Output.create(new aws.lb.TargetGroup(`test-server-tg-${stack}`, {
  vpcId: defaultVpc.vpcId,
  port: 80,
  protocol: 'HTTP',
  targetType: 'ip',
  protocolVersion: 'HTTP1',
}));

new awsx.lb.ApplicationLoadBalancer(`test-lb-${stack}`, {
  listeners: [
    {
      port: 443,
      protocol: 'HTTP',
      defaultActions: [{
        type: 'forward',
        targetGroupArn: serverTg.arn,
      }],
    }
  ]
});
