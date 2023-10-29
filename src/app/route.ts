import { type NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/app";
  return NextResponse.redirect(url, {
    status: 302,
  });
};
