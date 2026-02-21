export async function searchOpenFoodFacts(query: string) {
  try {
    // Open Food Facts API prefers native fetch in Service Workers
    // Using their recommended search endpoint with identification headers
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'EcoCartLocal - WebExtension - 1.0.0',
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.products) {
      return []
    }

    return data.products.map((p: any) => ({
      id: p.id || p._id || p.code || p.product_name,
      name: p.product_name || 'Unknown Product',
      brand: p.brands || 'Various Brands',
      url: `https://world.openfoodfacts.org/product/${p.code}`,
      source: 'Open Food Facts',
      tags: p.categories_tags ? p.categories_tags.slice(0, 3).map((t: string) => t.replace('en:', '')) : ['sustainability'],
    }))
  }
  catch (error) {
    console.error('OpenFoodFacts API error:', error)
    return []
  }
}
