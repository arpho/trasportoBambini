export class Serializers{

    serialize2String = (v: string) => {
        v ? v : ''
    }

    serialize2PositiveNumber = (n: number,defaultNumber=-1) => {
        n ? n : defaultNumber
    }
}