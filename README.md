# vec2-gap
gl-matrix compatible vec2 functions that haven't been accepted yet


gl-matrix is a fantastic library for vector and matrix operations, but there are some modules I use regularly
that may never be accepted into the library:

* `midpoint` get the point between 2 point
* `perpendicular-component` get the component of vector perpendicular to a unit basis vector
* `set-length` set an arbitrary length of a 2d vector
* `truncate` ensure that a 2d vector is not longer than a given length
* `pool` provides a `malloc()` and `free(vec2)` interface for memory pooling


## midpoint

get the mid point between 2 points

```javascript
const center = vec2.create()
midpoint(center, p0, p1) // center === midpoint between p0 and p1
```


## perpendicular-component

determine the component of a source vector that is perpendicular to another vector (basis)

TODO: a digram here would really help clarify what this function does

```javascript
// basis must be a unit vector
const basis = vec2.create(1, 0)

const source = vec2.create(50, 32)

const perp = vec2.create()

// find the portion of "source" that is perpendicular to "basis"
perpendicularComponent(perp, basis, source)
```


## set-length

Set the exact length of a vector:

```javascript
const v = vec2.create(2, 0)

const elongated = vec2.create()
setLength(elongated, v, 5) // elongated === [ 5, 0 ]
```


## truncate

Limit the length of a vector when it exceeds a specific value

```javascript
const v = vec2.create(2, 0)

const truncated = vec2.create()
truncate(truncated, v, 1.5) // vec2.length(truncated) === 1.5

// has no effect, because  vec2.length(truncated) is 1.5, which is less than 2.0
trucate(truncated, truncate, 2.0)
```

## get-cardinal-direction
determine what cardinal direction the target is in relative to a source position. (north of, west of, northeast of, etc.)

```javascript
const source = [ 0, 0]
const resolution = 4

// prints "north" because [0, -100] is north of the source
console.log(getCardinalDirection([ 0, -100 ], source, resolution)

console.log(getCardinalDirection([ 0, 100 ], source, resolution)  // prints "south"
console.log(getCardinalDirection([ 100, 0 ], source, resolution)  // prints "east"
console.log(getCardinalDirection([ -100, 0 ], source, resolution)  // prints "west"
```

`resolution` should be `4` or `8`, which corresponds to `[ 'north', 'east', 'south', 'west' ]` and `[ southeast', south', 'southwest', 'west', 'northwest', 'north', 'northeast', 'northeast' ]` depending on how fine-grained of a result you want.


## pool

[![Deno](https://github.com/mreinstein/vec2-gap/actions/workflows/deno.yml/badge.svg?branch=main)](https://github.com/mreinstein/vec2-gap/actions/workflows/deno.yml)

when building long-running applications (games and simulations) managing memory is important, otherwise you invoke the wrath of Javascript's garbage collector.

internally, this works by attaching an array to `window.poolVec2` which gives us a singleton pool.
`malloc()` pops from this array, and `free()` pushes to it.

NOTE: be careful about double freeing these vectors. We don't currently have any double-free detection logic present.

### singular interface

You can `malloc()` and `free()`  individual vectors:
```javascript
import Pool from 'https://cdn.jsdelivr.net/gh/mreinstein/vec2-gap/pool.js'


// get a vec2 from the pool, or create one. set it's initial value to [ 1, 3 ]
const v = Pool.malloc(1, 3)

// do stuff with v...

Pool.free(v) // put v back into the pool
```


### group (bulk) interface
If you want to `malloc()` and `free()` numerous vectors, you can use group:

```javascript
Pool.groupMalloc()  // open the group. all malloc() calls after this will be added to the group

const p1 = Pool.malloc()
const p2 = Pool.malloc()
const p3 = Pool.malloc()

// do a bunch of calculations

Pool.groupFree()

// p1, p2, p3 are now in the pool and the group is closed

```

NOTE: be careful about nesting multiple function calls that use `groupMalloc()` and `groupFree()`. This module only maintains 1 group, and there can be some unexpected behavior there. 
