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

test("Should throw an UnexpectedErrorException (raiseOrPass version)", () => {
  let testError = new Error("error message");
  testError.name = "UnknownErrorException";

  let expectedError = new UnexpectedErrorException(
    "Return this message",
    testError
  );

  try {
    raiseOrPassError(
      "UnexpectedErrorException",
      "Return this message",
      testError
    );
    expect(false).toBe(true);
  } catch (expectedError) {
    expect(true).toBe(true);
  }
});

test("Should return an UnexpectedSuccessException", () => {
  let testError = new Error("error message");
  testError.name = "UnknownErrorException";

  let expectedError = new UnexpectedSuccessException(
    "Return this message",
    testError
  );

  try {
    raiseOrPassError(
      "UnexpectedSuccessException",
      "Return this message",
      testError
    );
    expect(false).toBe(true);
  } catch (expectedError) {
    expect(true).toBe(true);
  }
});

test("Should return an MappingSetupException", () => {
  let testError = new Error("error message");
  testError.name = "UnknownErrorException";

  let expectedError = new MappingSetupException(
    "Return this message",
    testError
  );

  try {
    raiseOrPassError("MappingSetupException", "Return this message", testError);
    expect(false).toBe(true);
  } catch (expectedError) {
    expect(true).toBe(true);
  }
});
