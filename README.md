# Is this :art:?

> Let's use a genetic algorithm to find complementary colors!
> 
> _Why?_
> 
> :no_mouth:

**[View the demo!](http://brettim.us/genetic-colors/)**

## The Algorithm

1. Generate ten random palettes
2. Calculate the fitness of each palette
3. Breed the top six palettes in pairs (and calculate fitness of offspring)
4. Mutate one of top six palettes (and calculate its fitness)
5. Mutate one of bottom four palettes (and calculate its fitness)
6. Select the top ten most fit palettes
7. Repeat steps 2-6 until the steady state is reached

### The Current Implementation
* Each palette is composed of two colors
* The fitness function prefers complementary colors
* The algorithm terminates after 400 loops (_There is no steady state!_)

### The Breeding
_Needs improvement! :disappointed:_

Breeding two palettes means that each color from one palette has its hue, saturation, and lightness mixed with a color from the other palette.

### The Mutation
_Needs improvement! :disappointed:_

Right now, mutation simply generates a new, random palette. Clearly, this could use some more thought.

### The Fitness 
The :muscle: fitness of a palette is a function of its colors's hues, saturations, and lightnesses. Specifically,

* The fitness is 0 if either color is too light or too dark
* The fitness is 0 if either color is too unsaturated
* Otherwise, the fitness is the minimum squared angle between the two hues

### The Steady State
**Todo** :warning:

This just returns `false` right now.

Oops. :grin:

### The Visualization of The Algorithm
Currently, we only visualize the “most fit” palette once the algorithm is finished.

I would really love to visualize the evolution of a color palette. I have two ideas on how to do this. (I am more partial to the first.)

#### Idea 1: A state queue
Keep a record (probs a queue) of the algorithm's state at the beginning of its main loop.

We can then use that queue to animate the evolution of our colors. 

#### Idea 2: Asynchronous processing
Asynchronously step through genetic algorithm. 

Abstract the genetic algorithm into an object that contains both the state of the algorithm and a `#tick`-like method (which simply runs through steps 2-6 of the algorithm). Then, we can space out each `tick` by a set amount of time, and we visualize the state of the algorithm after each call to `tick`. 

## :wave: Hey! Get in touch!
I'd love to talk to someone about how to construct some alternative fitness functions for this here algorithm.

## :sparkles: The spark list
A collection of links to influential stuff and things.

* [Color scheme theory](http://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm)
* [Color Schemer](https://twitter.com/colorschemez) (Twitter Bot)
* [Chroma](https://github.com/gka/chroma.js)