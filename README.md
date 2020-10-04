# vec2-gap
gl-matrix compatible vec2 functions that haven't been accepted yet


gl-matrix is a fantastic library for vector and matrix operations, but there are some modules I use regularly
that may never be accepted into the library:

* `set-length` set an arbitrary length of a 2d vector
* `truncate` ensure that a 2d vector is not longer than a given length
* `pool` provides a `malloc()` and `free(vec2)` interface for memory pooling


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

when building long-running applications (games and simulations) managing memory is important, otherwise you invoke the wrath of Javascript's garbage collector.


```javascript
// get a vec2 from the pool, or create one. set it's initial value to [ 1, 3 ]
const v = pool.malloc(1, 3)

// do stuff with v...

pool.free(v) // put v back into the pool
```

internally, this works by attaching an array to `window.poolVec2` which gives us a singleton pool.
`malloc()` pops from this array, and `free()` pushes to it.

NOTE: be careful about double freeing these vectors. We don't currently have any double-free detection logic present.
