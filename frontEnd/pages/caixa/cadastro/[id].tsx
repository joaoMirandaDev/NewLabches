import { Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import api from 'src/utils/Api'
import { CAIXA_BY_ID } from 'src/utils/Routes'
export default function CreateCaixa() {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    api.get(CAIXA_BY_ID + id).then(response => {
      console.log(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return <Text>{id}</Text>
}
