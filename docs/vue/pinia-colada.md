# Pinia Colada
使用 [Pinia Colada](https://pinia-colada.esm.dev/) 串接後端資料

## 介紹
Pinia Colada 特點:
- 快取，必免使用者頻繁閱覽重複頁面造成後端負擔
- Composable，更方便管理資料狀態

```bash
npm i @pinia/colada
```

## Query
元件內使用 `useQuery` 查詢資料  

```js
import { useQuery } from '@pinia/colada'
const {
  // main query properties
  state,
  asyncStatus,
  refresh,
  refetch,
  // convenient aliases
  error,
  data,
  status,
  isLoading,
  isPending,
  isPlaceholderData,
} = useQuery({
  // key 定義快取的名稱
  // 如果有放變數，當變數值改變時會重新取得資料
  // 也可以透過 useQueryCache() 中的 invalidateQueries 指定 key 清除快取
  key: ['products'],
  query: () => axios.get('/api/products')
  // 過期時間，超過會重新取得資料，單位是 ms
  staleTime: 1000 * 60 * 5,
})
```

如果會重複使用的話，建議獨立成 js 檔並使用 `defineQuery` 包裝
```js
import { useQuery, defineQuery } from '@pinia/colada'

export const useGetProductQuery = defineQuery(() => {
  // 也可以放入其他狀態資料
  const text = ref('abcd')

  const query = useQuery({
    // key 定義快取的名稱
    // 如果有放變數，當變數值改變時會重新取得資料
    key: ['products', 'all'],
    // query 查詢方式
    query: () => axios.get('/api/products')
  })

  return {
    text, ...query
  }
})

const { data } = useGetProductQuery()
```

## Mutation
元件內使用 `useMutation` 修改資料  
```js
const {
  mutateAsync: createProduct
} = useMutation({
  mutation: (data) => axios.post('/api/products', data)
})

await createProduct({
  name: '商品',
  price: 100
})
```

如果會重複使用的話，建議獨立成 js 檔並使用 `defineMutation` 包裝
```js
export const useCreateProductMutation = defineMutation(() => {
  return useMutation({
    mutation: (data) => axios.post('/api/products', data)
  })
})

const {
  mutateAsync: createProduct
}  = useCreateProductMutation()

await createProduct({
  name: '商品',
  price: 100
})
```
