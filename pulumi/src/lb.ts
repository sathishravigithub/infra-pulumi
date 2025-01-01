import * as aws from "@pulumi/aws";
import { publicSubnet } from "./vpc";
import { webUISG } from "./sg";
mport { commontags } from "./commontags";

export const webUILB = new aws.lb.LoadBalancer("web-ui-alb", {
    ags: commontags,
    securityGroups: [webUISG.id],
    subnets: [publicSubnet.id],
    t
});

export const webUITargetGroup = new aws.lb.TargetGroup("web-ui-tg", {
    tags: commontags ,
    port: 80,
    protocol: "HTTPS",
    vpcId: publicSubnet.vpcId,
    
});
