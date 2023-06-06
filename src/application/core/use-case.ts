export interface IUseCase<D, R> {
  exec(data?: D): Promise<R>;
}
