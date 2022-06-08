export enum StudentStatus {
    presente = 1,
    assente,
    ritardo
}

export interface Studentpresence{
  studentKey:string
  status:StudentStatus
}