import changeLog from './changelog.json'
export async function GET() {
  return new Response(JSON.stringify(changeLog))
}