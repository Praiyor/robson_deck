import { ValidationStrategy } from "./interface/ValidationStrategy.js";

export class CompositeValidator<T>{
    constructor(private strategies: ValidationStrategy<T>[]){}

    async executeAll(data: T): Promise<void>{
        for(var strategy of this.strategies){
            await strategy.validate(data);
        }
    }
}