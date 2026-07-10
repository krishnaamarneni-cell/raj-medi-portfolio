import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const password = typeof body.password === "string" ? body.password.trim() : "";

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json(
      { error: "ADMIN_PASSWORD environment variable is not configured" },
      { status: 500 },
    );
  }

  if (!verifyPassword(password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  await createSession();
  return Response.json({ ok: true });
}
