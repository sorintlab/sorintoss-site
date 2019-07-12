---
type: blog
title: 'Metrics yuu need to measure for development process success'
author: "Fabio Seregni"
date: 2019-07-12T6:00:26.170Z
rating: '3'
tags: [ "ci/cd", "scrum", "methodologies", "code quality", "best practices", "automation", "metrics", "devops" ]
categories:
  - devops
---

#### Part 4 of "From Chaos to CI/CD"

Creating an innovative development process is not enough, we must be able to measure it effectively so that it can always improve (Continuous Improvement).

Benchmarking the current process is essential to measure subsequent automation successes.
One of the most common metrics is to calculate the number of defects, but it is not enough, we must also verify other aspects related to the build, the coverage of the tests, the speed of the process.

From our experience we can define some metrics (the minimum set) for each application that we believe support the Continuous Improvement process:

#### Process Metrics:

* **Build time**      
	- Time needed to make a build, it might also be interesting to understand how much time is spent 
	  by the developer during this process
* **Deployment time**  
	- Time required for distribution
* **Deploy frequency**
	- Number of deploys (per month, per year...)
* **Failed deployments**
	- Percentage of deploys that failed compared to deploys (per month, per year...)
* **Error rates**
	- Number of bugs identified after a deployment
* **Number of support requests after a release**

#### Agile Metrics:

* **Lead time**
    - Average time that elapses between the beginning of a working element and its distribution
* **Code Coverage**
    - This metric calculates the percentage of code that is covered by unit tests
* **Team speed**
    - quantity of story points completed at the end of each spring (this allows us to keep the team stable to predict the number of elements to be included in the next sprints)

To support the Continuous Improvement process, it is essential to conduct a periodic review of the metrics by asking the following questions:

* Where have you seen the most improvement?
* What parts of the process still need work?

By doing an iterative and incremental way, we can create a successful initiative!
