---
type: blog
title: 'FROM CHAOS TO CI/CD "Our experience with CI/CD Implementation"'
author: "Fabio Seregni"
date: 2019-07-09T10:24:26.170Z
rating: '3'
tags: [ "ci/cd", "scrum", "methodologies", "code quality", "best practices", "automation", "microservices", "devops" ]
categories:
  - devops
---

Our mission is to help companies to implement DevOps; challenging the status-quo and evolving software product lifecycle and software development approach.

The goal of these series of blog post is to share openly our experiences asking for feedback from whom out there has the same mission.

Thanks for reading and commenting.

### PART 1: The Context

In this blog, a team of solution architects, software architects and enterprise architects within [Sorint.lab](http://www.sorint.it) shares their experience in helping customers evolve from traditional software development to what we call Modern Application Development, using technologies such as cloud, microservices, etc.
Over the past 2 years we have been conducting workshops that explain (try to) how to achieve agility in all aspects of the development process, using automation disciplines and more importantly writing quality code to prevent frequent releases from becoming frequent disasters.

In the last few months we have noticed that many companies (our customer are large enterprises and not Startups)  are approaching these issues more and more seriusly, with the intention of overcoming the typical problems from  siloed organizations and the eternal conflict between developers and ops.

However, some of the selected approaches are wrong due to the adoption of bad practices and the excessive use of manual operations. This results in low quality code, continuous delays and fragile overall methodology and IT infrastructure.

Going a little deeper, many customers adopt Scrum, but almost all everyone adopt only the "core roles" and the basic rules without thinking about automation and the the product validation phase. 
In addition to the partial adoption of the methodology, there are gaps such as:

		* Partial or total lack of static code quality control
		* Partial or total lack of automatic tests
		* Partial or total lack of an automatic process of continuous integration (compilation, artifact generation, ..., deployment)

When we first approach a client, the first questions we are asked are about what a good starting point for the practices can be, what tools to use, how to measure the goodness of developments, how to make the proposed practices become practices of the corporate culture.
This and subsequent posts will try to answer all these questions.

We start from the scrum methodology. This is a great starting point for application modernization but it is not enough. Scrum should be augmented with practices and principles from extreme programming (XP) such as:

		* Test driven development: write both automatic and acceptance tests before writing the code
		* Refactoring/Design Improvment: Rewrite the code with the aim of simplifying it, making it more generic, 
		  improving its architecture without changing the external features
		* Coding standards: Create a set of standard rules for writing code to be unified for the whole project
		* Collective code ownership: everyone is responsible for all the product code in the project
		* Continuous Integration: Continuously integrate code changes in order to avoid delays due to integration problems
 
These practices and patterns are valid for developing software from scratch using innovative technologies (Modern application Development) as well as for modernizing (Refactoring, ReHosting, RePlatforming, Rebuild...) a legacy application (Application Modernization) using the legacy code as a platform to be enhanced, modified and extended with new features.

One of the scrum practices we find most useful is the retrospective, a meeting with the customer, at the end of a release, dedicated to what worked well and what can be improved in the project delivery.

We use the outcome of the retrospectives at the beginning of new projects (with new customer or the same one). In the project kick off we try to find the answer to the following questions:

		* What problems we have to solve to "deliver working software frequently"?
		* How Implement Continuous Integration?
		* Which Metrics should be measured for development success?
		* Which are the best approaches to implement CI?
		* Which are the tools to use?

That are the topics of the next blog posts.

