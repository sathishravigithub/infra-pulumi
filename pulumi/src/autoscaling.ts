import * as aws from "@pulumi/aws";
import { webUIService, webAPITaskDefinition, cluster } from "./ecs; 
import { commontags } from "./commontags";

// Web UI Service Auto Scaling Target
const webUIServiceScalingTarget = new aws.appautoscaling.Target("web-ui-service-scaling-target", {
    maxCapacity: 10,  // Max tasks (scale up limit)
    minCapacity: 2,   // Min tasks (scale down limit)
    resourceId: `service/${cluster.id}/${webUIService.name}`,
    scalableDimension: "ecs:service:DesiredCount",
    serviceNamespace: "ecs",
    tags: commontags, 
});

// Web UI Service Auto Scaling Policy
const webUIScalingPolicy = new aws.appautoscaling.Policy("web-ui-scaling-policy", {
    policyType: "TargetTrackingScaling",  // Scaling based on a target value
    resourceId: webUIServiceScalingTarget.resourceId,
    scalableDimension: webUIServiceScalingTarget.scalableDimension,
    serviceNamespace: webUIServiceScalingTarget.serviceNamespace,
    targetTrackingScalingPolicyConfiguration: {
        targetValue: 70,  // Target CPU utilization in percentage
        predefinedMetricSpecification: {
            predefinedMetricType: "ECSServiceAverageCPUUtilization",
        },
        scaleInCooldown: 60,  // Cooldown time after scaling in
        scaleOutCooldown: 60,  // Cooldown time after scaling out
        tags: commontags, 
    },
});

// Web API Service Auto Scaling Target
const webAPIServiceScalingTarget = new aws.appautoscaling.Target("web-api-service-scaling-target", {
    maxCapacity: 10,  // Max tasks (scale up limit)
    minCapacity: 2,   // Min tasks (scale down limit)
    resourceId: `service/${cluster.id}/${webUIService.name}`, // Use the correct web API service name here
    scalableDimension: "ecs:service:DesiredCount",
    serviceNamespace: "ecs",
    tags: commontags, 
});

// Web API Service Auto Scaling Policy
const webAPIScalingPolicy = new aws.appautoscaling.Policy("web-api-scaling-policy", {
    policyType: "TargetTrackingScaling",  // Scaling based on a target value
    resourceId: webAPIServiceScalingTarget.resourceId,
    scalableDimension: webAPIServiceScalingTarget.scalableDimension,
    serviceNamespace: webAPIServiceScalingTarget.serviceNamespace,
    targetTrackingScalingPolicyConfiguration: {
        targetValue: 70,  // Target CPU utilization in percentage
        predefinedMetricSpecification: {
            predefinedMetricType: "ECSServiceAverageCPUUtilization",
        },
        scaleInCooldown: 60,  // Cooldown time after scaling in
        scaleOutCooldown: 60,  // Cooldown time after scaling out
    },
    tags: commontags, 
});
