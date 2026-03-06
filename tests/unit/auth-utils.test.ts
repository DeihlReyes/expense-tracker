import { redirect } from "next/navigation";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { redirectIfAuthenticated, requireAuth } from "@/lib/auth/auth-utils";
import { getServerSession } from "@/lib/session";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT"); // Simulate Next.js redirect behavior
  }),
}));

vi.mock("@/lib/session");

const mockGetServerSession = vi.mocked(getServerSession);
const mockRedirect = vi.mocked(redirect);

// Fixed dates for deterministic tests
const testDate = new Date("2024-01-01T00:00:00.000Z");
const testExpiresAt = new Date("2024-01-02T00:00:00.000Z");

const testUser = {
  id: "1",
  email: "test@test.com",
  name: "Test User",
  emailVerified: true,
  createdAt: testDate,
  updatedAt: testDate,
  image: null,
};

const mockSession = {
  session: {
    id: "session-1",
    createdAt: testDate,
    updatedAt: testDate,
    userId: "1",
    expiresAt: testExpiresAt,
    token: "token-123",
    ipAddress: null,
    userAgent: null,
  },
  user: testUser,
};

describe("redirectIfAuthenticated()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to dashboard if user is authenticated", async () => {
    mockGetServerSession.mockResolvedValue(mockSession);

    await expect(redirectIfAuthenticated()).rejects.toThrow("NEXT_REDIRECT");

    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect if user is not authenticated", async () => {
    mockGetServerSession.mockResolvedValue(null);

    await redirectIfAuthenticated();

    expect(mockRedirect).not.toHaveBeenCalled();
  });
});

describe("requireAuth()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns user when authenticated", async () => {
    mockGetServerSession.mockResolvedValue(mockSession);

    const result = await requireAuth();

    expect(result).toEqual(mockSession.user);
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("redirects to sign-in when not authenticated", async () => {
    mockGetServerSession.mockResolvedValue(null);

    await expect(requireAuth()).rejects.toThrow("NEXT_REDIRECT");

    expect(mockRedirect).toHaveBeenCalledWith("/sign-in");
  });
});
