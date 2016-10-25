'use strict';

// http://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
function isCounterClockwise(pA, pB, pC) {
    return (pC.y - pA.y) * (pB.x - pA.x) > (pB.y - pA.y) * (pC.x - pA.x);
}

function lineSegmentIntersectsLineSegment(a0, a1, b0, b1) {
    return isCounterClockwise(a0, b0, b1) !== isCounterClockwise(a1, b0, b1) &&
           isCounterClockwise(a0, a1, b0) !== isCounterClockwise(a0, a1, b1);
}

function lineIntersectsLine(lineA, lineB) {
    if (lineA.length === 0 || lineB.length === 0) return false;
    for (let i = 0; i < lineA.length - 1; i++) {
        const a0 = lineA[i];
        const a1 = lineA[i + 1];
        for (let j = 0; j < lineB.length - 1; j++) {
            const b0 = lineB[j];
            const b1 = lineB[j + 1];
            if (lineSegmentIntersectsLineSegment(a0, a1, b0, b1)) return true;
        }
    }
    return false;
}

function polygonContainsPoint(polygon, point) {
    let c = false;
    for (let i = 0; i < polygon.length - 1; i++) {
        const p0 = polygon[i];
        const p1 = polygon[i + 1];
        if (((p0.y > point.y) !== (p1.y > point.y)) &&
            (point.x < (p1.x - p0.x) * (point.y - p0.y) / (p1.y - p0.y) + p0.x)) {
            c = !c;
        }
    }
    return c;
}

module.exports.polygonIntersectsPolygon = function(polygonA, polygonB) {
    for (let i = 0; i < polygonA.length; i++) {
        if (polygonContainsPoint(polygonB, polygonA[i])) return true;
    }

    for (let i = 0; i < polygonB.length; i++) {
        if (polygonContainsPoint(polygonA, polygonB[i])) return true;
    }

    if (lineIntersectsLine(polygonA, polygonB)) return true;

    return false;
};
