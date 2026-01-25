### software development vs predictable manufacturing

| predictable manufacturing                                                                | new product development                                                                                                 |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| it is possible to first complete specification and then build                            | rarely possible to create up-front unchanging and details specs                                                         |
| near the start, one can reliably estimate effort and cost                                | near the beginning, it is not possible. As empirical data emerge, it becomes increasingly possible to plan and estimate |
| it is possible to identify, define, schedule and order all the detailed activities       | near the beginning, it is not possible. Adaptive steps driven by build-feedback cycles are required                     |
| adaptation to unpredictable change is not the norm, and change-rates are relatively slow | creative adaptation to unpredictable changes the norm. change rates are high                                            |
#### software development
most software is not a predictable or mass manufacturing problem. Software dev is new product development

#### soft dev - clients
- the clients or users are not sure what they want
- they have difficulty stating all they want and know
- many details of what they want will only be revealed during development
- the details are overwhelmingly complex for people
- as they see the product development, they change their minds
- external forces (such as a competitor's product or service) lead to changes or enhancements in requests

# agile software development
- in the late 90s several methodologies began to get increasingly public attention
- each had a different combination of old ideas, new ideas, and transmuted old ideas
- agile methods is principle-based than rule-based
- agile methodologies follows developments adaptable, collaborative, delivery driven, people oriented, customer focused, guided by a vision, develop in short iterations, change requirements, communication, self-organizing teams, adaptive planning, test-driven development and continuous integration

- agile movement is not anti-methodology, in fact, it want to restore credibility to the word methodology
	- it want to restore a balance
	- it embrace modelling but not in order to file some diagram in a dusty corporate repository
	- it embrace documentation, but not hundreds of pages of never-maintained and rarely-used tomes
	- it plan, but recognize the limits of planning in a turbulent environment

## agile manifesto
we are uncovering better ways of developing software by doing it and helping other do it. Through this work we have come to value:

**individuals and interactions over processes and tools**
**working software over comprehensive documentation**
**customer collaboration over contract negotiation**
**responding to change over following a plan**

that is, while there is value in the item on the right, we value the items on the left

#### individuals over process
- agile methodologies remind that programming is a human activity
- although AM emphasize individuals over process, the set of practices in an AM addresses the same kind of planning and commitment issues as the focus on basic project management at CMM level 2
- AMs provides just enough process to gain a reasonable payoff
- this goal is promoted by the emphasis on communication, with face-to-face conversation and daily meetings

#### working software over documentation
- the idea is to have non-essential documentation rather than saying that the documentation is an inefficient waste
- the vital objective of the team is to continuously turn out tested working software. new releases are produced at frequent intervals, in some approaches even hourly or daily, but more usually bi-month or monthly
- the devs are urged to keep the code simple, and technically as advanced as possible, thus lessening the documentation burden to an appropriate level

#### customer collaboration over contracts
- the relationship and cooperation between developers and clients is given preference over strict contract
- the negotiation process itself should be seen as a means of achieving and maintaining a viable relationship
- a barrier is likely to be an inability to establish and maintain close and effective customer collaboration
- because of the changes the customer collaboration helps to re-organize the system

#### responding to change over planning
- planning for change is quite different from not planning at all
- AM with their rapid iterations, require continual planning
- the group should be well-informed, competent and authorized to consider possible adjustment need emerging during development
- one of the shifts in acquisition strategy in recent years has been toward prototyping, evolutionary development, and risk-driven life cycle. With their emphasis on addressing requirements volatility

## agile manifesto principles (1)
our highest priority is to satisfy the customer through early and continuous delivery of valuable software

welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage 

deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale

business people and developers must work together daily throughout the project

## agile manifesto principles (2)
build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done

the most efficient and effective method of conveying info to and withing a development team is **face-to-face conversation**

**working software is the primary measure of progress**

agile processes promote susteinable development
the sponsors, developers, and users should be able to maintain a constant pace indefinitely

## agile manifesto principles (3)
continuous attention to technical excellence and good design enhances agility

simplicity--the art of maximizing the amount of work not done-- is essential

the best architectures, requirements, and designs emerge from self-organizing teams

at regular intervals, the teams reflects on how to become more effective, then tunes and adjusts its behavior accordingly 

> agile methods are a subset of iterative and evolutionary methods

### iterative development
- iterative development is an approach in which the overall lifecycle is composed of several iterations in sequence
- each iteration is a self-contained mini-project composed of activities such as requirements analysis, design, programming and test
- the goal for the end of an iteration is an iteration release, a stable, integrated and tested partially complete system
- most iterations releases are *internal*
- the final iteration is the complete product, released to the market or clients

### iterative & incremental development (IID)
- the system grows incrementally with new features, iteration by iteration: **incremental development**
- most projects have at least three iterations before a final public release
- in modern iterative methods, the recommended length of one iteration it between one and six weeks
- the software resulting from each iteration is not a prototype or proof concept, but a subset of the final system
![[Pasted image 20241006133835.png]]

### projects success factors and IID

| success factor              | weight of influence |
| --------------------------- | ------------------- |
| user involvement            | 20                  |
| execution support           | 15                  |
| clear business objectives   | 15                  |
| experienced project manager | 15                  |
| small milestones            | 10                  |
23000 projects analysed
5 from the top ten factors for success are **strongly related to IID practices**

## risk-driven and client-driven iterative planning
- **risk-driven iterative development:** chooses the riskiest, most difficult elements for the early iterations. The highest risks are surfaced and mitigated early rather than late
- **client-driven iterative development:** implies that the choice of features for the next iteration comes from the client. The client steers the project, iteration by iteration, requesting the feature that the currently think are most valuable
- **apply both schemes:** clients do not always appreciate what is technically hard or risky. developers do not always appreciate what has high business value

### timeboxed iterative development
- iteration timeboxing is the practice of fixing the iteration and date and not allowing to change. As the overrall project
- if it eventually appears that the chosen requests for the iteration can't be met within the timebox, the rather than slip the iteration and date, the scope is reduced
- the timeboxing is not used to pressure developers to work more hours. If the normal pace work is insufficient, do less
- not all timebox lengths need to be equal
- once the requests for an iteration have been chosen and it is underway, no external stakeholders may change the work
![[Pasted image 20241006134612.png]]

### timeboxed benefits
- people remember slipped dates not slipped features
- delay a project three months from its original end date to include 100% of the desired features, and the "failure" will be remember. deliver on time with 75% of the most important features and it's a success
- with a short two-week timeboxed iteration the team takes on manageable complexity, gets realistic what they can do
- early forcing of difficult decision and trade-offs

## evolutionary and adaptive development
- evolutionary iterative development: implies that the requirements, plan, estimates and solution evolve or are **refined over the course of the iterations**
- adaptive development: implies that elements adapt in response to feedback from prior work-feedback from users, tests, developers, and so on

some methodologies emphasize the term "iterative" while others use "evolutionary" or "adaptive". the ideas and intent are similar, although, evolutionary and adaptive development does not require the use of timeboxed iterations

### evolutionary development
- it is not true that 100% of the functional requirements need to be known to start building the core architecture
- the architect need to know most nonfunctional or quality requirements and smaller subset of representative functionality

### fixed-price contracts
- IID methods recommend running projects in two contract phases, each of multiple timeboxed iterations
- the first phase, a short fixed-time and fixed-price contract, has the goal of completing few iterations, doing early but partial software development and evolutionary requirements analysis. Partial software is produced, not merely documents
- the outputs of phase one are then shared with bidders for a phase 2 fixed-price contract
![[Pasted image 20241006170733.png]]

### incremental delivery
- is the practice of repeatedly delivering a system into production
- they are often between three and twelve months
- a six-month delivery cycle could be composed of 10 short iterations
- the result of each iteration are not delivered to the marketplace, but the results of an incremental delivery are
![[Pasted image 20241006170856.png]]

### agile development
- agile development methods apply timeboxed iterative and evolutionary development, adaptive planning, promote evolutionary delivery and flexible response to change
- short timeboxed iterations with adaptive, evolutionary refinement of plans and goals is a basic practice various methods share
- they promote practices and principles that reflect and agile sensibility of simplicity, lightness, communication, self-directed teams, programming over documenting and so on


## agile software important concepts
- close collaboration between programmer and business experts 
- face-to-face communication
- frequent delivery of new deployable business value
- self-organization teams
- refactoring. restructuring the core in order to improve iterations integration
- embracing change. seeing change as an ally rather than an enemy
- simple design. designing for a battle, not for a war

- simple design. designing for battle not for war. **two assumptions:**
	- the cost or rework to change the software (refactoring), to support new possibly unanticipated, capabilities will remain low over time
	- the application situation will change so rapidly that any code added to support future capabilities will never be used

## agile development advices
- 2 to 8 people in one room. communication and community 
- onsite usage experts. short and continuous feedback cycles
- short increments. 1 to 3 months, allows quick testing and repairing
- fully automated regression tests. unit and functional tests stabilize code and allows continuous improvement
- experienced developers. experience speed up the development time from 2 to 10 timer compared to slower team members

### agile development is designed to
- produce the first delivery in weeks, to achieve an early win and rapid feedback
- invent simple solutions, so there is less to change and making this changes is easier
- improve designs quality continually, making the next iteration less costly to implement
- test constantly, for earlier, less expensive, defect detection

## manager role in agile methods
- the manager does not create a work breakdown structure, schedule, or estimates; this is done as a team
- the manager does not, usually, tell people what to do
- the manager does not define and assign many detailed team roles and responsibilities
- project manager role emphasized coaching, servant-leadership, providing resource, maintaining the vision, removing impediments, promoting agile principles, etc

## practice tips - project management
- overlapping or pipelining activities across iterations
	- during iteration N one or more people are doing requirements analysis
		![[Pasted image 20241006171955.png]]
	- difficult multiteam or multisite common iteration end date
		- takes as a rule at least 2 of the five teams had to define a common short iteration with integration and no team could go "too long" without participating in a joint iteration
		- preferred is that all teams work with a common iteration end date
		![[Pasted image 20241006172127.png]]
	- multiteam or multisite early development
		- early iteration at one location with 1 or 2 representatives
		- emphasis on requirements analysis and development to discover and build the core architecture of the system 

## practice tips - planning
- planning meeting ideally held with all developers and customers present or at least include representatives from each team
- during each iteration planning meeting generates and reuse tasks
- in the budget do not forget overhead tasks, demos, management, meeting, etc
- during each iteration planning, people estimate their total ideal work hours. A common average is around 5 hours per day
- promote volunteering for tasks rather than task assignment by a manager when the iteration tasks are defined
- where possible show all iteration tasks on a wall or whiteboard

## practice tips - iteration goal
- some use cases are too complex to implement all scenarios (alternative course) within one reasonably short iteration. Perhaps ir would take 3 months to complete all scenarios. So, decomposed it by scenario for ranking, scheduling and tracking. In this case, an iteration should complete the scenarios that it starts; a scenario should not be split across iterations but a use case can be
![[Pasted image 20241006172714.png]]

## practice tips - environment 
- in an agile-oriented project a CASE tool is used for reverse-engineering feature, to support visualization, stock them on walls and to discuss design decisions
- AM promote development in a common room rather than separate offices, to increase communication
- AM promotes the use of whiteboard space and freehand drawing for creative modeling work
- a digital camera can capture hand-sketched whiteboard model or lists. Then they can print and put the draws on the wall
![[Pasted image 20241006173127.png]]

## practice tips - requirements
- iteration by iteration the requirements are defined
- people write during 5 or 10 minutes. then, stop and pass their computer to their neighbour, while they themselves receive another computer
- the user is involved in the requirements definition

## practice tips - test
- there are automated test for everything
- tests are written before the code to be tested
- tests simply pass or fail
- once the code is written the test is run. If is fails, the programmer debugs until it passes
- as the projects continuous grows all test grow constantly, becoming part of the continuous integration test process, re-executed on each build cycle

## agile methods classification
- ceremony: amount of method weight in terms of documentations, formal, steps, review, etc
- cycles: number and length of iterations. for example, single-pass waterfall has no iterations

### agile methods classification
![[Pasted image 20241006173549.png]]

## agile methods
- rational unified process (RUP)
- adaptive software development
- crystal (crystal clear, crystal orange, crystal orange web)
- open source software development
- scrum
- eXtreme programming
- feature driven development
- dynamic system development
- lean

## rational unified process (RUP)
it can be considered also as an agile method because its process framework
- develop software iteratively
- manage requirements
- use component-based architectures
- visually model software
- continuously verify software quality
- control changes to software

## scrum
a management technique
- self-organization teams
- daily team measurement
- avoidance of predefined steps
- daily meeting with special questions
- 30 calendar-day iterations
- specific number of requirements from a prioritized list (backlog)
- demo to external stakeholders at the end of each iteration

## adaptive software development
responding to industry turbulence and the need for rapid business development
- iterative development
- feature-based planning
- customer focus group reviews
- leadership-collaboration management style

## crystal methods
a family of methods that provide different levels of ceremony depending on the size of the team and the criticality of the project
3 methods:
- crystal clear
- crystal orange
- crystal orange web
stresses the primacy of peopleware issue over process, communication, education and so on 

## eXtreme programming(XP)
one of the most famous agile method
- user stories
- pair programming
- simple design
- test-driven development
- continuous integration with constant refactoring
- collaboration
- quick and early software creation
- communication
- feedback

## feature driven development
a very lightweight architecturally based process.
- overall object architecture
- developing by feature list
- design-by-feature and build-by-feature
- maintains chief architect and chief programmer roles
- use UML and other object-oriented design methods
- individual class (code) ownership

## dynamic system development 
- active user involvement in imperative
- DSDM teams must be empowered to make decisions
- the focus in on frequent delivery of products
- fitness for business purpose is the essential criterion for acceptance of deliverables
- iterative and incremental development is necessary to converge on an accurate businesssolution
- all changes during development are reversible
- requirements are baselined at a high level
- testing is integrated throughout the life cycle
- a collaborative and cooperative approach between all stakeholders is essential

## open-source software development
- OSS systems are built by potentially large numbers of volunteers
- work is not assigned; people undertake the work they choose to undertake
- there is no explicit system-level design or even detailed design
- there is no project plan, schedule or list or deliverables
- the geographically dispersed individuals must have well functioning and open comunnication channels between each other, especially as the developers do not usually meet face-to-face