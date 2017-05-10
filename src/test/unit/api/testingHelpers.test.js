/**
 * Created by DLINDSAY on 10-May-17.
 */
import {
  expectNotFoundOrRethrowError,
  raiseOrPassError
} from "../../integration/api/testingHelpers";
import {
  UnexpectedErrorException,
  UnexpectedSuccessException,
  MappingSetupException
} from "../../integration/api/testingErrors";

test("Should rethrow the same error", () => {
  let testError = new Error("error message");
  testError.name = "MappingSetupException";

  try {
    expectNotFoundOrRethrowError(testError, "test message");
    expect(false).toBe(true);
  } catch (testError) {
    expect(true).toBe(true);
  }
});

test("Should throw an UnexpectedErrorException", () => {
  let testError = new Error("error message");
  testError.name = "NotInArrayException";

  let testException = new UnexpectedErrorException("error message", testError);

  try {
    expectNotFoundOrRethrowError(testError, "test message");
    expect(false).toBe(true);
  } catch (testException) {
    expect(true).toBe(true);
  }
});

test("Should rethrow the same error (raiseOrPass version)", () => {
  let testError = new Error("error message");
  testError.name = "MappingSetupException";

  try {
    raiseOrPassError("UnexpectedErrorException", "test message", testError);
    expect(false).toBe(true);
  } catch (testError) {
    expect(true).toBe(true);
  }
});
