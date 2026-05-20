import { fetchGitHubData } from '@/lib/github'
import DownloadContent from '@/components/DownloadContent'

export default async function DownloadPage() {
  const data = await fetchGitHubData()
  return <DownloadContent initial={data} />
}
