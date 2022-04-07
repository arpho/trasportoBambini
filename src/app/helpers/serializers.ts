export class Serializers{

    serialize2String = (v: string) => {
        v ? v : ''
    }

    serialize2PositiveNumber = (n: number) => {
        n ? n : -1
    }
}