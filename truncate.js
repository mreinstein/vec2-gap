import setLength from './set-length.js'
import { vec2 }  from 'https://cdn.skypack.dev/pin/gl-matrix@v3.3.0-QDHIgv9E54Kj6suUMV0n/mode=imports/optimized/gl-matrix.js'


export default function truncate (out, inp, maxLength) {
    if (vec2.length(inp) > maxLength)
        setLength(out, inp, maxLength)
    else
        vec2.copy(out, inp)
    return out
}
