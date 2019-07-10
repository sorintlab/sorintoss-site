---
type: blog
title: 'Why agile development creates more problems than it solves'
author: "Simone Rota II"
date: 2019-07-10T01:00:00.170Z
rating: '3'
tags: [ "ci/cd", "scrum", "methodologies", "code quality", "best practices", "automation", "software development", "agile" ]
categories:
  - agile
---

Part 2 of "From Chaos to CI/CD"

Put down your pitchfork, we at [Sorint.lab](http://www.sorint.it) love developing software using an agile approach.
We adopt SCRUM for most of our projects and we are pleased by the results.

The [Agile Manifesto](https://agilemanifesto.org/) ultimate goal is to satisfy the customer, who wouldn't want to do that?
The agile approach suggests **frequent software releases** and promotes a **strong customer interaction** to overcome a few common
hindrances of a more traditional methodology:

- We're late!: If you skip early customer feedback, be prepared to handle a lot of changes in the final stages. The first deployment on your target environments may reveal some problems (performance, integration, etc.).
- We're over budget!: Many requirement changes on a later stage have some big impact. Testing time (and skills) are higher than you expected. What about unforeseen impediments?
- Why so many bugs?: when quality assurance and acceptance happens after 1 year of developement, the amount of bugs to handle can be overwhelming.
- Low quality: so you're already late and over budget, the requirements changed and you have many bugs to fix. It's time
to unleash your "quick fixes" and "dirty tricks".

You can solve (or mitigate) these kind of problems using an agile methodology that requires you to [Release Early, Release Often](https://en.wikipedia.org/wiki/Release_early,_release_often), but what's the cost?

**More problems.**

Don't worry, I'm talking about the good kind of problems here, the ones that Engineers like to solve. Challenges.

Releasing (and testing!) your software frequently is not only a matter of writing code: you need to support the whole process by
providing tools, automating tests and deployments. You should try to break the organization silos culture and make your Developement, Test,
Data Management, Security, Infrastructure teams working together in a fast pace.

Oh, and everything needs to be ready from day 1.

How can you achieve this? Stay tuned for more info!
