export class Serializers{

    serialize2String = (v: string) => {
      return   v ? v : ''
    }

    serialize2PositiveNumber = (n: number,defaultNumber=-1) => {
      return  n ? n : defaultNumber
    }
}