import changeLog from './changelog.json'
export async function GET(req: Request) {
  console.log(req.body)
  return new Response(JSON.stringify(changeLog))
}