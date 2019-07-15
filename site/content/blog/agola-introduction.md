---
type: blog
title: 'Introducing Agola: CI/CD redefined'
author: "Simone Gotti"
date: 2019-07-14T21:56:34.820Z
rating: '3'
tags: [ "agola", "CI/CD", "devops", "runs", "kubernetes", "docker", "high availability", "distributed system", "github", "gitlab", "gitea", "etcd" ]
categories:
  - devops
---


# Introducing **Agola**: CI/CD redefined

![](https://agola.io/screenshots/screenshot_run_01.png)

There're many CI/CD tools outside, some of them are available only as SaaS (and many are free for Open Source projects but some of them are closed source), others are open source and you can install them wherever you want. So: why another CI/CD tool?

At [Sorint.lab](https://www.sorint.it) we used many different CI/CD tools for years, our Open Source projects usually use free SaaS tools, internally and from our customer we used Open Source tools installed on premise. So, in the years, we got a great deal of knowledge on many CI/CD tools and learned many of their pros and cons. In the end we always struggled to achieve some features that we considered very important for such kind of tools. That's why we created our own tool: Agola.

What are the requirements we tried to satisfy while designing and writing Agola?

* Easy to install and manage.
* Scalable and High Available: go from a single instance (single process) deployment to a distributed deployment.
* Deploy anywhere: Kubernetes, IaaS, bare metal and execute the "tasks" anywhere (currently containers executors like docker or orchestrators and Kubernetes, but easily extensible to future technologies or VMs instead of containers).
* Support any language, deployment system etc... (just use the right image)
* Integrate with multiple git providers at the same time: you could add repos from github, gitlab, gitea (and more to come) inside the same agola installation.
* Use it to manage the full development lifecycle: from build to deploy.
* Tasks Workflows (that we called **Runs**) with ability to achieve fan-in, fan-out, matrixes etc..., everything containerized to achieve maximum reproducibility.
* Git based workflow: the run definition is committed inside the git repository (so everything is tracked and reproducible). A run execution is started by a git action (push, pull-request).
* Design it with the ability to achieve at most once runs: during a deployment to production we don't want multiple concurrent execution of the deploy...
* Restartable and reproducible Runs (restart a run from scratch or from failed tasks using the same source commit, variables etc...)
* [User Direct Runs](https://agola.io/doc/concepts/user_direct_runs.html): give every user the power to test their software using the same run definition used when pushing to git/opening a pull request inside the Agola installation with just one command like if they were running tests locally (without requiring a super powerful workstation).
* Testable "Runs" (what is a CI/CD environment if you cannot test your changes to the Runs definitions?): use the same run definition but use a powerful [secrets and variables system](https://agola.io/doc/concepts/secrets_variables.html) to access different resources (environments, docker registries etc...).
* Don't try to extend YAML to be a templating language but use a real templating language (as of now [jsonnet](https://jsonnet.org/)) to easily generate the run configuration without side effects.
* An advanced permissions system (work in progress).
* Dependency Caching to speed up tasks


## Runs

**Runs** are a workflow. Agola is a continuous Doer deeply integrated in a git based workflow. Agola (or better one of its main services: **Run Service**) executes "commands" in an containerized and organized way. These commands can be anything, written in any language and do whatever you want. It fits perfectly for a CI/CD system.

Runs are made of tasks that can depend on other tasks and execute only on some conditions, tasks are containerized executions made of multiple sequential steps.

## Git based workflow

We deeply integrated it in a git based workflow because to achieve the best results and automation we have to track everything. A Git workflow let you track and control everything via git. The runs definition is inside the git repository so it's deeply attached to the code and can be reviewed as everything else.
If you love code review (we do), use pull/merge request to do it and agola will execute the run on the PR and provide the run status before you merge your changes to the "master" branch. If you use features branches Agola will execute the runs at every push and provide run status for that commit.
If you want to deploy to production when pushing to master new commits or tags, agola can do this.

### Agola architecture

Agola is young but a big and ambitious project. In the next weeks we'll create more posts detailing its internals and architectural peculiarities.

Just as a small taste, Agola is composed of [multiple services](https://agola.io/doc/architecture/) and it's extensible by writing new service on top of its base services APIs (no old style plugins!). To be fully distributed and high available some if its services use two primary components:

* [etcd](https://github.com/etcd-io/etc) to coordinate multiple instances (in many ways)
* An object storage (as of today a shared posix fs like nfs, cephfs or an s3 like compatible storage)

Someone may ask now: "where's the database?". If you mean where's a relational (talking sql language) database that stores all the config, run data etc... the answer is: there isn't.

A good thing of developing something new is that you can try to do something different. Beside trying to improve the CI/CD experience we also wanted to experiment (and try to innovate) with some new architectural choices.

Since we want a fully distributed and high available system we wanted to rely only on components that could be fully distributed and high available: etcd and an object storage meet these requirements. So, instead of adding a third component that will increase the project requirements and that is, as of today, difficult to scale and made high available (ok there are some products that can achieve this like [cockroachdb](https://www.cockroachlabs.com/)) and be free to structure our data as we preferred, we tried to achieve a atomic, consistent, isolated and transactional store using etcd and an object storage.

In this way everything is managed at the application level without putting part of the logic inside the relational database (constraints, foreign keys etc...) or relying on features that are available only on some products. But this is a big argument (and an experiment that could change or prove it wrong) that we'd like to elaborate in a future post (an hint: we are not ditching relational databases, if you look at the agola code you'll find a package called readdb that uses sqlite: yes we are using a **per instance/local**, **rebuildable**, **subject to a lot of schema changes** relational database as a read only database for queries).


## Try it

Just try [the agola demo](https://agola.io/tryit/) and see how we are using it to [build/test agola](https://github.com/agola-io/agola/blob/master/.agola/config.jsonnet)

The Agola documentation with various examples is in the [Agola web site](https://agola.io)

### Get in touch

Agola is an open source project created by [Sorint.lab](https://www.sorint.it) but we need a community around it. To get in touch for anything (contributing, help, proposals etc...) join the [Agola forums](https://talk.agola.io) and our [github organization](https://github.com/agola-io). And don't forget to leave a star on the agola main repository (https://github.com/agola-io/agola), it costs you nothing!

