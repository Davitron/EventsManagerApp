### Containerized App


## Prerequisites

To foolow the instructions in this documentation the following should be installed

- Docker
  
  `brew install docker`

- [glcoud](https://cloud.google.com/sdk/docs/)

- kubernetes

  `gcloud components install kubectl`

In the branch `containerize-app`, There are 4 files that play an important role in containerizing my checkpoint.

- Dockerfile
- docker-compose.yml
- deployment.yml
- service.yml

All 4 are located in the root directory of the file.

The Dockerfile contains instructions used for building the image. The base image is `ubuntu:16.04`.

`FROM ubuntu:16.04`

 A base image is the basic image on which layers are added such as file system changes basically to create a final image containing an application or a service.
 
NodeJS and npm are installed in the image to provision it for the node application.

```
# install curl, nodejs and npm
RUN apt-get update -y && \
  apt-get install curl -y && \
  curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh && \
  bash nodesource_setup.sh && \
  apt-get install nodejs -y
```

After that, all the application files are copied into the working directory in the in image

`COPY . .`

The application dependencies are installed and the app is built with 

```
RUN npm install && \
  npm run full-build
```

The port the application will run on is exposed and also the entry poit of the application.

```
EXPOSE 8002

ENTRYPOINT [ "node", "./build/server.js" ]
```

To build the image we run:
`docker build -t gcr.io/${PROJECT_ID}/node-app-demo:0.0.1 .`

The image is tagged with ` gcr.io/${PROJECT_ID}/node-app-demo:0.0.1` because we want to push the image to Google container registry. Where `PROJECT_ID` it the name of the google project
 
In the docker-compose.yml file the app is composed as a service.

To create a container of this image locally run the command: `docker-compose up` and navigate to `localhost:8002`

The deployment is done with Kubernetes. In the deployement.yml create a Kubernetes Deployment which creates a pod for the container.

```
A Kubernetes pod is a group of containers, tied together for the purposes of administration and networking that are always co-located and co-scheduled, and run in a shared context.
```

To create the deployment, run: `kubectl create -f deployment.yml`

To expose the application to external traffic, a kubernetes service was setup in the `service.yml` file.

```
A Kubernetes Service is an abstraction which defines a logical set of Pods and a policy by which to access them - sometimes called a micro-service. It enables external traffic exposure, load balancing and service discovery for those Pods.
```
 The `prototcol`, `port` and `targetPort` are specified in the file.

```
  ports:
    - protocol: TCP
      port: 8002
      targetPort: 8002
```

To create the service run: `kubectl create -f service.yml`