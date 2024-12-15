export function classifyQuery(query: string): 'pubmed' | 'owid' | 'unknown' {
    const pubmedKeywords = ['research', 'study', 'PubMed', 'medical', 'disease'];
    const owidKeywords = ['data', 'statistics', 'Our World in Data', 'global', 'vaccination'];
  
    if (pubmedKeywords.some((word) => query.toLowerCase().includes(word))) {
      return 'pubmed';
    }
    if (owidKeywords.some((word) => query.toLowerCase().includes(word))) {
      return 'owid';
    }
    return 'unknown';
  }
  