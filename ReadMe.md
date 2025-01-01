# Pulumi ECS Fargate Example

This project demonstrates how to deploy **Web UI** and **Web API** services on **AWS Fargate** using **Pulumi**.

The ECS services are configured to run in a **public subnet** for the Web UI and a **private subnet** for the Web API. Communication between the Web UI and Web API services

Depends on the Application requirement, we can use EC2 as backend, if we need to store any volumes

![AWS-Fargate](my-image.png)


## Prerequisites

Before you begin, you need to have the following installed and configured:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [Pulumi](https://www.pulumi.com/docs/get-started/install/) (>= 3.x)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- AWS account with appropriate permissions



# How to Run

install docker on your machine: [Install Docker](https://docs.docker.com/engine/install/)


Open terminal and run:
```
docker-compose up
```

Open a web browser and navigate to 
```
http://localhost:3000
```


# Application Details

- Web: ASP.NET Core 5.0 Web APP
  - `this application requires an environment variabled called "ApiAddress" which will be the address of the Web Api.`
- API: ASP.NET Core 5.0 Web API


