// tests/components/sign-in-form.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SignInForm } from "@/app/(auth)/sign-in/sign-in-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

describe("SignInForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onSignIn with form data on submit", async () => {
    const mockSignIn = vi.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<SignInForm onSignIn={mockSignIn} />);

    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: false,
      });
    });
  });

  it("displays error when sign in fails", async () => {
    const mockSignIn = vi
      .fn()
      .mockRejectedValue(new Error("Invalid email or password"));
    const user = userEvent.setup();

    render(<SignInForm onSignIn={mockSignIn} />);

    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i)
      ).toBeInTheDocument();
    });
  });

  it("clears error on new submission", async () => {
    const mockSignIn = vi
      .fn()
      .mockRejectedValueOnce(new Error("Invalid email or password"))
      .mockResolvedValueOnce({});

    const user = userEvent.setup();
    render(<SignInForm onSignIn={mockSignIn} />);

    const emailInput = screen.getByPlaceholderText(/m@example.com/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /^sign in$/i });

    // First attempt - error
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpass123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i)
      ).toBeInTheDocument();
    });

    // Second attempt - success, error clears
    await user.clear(passwordInput);
    await user.type(passwordInput, "Correct123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/invalid email or password/i)
      ).not.toBeInTheDocument();
    });
  });

  it("disables button while submitting", async () => {
    const mockSignIn = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const user = userEvent.setup();

    render(<SignInForm onSignIn={mockSignIn} />);

    const submitButton = screen.getByRole("button", { name: /^sign in$/i });

    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
