import { del, get, keys, set } from 'idb-keyval'

export function useFavorites() {
  async function addFavorite(item: any) {
    await set(`fav-${item.id}`, item)
  }

  async function removeFavorite(id: string) {
    await del(`fav-${id}`)
  }

  async function getAllFavorites() {
    const allKeys = await keys()
    const favKeys = allKeys.filter(k =>
      String(k).startsWith('fav-'),
    )

    return Promise.all(favKeys.map(k => get(k)))
  }

  return {
    addFavorite,
    removeFavorite,
    getAllFavorites,
  }
}
