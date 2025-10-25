export interface PositionToFill {
    suborganizationId: number,
    positionId: number,
    positionName: string,
    filledCount: number,
    allocationCount: number
}

export interface FillablePositions {
    allocationCount: number,
    allocations: PositionToFill[]
}

export interface PositionDto {
    id: number,
    name: string,
    code: string
}
