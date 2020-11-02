export function solve (orig, dest) {
  const a1 = orig[1][0] - orig[0][0]
  const b1 = orig[1][1] - orig[0][1]
  const c1 = orig[1][2] - orig[0][2]
  const a2 = dest[1][0] - dest[0][0]
  const b2 = dest[1][1] - dest[0][1]
  const c2 = dest[1][2] - dest[0][2]

  const origDotOrig = a1 * a1 + b1 * b1 + c1 * c1
  const destDotDest = a2 * a2 + b2 * b2 + c2 * c2
  const origDotDest = a1 * a2 + b1 * b2 + c1 * c2

  const theta = Math.acos(origDotDest / Math.sqrt(origDotOrig) / Math.sqrt(destDotDest))

  let a, b, c
  if (a1 * b2 === a2 * b1) {
    c = 0
    if (a1 !== 0) {
      a = -b1 / a1
      b = 1
    } else if (b1 !== 0) {
      a = 1
      b = -a1 / b1
    } else if (a2 !== 0) {
      a = -b2 / a2
      b = 1
    } else if (b2 !== 0) {
      a = 1
      b = -a2 / b2
    } else {
      a = 0
      b = 0
    }
  } else {
    a = (c2 * b1 - c1 * b2) / (a1 * b2 - a2 * b1)
    b = (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1)
    c = 1
  }

  const rotation = [a, b, c, theta]
  const translation =
    getTranslation(dest[0][0], dest[0][1], dest[0][2])(
      getRotation(a, b, c, theta)(
        getTranslation(-orig[0][0], -orig[0][1], -orig[0][2])(
          [0, 0, 0]
        )
      )
    )

  return [rotation, translation]
}

export function getRotation (x, y, z, theta) {
  const norm = Math.sqrt(x * x + y * y + z * z)
  if (norm === 0) return pt => [...pt]
  x = x / norm
  y = y / norm
  z = z / norm

  const sinA = Math.sin(theta)
  const cosA = 1 - Math.cos(theta)
  const xx = 1 + cosA * (x * x - 1)
  const yx = z * sinA + x * y * cosA
  const zx = -y * sinA + z * x * cosA
  const xy = -z * sinA + x * y * cosA
  const yy = 1 + cosA * (y * y - 1)
  const zy = x * sinA + y * z * cosA
  const xz = y * sinA + z * x * cosA
  const yz = -x * sinA + y * z * cosA
  const zz = 1 + cosA * (z * z - 1)

  return pt => [
    xx * pt[0] + yx * pt[1] + zx * pt[2],
    xy * pt[0] + yy * pt[1] + zy * pt[2],
    xz * pt[0] + yz * pt[1] + zz * pt[2]
  ]
}

export function getTranslation (x, y, z) {
  return pt => [pt[0] + x, pt[1] + y, pt[2] + z]
}
