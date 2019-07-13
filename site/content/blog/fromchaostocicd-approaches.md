---
type: blog
title: 'Approaches to implement CI'
author: "Fabio Seregni"
date: 2019-07-13T10:00:26.170Z
rating: '3'
tags: [ "ci/cd", "scrum", "methodologies", "assessment", "best practices", "automation", "approach", "devops" ]
categories:
  - devops
---
#### Part 5 of "From Chaos to CI/CD"
After many years dealing **change projects** in the development processes with successes and failures... we learned at least that it's a continuous learning exercise!
When the successes come there is no magic involved, no magic wand (tools) only commitment sharing experiences, failures and critical points...
The magic behind it.
Well I wrote **no magic involved** but I think we can call **magic** some points I'm going through in this post.

 First of all that it's a team goal. Ourself, the customer, the developers, the Ops, architects, designers, testers...
We need methodologies,  Agile mindsets (open minds), ... and go beyond that we need to mix tech practicies, tools and give (or have) motivation to achieve the results. The organization has to be part of it, with the right culture, the right design...
What if you are starting from a traditional environment, a siloed organization with some cultural impediment, old tools, processes, SDLC?... This is the starting point of many of the organizations we see out there  (and our company was that way too).
There are advantages in evolving the development process in your organization? I assume there are few organization that can answer no.
If you think you need to change it then change it.
Where to start? how to start? ...
There isn't one fits all approach...again adopt and adapt is the key words here.

From our experience the following steps worked in many cases :

* **Onboard**
	* Try to create interest in the initiative, creating a team for the project but also keeping up to date everyone 
	form developer, PO, Business, Testers, Ops, ... everyone! Through wikies, slack, periodic updates... 
	sharing the results and asking for help from everyone.  After every following steps share the results.
* **Assess and document current build, test, deploy process and infrastucture**
	* First of all we try to understand deeply how the things work here. 
	you can use any tool you prefer. You need a general vision and some details or figures (Try to use agile approaches)
* **Workshop to train your team**
	* Give some value to the team in the first place. Share a common vision, vocabulary, creating a continuous learning 
	environment where the TEAM learn. Start with a very high level workshop to show the best practicies in CI/CD, 
	take the level very high. During the first workshop build the following training needed based on the learning needs 
	of the team.  (step 1 e 2 are interchangeable and/or go in parallel)
* **Define the outcome (vision + artifacts)**
	* When the team is ready try to discuss the vision of the project of modernizing (or transforming or evolve or change) the SDLC.
	Brainstorm the desired outcome and describe the artifacts. (then share it and ask everyone to challenge the vision 
	and the outcome and change them eventually)
* **Define Testing practicies**
	* Start from test. Start from test. test! If needed give the team training on how to test before design your own practicies... 
	then TEST them!
* **Design the pipeline (repeateable and automated) /Branching model..**
* **Define how to integrate "data change" management**
	* Test your pipeline in your current architecture with what discovered in point 1. 
	Start from the critical points you stresses in point 1. and  see if there will be improvements.
* **Create CI/CD environment**
	* Implement the first environment than test it. Involve everyone to choos the product/project you want to run on 
	the CI/CD environment and test it. (Think BIG but start small).
* **Create a dashboard for the key metrics**
	* Again everyone has to be up to date, define few metrics and ask everyone to help improving them (if needed).
* **Deploy to test environment first, define deployment practicies**
	* Let's do DevOps!
* **Review all the process, pipeline and metrics over and over**

Again and Again!

This is a high level description just to give you an idea... if you have any feedback or comments please feel free to write me.
Thanks

