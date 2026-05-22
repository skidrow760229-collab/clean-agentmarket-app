import { NextRequest, NextResponse } from "next/server"

const ADMIN_PASSWORD = "130314Jin"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: "密码错误" },
        { status: 401 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "验证失败" },
      { status: 500 }
    )
  }
}
