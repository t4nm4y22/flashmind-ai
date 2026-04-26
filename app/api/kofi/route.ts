import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const dataStr = formData.get('data') as string;
    const data = JSON.parse(dataStr);

    const email = data.email;
    if (email) {
      await getSupabase()
        .from('supporters')
        .upsert({ email }, { onConflict: 'email' });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Ko-fi webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 200 });
  }
}