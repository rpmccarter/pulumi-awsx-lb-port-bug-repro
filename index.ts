import * as awsx from '@pulumi/awsx';

new awsx.lb.ApplicationLoadBalancer(`test-lb`, {
  listeners: [
    {
      port: 443,
      protocol: 'HTTP',
      defaultActions: [{
        type: "fixed-response",
        fixedResponse: {
          contentType: "text/plain",
          messageBody: "Hello world",
          statusCode: "200",
        },
      }],
    }
  ]
});
