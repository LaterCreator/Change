export async function fetchPubMedData(query: string) {
    const apiKey = process.env.PUBMED_API_KEY; // Ensure this is set in your `.env` file.
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch PubMed data');
      }
      return await response.json();
    } catch (error) {
      console.error('PubMed API Error:', error);
      throw error;
    }
  }
  
  export async function fetchOWIDData(dataset: string) {
    const url = `https://ourworldindata.org/${encodeURIComponent(dataset)}.json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch OWID data');
      }
      return await response.json();
    } catch (error) {
      console.error('OWID API Error:', error);
      throw error;
    }
  }
  