import * as aws from "@pulumi/aws";
import { publicSubnet, privateSubnet } from "./vpc";
import { webUISG, webApiSG } from "./sg";
import { commontags } from "./commontags";

// ECS Cluster
export const cluster = new aws.ecs.Cluster("ecs-cluster");

// Web UI Task Definition
export const webUITaskDefinition = new aws.ecs.TaskDefinition("web-ui-task", {
    family: "web-ui",
    containerDefinitions: JSON.stringify([{
        name: "web-ui",
        image: "web-ui-image",
        memory: 512,
        cpu: 256,
        essential: true,
        portMappings: [{ containerPort: 80 }],
    }]),
    requiresCompatibilities: ["FARGATE"],
    networkMode: "awsvpc",
    cpu: "256",
    memory: "512",
    tags: commontags 
});

// Web UI Service
export const webUIService = new aws.ecs.Service("web-ui-service", {
    cluster: cluster.id,
    taskDefinition: webUITaskDefinition.arn,
    desiredCount: 2,
    networkConfiguration: {
        subnets: [publicSubnet.id],
        securityGroups: [webUISG.id],
        tags: commontags 
    },
});

// Web API Task Definition and Service 


export const webAPITaskDefinition = new aws.ecs.TaskDefinition("web-api-task", {
    family: "web-api",
    containerDefinitions: JSON.stringify([{
        name: "web-api",
        image: "api-image",
        memory: 512,
        cpu: 256,
        essential: true,
        portMappings: [{ containerPort: 8080 }],
    }]),
    requiresCompatibilities: ["FARGATE"],
    networkMode: "awsvpc",
    cpu: "256",
    memory: "512",
    tags: commontags 
});


export const webAPIService = new aws.ecs.Service("web-api-service", {
    cluster: cluster.id,
    taskDefinition: webAPITaskDefinition.arn,
    desiredCount: 2,
    networkConfiguration: {
        subnets: [privateSubnet.id],
        securityGroups: [webApiSG.id],
    },
});
