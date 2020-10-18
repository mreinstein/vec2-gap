import * as vec2 from 'https://cdn.jsdelivr.net/npm/gl-matrix@3.3.0/esm/vec2.js'
import vec2Truncate from './truncate.js'


export default function segmentMidPoint (out, p0, p1) {
    vec2.subtract(out, p1, p0)
    const halfLen = vec2.distance(p1, p0) / 2
    vec2Truncate(out, out, halfLen)
    return vec2.add(out, out, p0)
}

