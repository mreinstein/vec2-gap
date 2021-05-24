# vec2-gap
gl-matrix compatible vec2 functions that haven't been accepted yet


gl-matrix is a fantastic library for vector and matrix operations, but there are some modules I use regularly
that may never be accepted into the library:

* `set-length` set an arbitrary length of a 2d vector
* `truncate` ensure that a 2d vector is not longer than a given length
* `pool` provides a `malloc()` and `free(vec2)` interface for memory pooling


## midpoint

get the mid point between 2 points

```javascript
const center = vec2.create()
midpoint(center, p0, p1) // center === midpoint between p0 and p1
```


## set-length

Set the exact length of a vector:

```javascript
const v = vec2.create(2, 0)

const elongated = vec2.create()
setLength(elongated, v, 5) // elongated === [ 5, 0 ]
```


## truncate

Set the exact length of a vector:

```javascript
const v = vec2.create(2, 0)

const truncated = vec2.create()
truncate(truncated, v, 1.5) // truncated === [ 1.5, 0 ]
```


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
