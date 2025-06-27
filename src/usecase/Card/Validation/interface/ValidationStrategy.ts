export interface ValidationStrategy<T> {
    validate(data: T): Promise<void>;
}