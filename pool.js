import { vec2 } from 'https://cdn.skypack.dev/pin/gl-matrix@v3.4.3-OSmwlRYK5GW1unkuAQkN/mode=imports,min/optimized/gl-matrix.js'


if (!window.poolVec2)
	window.poolVec2 = {
		pool: [ ],
		group: [ ]
	}


const mem = window.poolVec2


function _malloc (x=0, y=0) {
	return mem.pool.length ? vec2.set(mem.pool.pop(), x, y) : vec2.fromValues(x, y)
}


function _groupMalloc (x=0, y=0) {
	const v = _malloc(x, y)
	mem.group.push(v)
}


function _free (item) {
    mem.pool.push(item)
}


function _warnFree (/*item*/) {
	console.log('calling free(vec2) should be avoided while in a pool group.')
}


// all malloc() calls after this will be tracked as a group
function groupMalloc () {
	impl.malloc = _groupMalloc
	impl.free = _warnFree
}


// free all vec2s in the group, and disable the group
function groupFree () {
	for (let i=0; i < mem.group.length; i++)
		_free(mem.group[i])

	mem.group.length = 0
	impl.malloc = _malloc
	impl.free = _free
}


const impl = {
	free: _free,
	malloc: _malloc,

	groupMalloc,
	groupFree
}

export default impl
