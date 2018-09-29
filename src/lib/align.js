export const alignToCoeffNode = align => {
  switch(align) {
    case "left": case "top": return 0;
    case "center": return -0.5;
    case "right": case "bottom": return -1;
  }
}

export const alignToCoeffEdge = align => alignToCoeffNode(align) + 0.5
export const alignToCoeffGraph = align => alignToCoeffNode(align) * (-1)
