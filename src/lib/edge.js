export const cartesianToPolar = (x, y) => ({ 
  angle: Math.atan2(y, x) + Math.PI,
  radius: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
})

export const cutEdge = ({ x1, y1, w1, h1, x2, y2 }) => {
  const dx = x1 - x2,
        dy = y1 - y2,
        dirX = dx / Math.abs(dx),
        dirY = dy / Math.abs(dy),
        intersectsHorizontally = Math.abs(dy / dx) > h1 / w1;

  let dxs, dys, x, y;

  if (intersectsHorizontally) {
    dys = h1 / 2;
    y = y1 - dirY * dys;
    x = x1 - dirY * (dys * dx / dy);
  } else { // intersectsVertically
    dxs = w1 / 2;
    x = x1 - dirX * dxs;
    y = y1 - dirX * (dxs * dy / dx);
  }

  return { x, y }
}
