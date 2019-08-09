---
type: blog
title: 'Agola Direct Runs: Power to the Developers!'
author: "Simone Gotti"
date: 2019-08-07T16:53:12.283Z
rating: '3'
tags: [ "agola", "direct runs", "CI/CD", "devops", "runs", "git" ]
categories:
  - devops
---

# Agola Direct Runs: Power to the Developers!

When we started drafting the big list of Agola wanted features, one of the primary requirements we heard from many developers was the ability to execute the agola **Runs** (or pipelines/workflows in other CI/CD tool concepts) from their local development directory while they were developing new features at any time (and without the need to commit).

There are many good reasons to ask for this:

* They want to be sure that all the pipelines will finish successfully before opening a pull request or pushing to a branch (to avoid a loop of force push and wait for the CI/CD run being successful).
* They want to test conditional **runs** (a run that have tasks that depends on diffent conditions: if it's a push to a branch, a push of a tag, a pull request etc...) and simulate the different conditions.
* Usually developers are able to only execute a subset of tests locally but when they want to execute the same CI/CD pipeline that is executed by their CI/CD tools they face different problems:
  * Their local environment is not a clean environment like the one where an agola run is executed (since every task is executed inside a container).
  * Their laptops/desktops aren't usually powerful enough to execute it.
  * A continuous delivery system is not just for tests but for a complete workflow (i.e. building images, deploying to test/staging/production etc...), so they'd like to test everything.
  * Usually they end up pushing to a temporary branch (if the CI/CD tool is configured to permit this) as the unique way to test if the pipeline will work.

This looked like a great idea. It'll be great if you'll be able, at any time, with just one command, to test on a powerful system the full CI/CD runs, simulate possible conditions etc...

So we implemented this feature and called it **direct runs** and gave users the ability to execute a run from their local directory to the agola servers with just one command (`agola directrun start`). I ended up using direct runs many times in a day during the agola development.


## Using direct runs.

Using direct runs is very simple. Once you have an user token for the agola service, at every time you can execute to `agola --gateway-url "https://youragola" --toke $USERTOKEN directrun start`.

This will push (more on how it works later) the local development repository to the agola server and start the runs defined in the agola config file like you pushed to a remote git repo connected to agola or created a pull request.
By the default it'll also push git untracked files (can be disabled with `--untracked=false`). 

Without more options the command will act like pushing to a `master branch`, but you can control to which ref (and shortcuts for branches and tags) you want to push using the `--ref`, `--branch` or `--tag` options. To simulate a pull request you should push to a special ref using the `--ref` option (i.e. to simulate a github pull request you should use something like `--ref refs/pull/1/head).

In this way you can "simulate" the runs and see the effect of them when pushing to a branch, pushing a tag or opening a pull request. Since in the run definition you can define some conditional tasks based on the source branch/tag/ref you can use these options to completely tests how a run will behave.

So, if, for example, you have defined a run that will do different things when pushing to a branch or when pushing a tag, you can easily test it.

You can also pass run variables using the `--var` or `--var-file` options.

Just a little demo of this in action:

<iframe width="640" height="360" src="https://www.youtube.com/embed/gZE1FRcgc7U?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## How a direct run works

Direct runs rely on two main components:

* An agola internal git server
* The `agola directrun start` command

The internal git server is where the `agola directrun start` command will push the local development git repository.

The `agola directrun start` command will create a temporary git index based on the current index, the related tree object, commit it and store it in a temporary git ref in the local git repository, everything is transparent without impacting the working tree. Then it'll push this ref to the agola git server under a user repository to the required destination ref. Then agola will be instructed to create/start the runs defined in the agola config file.

Everything is git based so only the required git objects will be pushed making it really fast.

We developed a library called `git-save` to do this work, now it lives [in the agola repository](https://github.com/agola-io/agola/blob/v0.1.1/internal/git-save/save.go) but we'd like to make it a standalone library since it can have many uses. It's inspired by the great [git-wip project](https://github.com/bartman/git-wip).