import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";
import { commontags } from "./commontags";
export const webUISG = new aws.ec2.SecurityGroup("web-ui-sg", {
    vpcId: vpc.id,
    tags: commontags,
    ingress: [
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
    ],
    egress: [
        { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },
    ],
});

export const webApiSG = new aws.ec2.SecurityGroup("web-api-sg", {
    vpcId: vpc.id,
    tags: commontags,
    ingress: [
        {
            protocol: "tcp",
            fromPort: 8080,
            toPort: 8080,
            securityGroups: [webUISG.id],
        },
    ],
    egress: [
        { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] },
    ],
    
});



