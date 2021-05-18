import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";
import { MemoryRouter } from "react-router";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const signInMock = jest.fn();
      const { getByTestId } = render(
        <MemoryRouter>
          <SignInContainer signIn={signInMock} />
        </MemoryRouter>
      );

      act(() => {
        fireEvent.changeText(getByTestId("username-input-test"), "kalle");
      });

      act(() => {
        fireEvent.changeText(getByTestId("password-input-test"), "password");
      });

      act(() => {
        fireEvent.press(getByTestId("submit-button-test"));
      });

      await waitFor(() => {
        expect(signInMock).toHaveBeenCalledTimes(1);
        expect(signInMock.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
