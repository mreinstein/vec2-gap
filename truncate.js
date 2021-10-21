import setLength from './set-length.js'
import { vec2 }  from 'https://cdn.skypack.dev/pin/gl-matrix@v3.4.3-OSmwlRYK5GW1unkuAQkN/mode=imports,min/optimized/gl-matrix.js'


export default function truncate (out, inp, maxLength) {
    if (vec2.length(inp) > maxLength)
        setLength(out, inp, maxLength)
    else
        vec2.copy(out, inp)
    return out
}
