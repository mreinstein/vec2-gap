import { vec2 } from 'https://cdn.skypack.dev/pin/gl-matrix@v3.4.3-OSmwlRYK5GW1unkuAQkN/mode=imports,min/optimized/gl-matrix.js'


// these were ported from OpenSteer's Vec3.h file


// return component of vector parallel to a unit basis vector
// (IMPORTANT NOTE: assumes "basis" has unit magnitude (length==1))
function parallelComponent (out, unitBasis, force) {
    const projection = vec2.dot(force, unitBasis)
    return vec2.scale(out, unitBasis, projection)
}


// return component of vector perpendicular to a unit basis vector
// (IMPORTANT NOTE: assumes "basis" has unit magnitude (length==1))
export default function perpendicularComponent (out, unitBasis, force) {
    parallelComponent(out, unitBasis, force)
    return vec2.subtract(out, force, out)
}
