import { vec2 } from 'wgpu-matrix'


const EPSILON = 0.0001

// from https://github.com/Unity-Technologies/UnityCsReference/blob/b7836efd9f4a79fdb74565f599cfce5fd7b5c984/Runtime/Export/Math/Vector3.cs#L306C9-L320C10
// https://docs.unity3d.com/ScriptReference/Vector3.ProjectOnPlane.html

/**
 * Projects a vector onto a plane.
 * 
 * For a given plane described by planeNormal and a given vector vector, Vector3.ProjectOnPlane generates a new vector orthogonal
 * to planeNormal and parallel to the plane. Note: planeNormal does not need to be normalized.
 */
export default function projectOnPlane (out, v, planeNormal) {
	const sqrMag = vec2.dot(planeNormal, planeNormal)
    if (sqrMag < EPSILON)
        return vec2.copy(v, out)

    const dot = vec2.dot(v, planeNormal)

    return vec2.set(v[0] - planeNormal[0] * dot / sqrMag,
                    v[1] - planeNormal[1] * dot / sqrMag,
                    out)
}
