import { CompositeValidator } from "../../../../usecase/Card/Validation/CompositeValidator";
import { ValidationStrategy } from "../../../../usecase/Card/Validation/interface/ValidationStrategy";

describe("CompositeValidator", () => {
  const mockData = { any: "data" };

  it("deve chamar todas as estratégias de validação com os dados corretos", async () => {
    const mockStrategy1: ValidationStrategy<typeof mockData> = {
      validate: jest.fn().mockResolvedValue(undefined),
    };
    const mockStrategy2: ValidationStrategy<typeof mockData> = {
      validate: jest.fn().mockResolvedValue(undefined),
    };

    const validator = new CompositeValidator([mockStrategy1, mockStrategy2]);

    await validator.executeAll(mockData);

    expect(mockStrategy1.validate).toHaveBeenCalledWith(mockData);
    expect(mockStrategy2.validate).toHaveBeenCalledWith(mockData);
  });

  it("deve lançar erro se uma das estratégias lançar", async () => {
    const mockStrategy1: ValidationStrategy<typeof mockData> = {
      validate: jest.fn().mockResolvedValue(undefined),
    };
    const mockStrategy2: ValidationStrategy<typeof mockData> = {
      validate: jest.fn().mockRejectedValue(new Error("Erro de validação")),
    };

    const validator = new CompositeValidator([mockStrategy1, mockStrategy2]);

    await expect(validator.executeAll(mockData)).rejects.toThrow(
      "Erro de validação"
    );
  });
});
