---
type: blog
title: 'A Brief Introduction to CI'
author: 'Mateus Pavei Menegon'
date: 2019-07-11T10:00:00.170Z
rating: '3'
tags: [ "ci/cd", "scrum", "methodologies", "code quality", "best practices", "automation", "microservices", "devops" ]
categories:
  - devops
---

Much is said about agile methodologies, but there is a need to use some techniques for these methodologies to succeed, one of the techniques is Continuous Integration.
The continuous integration is a term originated in the agile methodology XP and used in other methodologies, consisting in a simple goal: the developer integrates the code altered and / or developed to the main project in the same frequency with which the functionalities are developed, being done many times to the per day rather than just once. The main purpose of using continuous integration is to verify that changes or new features have not created errors in the existing project.

> "Continuous Integration is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly." - <cite>Martin Fowler</cite>

#### Version Control System and Continuous Integration

Version control is a crucial part of the development proccess for continuous integration to succeed. One of the goals of version control is collaborative work, in which several developers work and share data. Versioning is essential for methodologies in which the team must constantly work together.
The version control system resolves some great problems when we work as a team:

* how share the information in order to have the last valid version and known who did the changes
* how to prevent developers from reworking that already developed, etc.

Git is the most common tool for centralized version control, among a variety of other choices. These tools allow developers to work together, enabling multiple clients to access, view, modify, and send new code. 
Among the benefits of using a version control system, we have:

* possibility to restore previous versions of the code
* compare codes
* change management

In the versioning flow the developer writes the code, and performs a build before integrating it with the code base through synchronization.
This process should be done frequently, thus avoiding the accumulation of large chunks of code awating repository integration. 
Some methodologies dictate that the developer can only consider the work done, when the code is synchronized, built on an continuous integration tool and with all tests executed successfully.
Continuous integration tools allow you to configure an automated build system. This is important because as the system is automated the developer can be notified when errors occur and the cause can be analyzed.

#### What about the Integration?

With a centralized version control, automated builds and tests, we can have the integration.
The only prerequisite for a developer to post their changes to the main release is that they can run the code with no errors. This, of course, includes going through the build tests. As with any code-launch cycle, the developer first updates his working copy to match the main version, resolves any conflicts, and then generates the build on his local machine (or continuous integration system). If the build passes, then it will be released to post its changes to the main version.
Continuous integration allows developers to quickly find version conflicts, and troubleshoot quickly and continuously. The key to good integration, as seen before, is a centralized version control environment, automated builds and tests.

#### Why CI is important to DevOps?

CI is one of the fundamental pillars of the DevOps concept, which is a term designed to describe a set of practices for integration between the software development, operations (infrastructure or sysadmin) and support teams involved (such as quality control ) and the adoption of automated processes for fast and secure development of applications and services. The concept emphasizes the value of the diversity of activities and professionals involved and collaborative attitudes. It is a process that allows the agile development of applications in an infrastructure management model defined under rigid and bureaucratic rules.
The DevOps culture is based on the pillars:

* Continuous Integration:  Establish a consistent and automated way to build, package, and test applications
* Continuous Deployment: Fast and continuous release of new software or service releases
* Continuous feedback: Frequent feedback from teams involved in all phases of the software or service life cycle

As DevOps is intended to be a functional inter-working mode instead of a single DevOps tool, there are sets (or "tool chain") of various tools. These tools are expected to fit into one or more of the following categories reflected in key aspects of the system development and delivery process:

* Coding - development and revision of code, source code management tools, merge code
* Compilation - Continuous Integration Tools, Build State
* Testing - Continuous testing tools that provide feedback on business risks
* Package - artifact repository, application pre-deployment stage
* Release - change management, release approvals, release automation
* Configuration - Infrastructure configuration and management, Infrastructure as Code tools
* Monitoring - application performance monitoring, end user experience

#### Conclusion
As we have seen, continuous integration with automated tools brings several benefits. First, teamwork generates fewer errors and lowers risk by verifying changes and detecting errors frequently and quickly.
Second, bugs do not accumulate, remain simple and are fixed in hours rather than become complex tasks that take many days to fix.
Finally, with developers testing their own code, bugs are detected earlier in the development cycle, saving time and money to the organization.

##### *Stay tuned for more info!*

