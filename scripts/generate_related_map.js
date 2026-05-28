const fs = require('fs');

const allProducts = JSON.parse(fs.readFileSync('all_products.json', 'utf8'));
const categoryMapping = JSON.parse(fs.readFileSync('generated_mapping.json', 'utf8'));

const relatedMap = {};

allProducts.forEach(product => {
    const slug = product.slug;
    const cats = categoryMapping[slug] || [];
    
    // Score other products
    const scores = [];
    allProducts.forEach(other => {
        if (other.slug === slug) return;
        
        let score = 0;
        const otherCats = categoryMapping[other.slug] || [];
        
        // Match categories
        cats.forEach(c => {
            if (otherCats.includes(c)) score += 2;
        });

        // Match tags
        const pTags = product.tags || [];
        const oTags = other.tags || [];
        pTags.forEach(t => {
            if (oTags.includes(t)) score += 3;
        });

        // Match name keywords
        const pWords = product.name.toLowerCase().split(' ');
        const oWords = other.name.toLowerCase().split(' ');
        pWords.forEach(w => {
            if (w.length > 3 && oWords.includes(w)) score += 1;
        });

        scores.push({ slug: other.slug, score });
    });

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);
    
    // Take top 4
    relatedMap[slug] = scores.slice(0, 4).map(s => s.slug);
});

let tsContent = `export const PRODUCT_TO_RELATED_MAP: Record<string, string[]> = {\n`;
for (const [slug, related] of Object.entries(relatedMap)) {
    tsContent += `    "${slug}": [\n`;
    related.forEach((r, i) => {
        tsContent += `        "${r}"${i < 3 ? ',' : ''}\n`;
    });
    tsContent += `    ],\n`;
}
tsContent += `};\n\n`;
tsContent += `export function getRelatedProductSlugs(slug: string): string[] {\n    return PRODUCT_TO_RELATED_MAP[slug] || [];\n}\n`;

fs.writeFileSync('new_categories.ts', tsContent);
console.log('Successfully generated new_categories.ts for all 126 products.');
