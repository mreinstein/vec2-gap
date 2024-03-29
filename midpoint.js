import { vec2 }     from 'https://cdn.skypack.dev/pin/gl-matrix@v3.4.3-OSmwlRYK5GW1unkuAQkN/mode=imports,min/optimized/gl-matrix.js'
import vec2Truncate from './truncate.js'


export default function segmentMidPoint (out, p0, p1) {
    vec2.subtract(out, p1, p0)
    const halfLen = vec2.distance(p1, p0) / 2
    vec2Truncate(out, out, halfLen)
    return vec2.add(out, out, p0)
}

