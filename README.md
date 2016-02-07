# :art: :sparkles: :bug: genetic colors
:warning: **Under Construction!**

The goal is to use a genetic algorithm to create aesthetically pleasing color palettes.

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
* Fitness is according to complementary colors 

### Breeding
**:disappointed: Needs improvement!** 

Breeding two palettes means that each color from one palette has its hue, saturation, and lightness mixed with a color from the other palette.

(The `createPalette` constructor has a static `#mix` method, which in turn uses the `#mix` method on `createColor`.)

### Mutation
**:disappointed: Needs improvement!** 

Right now, mutation simply generates a new, random palette. Clearly, this could use some more thought.

(The `createPalette` construction has a static `#random` method, which uses the `#random` method on `createColor`.)

### Fitness
:warning: **Todo** :warning:

### The Steady State
:warning: **Todo** :warning:

### Visualizing the algorithm
I've only written one of the building blocks for this, which you can find in the `createPanel` function.

## todo
Define the following:
- steady state
- ~mutation~
- ~breeding~
- fitness

Improve the following:
- mutation
- breeding
