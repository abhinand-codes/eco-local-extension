/* eslint-disable no-console */
import axios from 'axios'

export async function searchOpenFoodFacts(query: string) {
    try {
        const response = await axios.get(
            'https://world.openfoodfacts.org/cgi/search.pl',
            {
                params: {
                    search_terms: query,
                    json: 1,
                    page_size: 5,
                },
            },
        )

        return response.data.products.map((p: any) => ({
            id: p.id || p._id || p.code || p.product_name,
            name: p.product_name || 'Unknown',
            brand: p.brands || '',
            url: p.link || p.url || '',
            source: 'Open Food Facts',
        }))
    }
    catch (error) {
        console.error('OpenFoodFacts error:', error)
        return []
    }
}
