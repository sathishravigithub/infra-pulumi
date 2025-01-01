import * as aws from "@pulumi/aws";
import { commontags } from "./commontags"


export const vpc = new aws.ec2.Vpc("ecs-vpc", {
    cidrBlock: "10.0.0.0/16",
    enableDnsSupport: true,
    enableDnsHostnames: true,
    tags: { 
        ...commontags,
        Name: "ecs-vpc" },
});

export const publicSubnet = new aws.ec2.Subnet("public-subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    mapPublicIpOnLaunch: true,
    availabilityZone: "us-east-1a",
    tags: { 
        ...commontags,
        Name: "public-subnet" },
});

export const privateSubnet = new aws.ec2.Subnet("private-subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.2.0/24",
    mapPublicIpOnLaunch: false,
    availabilityZone: "us-east-1a",
    tags: { 
        ...commontags,
        Name: "private-subnet" },
});
