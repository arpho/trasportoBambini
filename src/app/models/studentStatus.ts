export enum StudentStatus {
    presente = 1,
    assente,
    ritardo
}

export interface StudentPresence{
  studentKey:string
  status:StudentStatus
}