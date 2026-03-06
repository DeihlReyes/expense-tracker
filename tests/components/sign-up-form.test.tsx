// tests/components/sign-in-form.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpForm } from "@/app/(auth)/sign-up/sign-up-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onSignUp with form data on submit", async () => {
    const mockSignUp = vi.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={mockSignUp} />);

    await user.type(
      screen.getByPlaceholderText(/John Doe/i),
      "Elizabeth Smith"
    );
    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/^password$/i), "Password123");
    await user.type(screen.getByLabelText(/confirm password/i), "Password123");
    await user.click(screen.getByRole("button", { name: /^sign up$/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        name: "Elizabeth Smith",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      });
    });
  });

  it("displays error when sign up fails", async () => {
    const mockSignUp = vi
      .fn()
      .mockRejectedValue(new Error("User already exists. Use another email."));
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={mockSignUp} />);

    await user.type(
      screen.getByPlaceholderText(/John Doe/i),
      "Elizabeth Smith"
    );
    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/^password$/i), "Password123");
    await user.type(screen.getByLabelText(/confirm password/i), "Password123");
    await user.click(screen.getByRole("button", { name: /^sign up$/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/user already exists. use another email./i)
      ).toBeInTheDocument();
    });
  });

  it("clears error on new submission", async () => {
    const mockSignUp = vi
      .fn()
      .mockRejectedValueOnce(
        new Error("User already exists. Use another email.")
      )
      .mockResolvedValueOnce({});
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={mockSignUp} />);
    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/m@example.com/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /^sign up$/i });

    // First attempt - error
    await user.type(nameInput, "Elizabeth Smith");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password123");
    await user.click(submitButton);

    // Second attempt - success
    await user.clear(nameInput);
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.clear(confirmPasswordInput);
    await user.type(nameInput, "Elizabeth Smith");
    await user.type(emailInput, "test6@example.com");
    await user.type(passwordInput, "Password123");
    await user.type(confirmPasswordInput, "Password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/user already exists. use another email./i)
      ).not.toBeInTheDocument();
    });
  });

  it("displays validation errors", async () => {
    const mockSignUp = vi.fn();
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={mockSignUp} />);

    await user.click(screen.getByRole("button", { name: /^sign up$/i }));

    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/please confirm your password/i)
      ).toBeInTheDocument();
    });
  });

  it("displays password mismatch error", async () => {
    const mockSignUp = vi.fn();
    const user = userEvent.setup();

    render(<SignUpForm onSignUp={mockSignUp} />);

    await user.type(
      screen.getByPlaceholderText(/John Doe/i),
      "Elizabeth Smith"
    );
    await user.type(
      screen.getByPlaceholderText(/m@example.com/i),
      "test@example.com"
    );
    await user.type(screen.getByLabelText(/^password$/i), "Password123");
    await user.type(
      screen.getByLabelText(/confirm password/i),
      "DifferentPassword123"
    );
    await user.click(screen.getByRole("button", { name: /^sign up$/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});
