import { QuestionBase } from "./question-base";
import { QuestionProperties } from './questionproperties';

export class passwordQuestion extends QuestionBase<string>{
    controlType='password'
    type:'password'
    constructor(options:QuestionProperties<string>){
        super(options)
    
    }

}