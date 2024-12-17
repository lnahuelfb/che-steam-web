import changeLog from './changelog.json'
export async function GET(_req: Request) {
  return new Response(JSON.stringify(changeLog))
}