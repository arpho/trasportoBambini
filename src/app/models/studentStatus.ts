export enum StudentStatus {
    assente = 0,
    presente,
    ritardo
}

export interface StudentPresence{
  studentKey:string
  status:StudentStatus
}