import { NextRequest, NextResponse } from 'next/server'
import { findWorkspaceByPublicKey } from '@/models/workspaces'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS })
}

export async function GET(req: NextRequest) {
  const publicKey = req.nextUrl.searchParams.get('publicKey')
  if (!publicKey) {
    return NextResponse.json({ error: 'publicKey required' }, { status: 400, headers: CORS })
  }

  const workspace = await findWorkspaceByPublicKey(publicKey)
  if (!workspace || workspace.status !== 'active') {
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: CORS })
  }

  return NextResponse.json(workspace.widgetConfig, { headers: CORS })
}
