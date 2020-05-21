# vec2-gap
gl-matrix compatible vec2 functions that haven't been accepted yet


gl-matrix is a fantastic library for vector and matrix operations, but there are some modules I use regularly
that may never be accepted into the library:

* `set-length` being able to set an arbitrary length of a 2d vector
* `pool` provides a `malloc()` and `free(vec2)` interface for memory pooling


## set-length

Set the exact length of a vector:

```javascript
const v = vec2.create(2, 0)

const elongatedVec = vec2.create()
setLength(elongatedVec, v, 5) // elongatedVec === [ 5, 0 ]
```



## pool

when building long-running applications (games and simulations) managing memory is important, otherwise you invoke the wrath of Javascript's garbage collector.


```javascript

const v = pool.malloc(1, 3) // get a vec2 from the pool, or create one 

// do stuff with v...

pool.free(v) // put v back into the pool
```

internally, this works by attaching an array to `window.poolVec2` which gives us a singleton pool.
`malloc()` pops from this array, and `free()` pushes to it.

NOTE: be careful about double freeing these vectors. We don't currently have any double-free detection logic present.
