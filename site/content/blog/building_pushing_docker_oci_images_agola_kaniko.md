---
type: blog
title: Building and pushing docker/OCI images with Agola and Kaniko
author: "Simone Gotti"
date: 2019-07-22T12:04:43.918Z
rating: '3'
tags: [ "agola", "CI/CD", "devops", "OCI", "docker", "build", "push" ]
categories:
  - devops
---

Today a common need is to build and push docker/OCI images in your CI/CD system. One of the primary issues users are facing when doing this is how to build images inside a container (Agola by default uses containers to execute run tasks). This usually requires using docker-in-docker and so privileged containers or bind mount the host docker socket. These choices can face some security issues or break the container isolation.

With Agola you can build and push docker/OCI images without breaking container isolation thanks to tools like [kaniko](https://github.com/GoogleContainerTools/kaniko)

There's an example repository [here](https://github.com/agola-io/agola-example-kaniko) that contains a simple go program that will be built and put in a docker/OCI image.

### Building the image

Let's walk through the [first run definition](https://github.com/agola-io/agola-example-kaniko/blob/master/.agola/config.yml) in this example (the agola configuration format used in this example is the `yaml` format. But for more advanced definitions you could use the [jsonnet](https://agola.io/doc/config/reference.html#config-file-formats) format):

```yaml
version: v0

runs:
  - name: build image
    tasks:
      - name: build
        runtime:
          containers:
            - image: golang:1.12-stretch
        steps:
          - clone:
          - run:
              name: build the program
              command: go build .
          # Copy the built binary and the Dockerfile to the workspace
          - save_to_workspace:
              contents:
                - source_dir: .
                  dest_dir: /bin/
                  paths:
                    - agola-example-kaniko
                - source_dir: .
                  dest_dir: /
                  paths:
                    - Dockerfile
                    - .dockerignore
      - name: build docker image
        runtime:
          containers:
            - image: gcr.io/kaniko-project/executor:debug
        shell: /busybox/sh
        working_dir: /workspace
        steps:
          - restore_workspace:
              dest_dir: .
          - run: /kaniko/executor --no-push
        depends:
          - build
```


This run definition will build the go program and then create an image without pushing it.

This is a run made of two tasks, the first one will checkout the code and build the go binary. Then it'll copy the binary and the `Dockerfile` in the [run workspace](https://agola.io/doc/concepts/workspaces.html). The `build docker image` task will execute kaniko and build the image.

The `build docker image` task uses the official `gcr.io/kaniko-project/executor:debug` image. The image with debug tag is used as it provides also a busybox shell (useful for debugging purposes). We have to override the default shell since in this image the busybox binaries are in the `/busybox/` directory. Kaniko by default expects the "docker context" inside `/workspace`, so we'll use the `working_dir` task option to set it.


#### Building and Pushing the image

Usually building the image without pushing it to a registry isn't very useful, so let's see the changes needed to also push the image.

We just have to add few lines to the `build docker image` task.

Kaniko documents some ways to authenticate to gcr and aws registries and its images already include a credential helper for amazon ecr. For more information refer to the kaniko doc.

For dockerhub or your own registry you should create a docker `config.json` config file (inside `/kaniko/.docker/config.json`) with the required auth data.


```yaml
version: v0

runs:
  - name: build and push image
    tasks:
      - name: build
        [...]
      - name: build docker image
        runtime:
          containers:
            - image: gcr.io/kaniko-project/executor:debug
        environment:
          DOCKERREGISTRY_URL: "https://index.docker.io/v1/"
          DOCKERAUTH:
            from_variable: dockerauth
        shell: /busybox/sh
        working_dir: /workspace
        steps:
          - restore_workspace:
              dest_dir: .
          - run:
              name: generate docker config
              command: |
                cat << EOF > /kaniko/.docker/config.json
                {
                  "auths": {
                    "$DOCKERREGISTRY_URL": { "auth" : "$DOCKERAUTH" }
                  }
                }
                EOF
          # build and push with kaniko. You can add more than one --destination option.
          - run: /kaniko/executor --destination your/image:tag
        depends:
          - build
```

The environment variable `DOCKERAUTH` is populated from a variable defined inside the Agola projectgroup/project, while, for this example, the `DOCKERREGISTRY_URL` value is defined in the run definition.

As a note, thanks to the powerful [Agola secrets/variables system](https://agola.io/doc/concepts/secrets_variables.html), you are able to map different variables based on different conditions (branch, tag, pull request) so you can reuse the same run definition and use different registries and auths for your development branches, pull request, master branch or tags
