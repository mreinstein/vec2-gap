import setLength from './set-length.js'
import * as vec2 from 'https://cdn.jsdelivr.net/npm/gl-matrix@3.3.0/esm/vec2.js'


export default function truncate (out, inp, maxLength) {
    if (vec2.length(inp) > maxLength)
        setLength(out, inp, maxLength)

    return out
}
