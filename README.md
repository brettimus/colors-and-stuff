# :art: :heavy_plus_sign: :genetic_algorithm: 
_[View the demo!](http://brettim.us/genetic-colors/)_

:warning: **Under Construction!**

The goal is to use a genetic algorithm to create aesthetically pleasing color palettes. At present, we only evolve two complementary colors.

## The Algorithm

1. Generate ten random palettes
2. Calculate the fitness of each palette
3. Breed top six palettes in pairs (and calculate fitness)
4. Mutate one of top six palettes (and calculate fitness)
5. Mutate one of bottom four palettes (and calculate fitness)
6. Select top 10 most fit
7. Repeat 2-6 until steady state is reached

### Current Assumptions
* A palette is two colors
* Each color is HSL
* Fitness is minimum squared secant between two hues (effectively selecting complementary colors)

### Breeding
**:disappointed: Needs improvement!** 

Breeding two palettes means that each color from one palette has its hue, saturation, and lightness mixed with a color from the other palette.

(The `createPalette` constructor has a static `#mix` method, which in turn uses the `#mix` method on `createColor`.)

### Mutation
**:disappointed: Needs improvement!** 

Right now, mutation simply generates a new, random palette. Clearly, this could use some more thought.

(The `createPalette` construction has a static `#random` method, which uses the `#random` method on `createColor`.)

### Fitness
Fitness is calculated as the minimum squared secant between two hues, which makes our algorithm evolve towards complementary colors. 

### The Steady State
:warning: **Todo** :warning:

This just returns `false` right now :grin:.

### Visualizing the algorithm
Currently, we only visualize the “most fit” palette once the algorithm is finished.

I would really love to visualize the evolution of a color palette. I have two ideas on how to do this (listed below). I am more partial to trying Idea 1 first, and then possibly incorporating the idea of `#tick` method later. Now I'm just rambling. :coffee:

#### Idea 1: A state queue
Keep a record (probs a queue) of the algorithm's state at the beginning of its main loop.

We can then use that queue to animate the evolution of our colors. 

#### Idea 2: Asynchronous processing
Asynchronously step through genetic algorithm. 

Abstract the genetic algorithm into an object that contains both the state of the algorithm and a `#tick`-like method (which simply runs through steps 2-6 of the algorithm). Then, we can space out each `tick` by a set amount of time, and we visualize the state of the algorithm after each call to `tick`. 

## Get in touch!
I'd love to talk to someone about how to make a robust fitness function for this.