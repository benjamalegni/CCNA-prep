> “Scrum is not a methodology – it is a pathway”
>  Ken Schwaber (Boulder, Co, Nov. 2001)

![[Pasted image 20240925165848.png]]
scrum will help you fail in 30 days or less

## definicion
- is a framework that allows you to create your own lightweight process for developing new products
- scrum is simple it can be understood and implemented in a few days
- the rules of scrum bind together the events, roles, and artifacts, governing the relationships and interaction between them

## characteristics
- self-direct and self-organizing team
- no external addition of work to an interation, once chosen
- daily stand-up meeting with special questions
- demo to external stakeholders at end of each iteration
- each iteration, client-driven adaptive planning

# pilares
- transparency
	- aspects of the process must be visible to those responsible for the outcome
	- aspects must be defined by a common standard so observers share a common understanding
- inspection (or artifacts and process)
	- must be done frequently to detect undesirable variances
- adaptation
	- when a deviation is found, the process must be adjusted
	- scrum presents ==4 events for inspection==:
		- sprint planning
		- daily scrum
		- sprint review
		- sprint retrospective


# valores
- courage: scrum team members have courage to do the right thing and work on tough problems
- focus: everyone focuses on the work of the sprint and the goals of the scrum team
- commitment: people personally commit to achieving the goals of the scrum team
- respect: scrum team members respect each other to be capable, independent people
- openness: the scrum team and its stakeholders agree to be open about all the work and the challenges with performing the work
# team
## product owner
- officially responsible for the project in the client, only one person
- he/she is the sole person responsible for managing the product backlog:
	- express product backlog items
	- prioritize items of the backlog
	- ensure understanding of the items
- chooses the goals (from the product backlog) for the next sprint

## development team
- a team commit to achieve a sprint goal
- teams are self-organized (7 people +- 2)
- small teams limit the amount of interaction
- teams are cross-functional
- a scrum team should include people with skills necessary to meet the sprint goal
- each team members applies his/her expertise to all of the problems
- no third party can commit a person or team to do work
- no titles! everybody should be available to code

## scrum master
- is the "facilitator" - "the servant leader"
- responsible for ensuring that scrum values, practices and rules are enacted and enforced
- he/she is the driving force behind the rest of the scrum practices
- he/she sets them up and makes the practices happen
- the scrum master:
	- remove impediments
	- must take much initiative
	- has to be determined in decisions


### scrum framework
![[Pasted image 20240925173657.png]]

# scrum events
- sprint (development cycle)
- sprint planning
- daily scrum
- sprint review
- sprint retrospective

## sprint (a.k.a development cycle)
- time-box of one month or less during which a "done", useable, and potentially releasable product increment is created
- each sprint may be considered a project with no more than a one-month horizon
- when a sprint's horizon is too long the definition of what is being built may change, complexity may rise, and risk may increase
![[Pasted image 20240925173920.png]]

## sprint
a print can be cancelled only by the product owner when:
- the sprint goal becomes obsolete
- management changed its mind
- company changed direction
- market conditions or technical requirements changed
- team cannot achieve its sprint goal
- team achieved goal but needed management directions

## sprint planning
- set a sprint goal
- the plan is created by the entire scrum team
- sprint planning is time-boxed to a maximum of eight hours for a one-month sprint
- the scrum master ensures that the event takes place and that attendants understand its purpose
- the planning must answer:
	- what can be delivered in the increment resulting from the upcoming sprint?
	- how will the work needed to deliver the increment be achieved?
	![[Pasted image 20240925174214.png]]

# daily scrum
- 15-minute time-boxed event for the development team to:
	- synchronize activities
	- create a plan for the next 24 hours
- questions that each member must answer:
	- what have you done since the last meeting? -> report
	- what are you going to do until the next meeting? -> plan
	- which obstacles are in your way? -> risks
- the scrum master:
	- ensures that the development team has the meeting (dev team is responsible for conducting the daily scrum)
	- enforces the rule that **only development team members participate in the daily scrum**
- nobody should arrive late, impose penalties

## sprint review
- inspect the increment and adapt the product backlog if needed
- scrum team + stakeholders
- four-hour time-boxed meetiong for one-month sprints


## sprint review elements
- the **product owner** explains what product backlog items have been "done" and what has not been "done"
- the **development team** discusses what went well during the sprint, what problems it ran into, and how those problems were solved
- the **development team** demonstrates the work that it has "done" and answers questions about the increment
- the **product owner** discusses the product backlog
- the group collaborated on what to do next (input sprint planning)
- review of possible changes in market, timeline, budged, etc.

## sprint retrospective
- the scrum team inspects itself and creates a plan for improvements
- three-hour time-boxed meeting for one-month sprints
- the scrum team must identify improvements that it will implement in the next sprint
- ![[Pasted image 20240925174855.png]]

## scrum artifacts
- product backlog
- sprint backlog
- increment

### product backlog
- ordered list of requirements of the product
- responsibility of the product owner (content, availability, and ordering)
- it evolves as the product and the environment in which it will be used evolves
- lists all the features, functions, requirements, enhancements, and fixes
- product owner and the development team collaborate on refining product backlog items
- items that can be "done" by the development team within one sprint are "ready" for selection in a sprint planning
- development team is responsible for all estimates
![[Pasted image 20240925175121.png]]

### sprint backlog
- it is a set of product backlog items selected for the sprint
- it makes visible all of the work that the development team identifies as necessary to meet the sprint goal
- the development team modifies the sprint backlog throughout the sprint
- only the development team can change its sprint backlog during a sprint

### sprint board
![[Pasted image 20240925175248.png]]

### criterio de done (def of done-DoD)
- scrum team members must have a shared understanding of what it means for work to be completed
- "done"=releasable
- the DoD consist of 3 main components:
	- business or functional requierements: standard functional requirements
	- quality: ensure taht the product is of the maximum quality (e.g. coding standards, TDD, test coverage, maintainability index, design principles, etc)
	- non-functional requirements: characteristics that might not add direct business value but without your product can't move (e.g. availability, performance, maintainability, security, scalability, etc)
- the DoD is always at the product level
	- the user stories must meet the DoD of the product
	- same for tasks
- **one DoD for project**

#### DoD
![[Pasted image 20240925175622.png]]

### increment
- it is the sum of all the product backlog items completed during a sprint and the value of the increments of all previous sprints
- at the end of a sprint, the new increment must be "done"
- it must be in usable condition regardless of whether the product owners to actually release it

## sum up..
- an scenario
	- 3 weeks sprints
	- 8-hour a day

![[Pasted image 20240926232037.png]]

# outsourcing responsabilities
- part of the responsabilities of the development team are delegated to third parties (usually QA)
![[Pasted image 20240926232128.png]]

## warm up(a.k.a sprint zero, discovery)
- short initial sprint with the goal of:
	- create first version of the product backlog
	- create a prototype to validate requirements and reduce risk

## backlog grooming
- meeting where PBIs are discussed, reviewed and prioritized
- it is held before sprint planning
- the whole scrum team participates
- prepare PBIs for upcoming sprint:
	- removing outdated user stories and tasks
	- adding new user stories that reflect newly discovered user insights
	- breaking down broad user stories into smaller items
	- reordering user stories based on their priority
	- explaining and crearly defining user stories and tasks to avoid uncertainty and "black box" communication
	- assigning or re-assigning story points and stimates

# scaling scrum
- what happens if you have more team members than 7+-2?
- scrum of scrum
	- it created synchronization meetings for several scrum teams
	- each team conduct its own daily scrum meeting
	- each team designate one person to attend a scrum-of-scrum meeting
	![[Pasted image 20240926232544.png]]

## nexus
- another way of scaling scrum
- the work of several teams is combined into an intergrated increment
- 3 to 9 scrum teams with 3 to 9 developers
- nexus integration team: coordinate, coach, and supervise the application of nexus