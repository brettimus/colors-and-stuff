# :bug: :heavy_plus_sign: :art:
I had a bug to do something with colors recently. 

The lofty goal is to use a genetic algorithm to create aesthetically pleasing color palettes. (At present, we only evolve two complementary colors.)

**Curiousity piqued?** _[View the demo!](http://brettim.us/genetic-colors/)_

## The Algorithm

1. Generate ten random palettes
2. Calculate the fitness of each palette
3. Breed the top six palettes in pairs (and calculate fitness of offspring)
4. Mutate one of top six palettes (and calculate its fitness)
5. Mutate one of bottom four palettes (and calculate its fitness)
6. Select the top ten most fit palettes
7. Repeat steps 2-6 until the steady state is reached

### The Current Implementation
* Each color is represented by its hue, saturation, and lightness
* Each palette is composed of two colors
* The fitness is equal to the minimum squared angle between two hues (effectively selecting complementary colors)
* There is no steady state, but the algorithm terminates after 123 loops

### The Breeding
**:disappointed: Needs improvement!** 

Breeding two palettes means that each color from one palette has its hue, saturation, and lightness mixed with a color from the other palette.

(The `createPalette` constructor has a static `#mix` method, which in turn uses the `#mix` method on `createColor`.)

### The Mutation
**:disappointed: Needs improvement!** 

Right now, mutation simply generates a new, random palette. Clearly, this could use some more thought.

(The `createPalette` construction has a static `#random` method, which uses the `#random` method on `createColor`.)

### The Fitness :muscle:
Fitness is calculated as the minimum squared angle between two hues, which makes our algorithm evolve towards complementary colors. 

### The Steady State
:warning: **Todo** :warning:

This just returns `false` right now :grin:.

### The Visualization of The Algorithm
Currently, we only visualize the “most fit” palette once the algorithm is finished.

I would really love to visualize the evolution of a color palette. I have two ideas on how to do this (listed below). I am more partial to trying Idea 1 first, and then possibly incorporating the idea of `#tick` method later. Now I'm just rambling. :coffee:

#### Idea 1: A state queue
Keep a record (probs a queue) of the algorithm's state at the beginning of its main loop.

We can then use that queue to animate the evolution of our colors. 

#### Idea 2: Asynchronous processing
Asynchronously step through genetic algorithm. 

Abstract the genetic algorithm into an object that contains both the state of the algorithm and a `#tick`-like method (which simply runs through steps 2-6 of the algorithm). Then, we can space out each `tick` by a set amount of time, and we visualize the state of the algorithm after each call to `tick`. 

## :wave: Hey! Get in touch!
I'd love to talk to someone about how to construct a/some fitness function(s) for this here algorithm.