import Pool             from '../pool.js'
import { assertEquals } from 'https://deno.land/std@0.97.0/testing/asserts.ts'


Deno.test({
    name: 'malloc creates [ 0, 0 ] vector by default',
    fn: () => {
        const p = Pool.malloc()
        assertEquals(p, new Float32Array([ 0, 0 ]))
    }
})


Deno.test({
    name: 'malloc creates new vector with passed values',
    fn: () => {
        const p = Pool.malloc(5, -12)
        assertEquals(p, new Float32Array([ 5, -12 ]))
    }
})


Deno.test({
    name: 'free puts vector in the pool',
    fn: () => {
        const p = Pool.malloc(99, 98)
        Pool.free(p)
        assertEquals(window.poolVec2, { pool: [ new Float32Array([ 99, 98 ]) ], group: [] })
    }
})


Deno.test({
    name: 'malloc takes from pool when its non-empty',
    fn: () => {
        const p = Pool.malloc(50, 52)
        Pool.free(p)

        assertEquals(window.poolVec2.pool.length, 1)

        const c = Pool.malloc()
        assertEquals(c, new Float32Array([ 0, 0 ]))

        assertEquals(window.poolVec2.pool.length, 0)
    }
})


Deno.test({
    name: 'groupMalloc grows the group',
    fn: () => {
        Pool.groupMalloc()
        const p1 = Pool.malloc(1, 2)
        const p2 = Pool.malloc(3, 4)
        const p3 = Pool.malloc(5, 6)

        assertEquals(window.poolVec2, { pool: [ ], group: [
                new Float32Array([ 1, 2 ]),
                new Float32Array([ 3, 4 ]),
                new Float32Array([ 5, 6 ])
            ] })

        Pool.groupFree()
    }
})


Deno.test({
    name: 'groupMalloc is idempotent',
    fn: () => {
        // reset
        window.poolVec2.group.length = 0
        window.poolVec2.pool.length = 0

        // calling twice shouldn't have any affect
        Pool.groupMalloc()
        Pool.groupMalloc()
        const p1 = Pool.malloc(6, 6)
        const p2 = Pool.malloc(7, 7)

        assertEquals(window.poolVec2, { pool: [ ], group: [
                new Float32Array([ 6, 6 ]),
                new Float32Array([ 7, 7 ])
            ] })

        Pool.groupFree()
    }
})


Deno.test({
    name: 'group free moves all vectors in group to the pool',
    fn: () => {
        // reset
        window.poolVec2.group.length = 0
        window.poolVec2.pool.length = 0

        Pool.groupMalloc()
        const p1 = Pool.malloc(7, 8)
        const p2 = Pool.malloc(10, 9)
        const p3 = Pool.malloc(90, 33)

        Pool.groupFree()
        

        assertEquals(window.poolVec2, { group: [ ], pool: [
                new Float32Array([ 7, 8 ]),
                new Float32Array([ 10, 9 ]),
                new Float32Array([ 90, 33 ])
            ] })
    }
})


Deno.test({
    name: 'groupFree is idempotent',
    fn: () => {
        // reset
        window.poolVec2.group.length = 0
        window.poolVec2.pool.length = 0

        Pool.groupMalloc()
        const p1 = Pool.malloc(9, 9)
        const p2 = Pool.malloc(17, 17)

        // calling twice shouldn't have any affect
        Pool.groupFree()
        Pool.groupFree()

        assertEquals(window.poolVec2, { group: [ ], pool: [
                new Float32Array([ 9, 9 ]),
                new Float32Array([ 17, 17 ])
            ] })
    }
})


Deno.test({
    name: 'free() has no effect when malloc group is active',
    fn: () => {
        // reset
        window.poolVec2.group.length = 0
        window.poolVec2.pool.length = 0

        Pool.groupMalloc()
        const p1 = Pool.malloc(19, 19)
        const p2 = Pool.malloc(107, 107)

        Pool.free(p2)  // doesn't do anything while the group is active

        assertEquals(window.poolVec2, { pool: [ ], group: [
                new Float32Array([ 19, 19 ]),
                new Float32Array([ 107, 107 ])
            ] })

        
        Pool.groupFree()
    }
})

