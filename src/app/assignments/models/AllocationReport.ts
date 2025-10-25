/**
 * @author Kent Bull
 */
export interface AllocationReport {
    suborganizationId: number,
    positionName: string,
    commonName: string,
    fullName: string,
    electedCount: number,
    allocatedCount: number,
    missingPositions: number
}
