import changeLog from './changelog.json'
export async function GET(req: Request) {
  return new Response(JSON.stringify(changeLog))
}