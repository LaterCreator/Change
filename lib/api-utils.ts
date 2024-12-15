async function fetchData(queryType: string): Promise<void> {
  let endpoint = '';
  
  // Map general queries to corresponding API endpoints

  switch (queryType) {
    case 'population':
      endpoint = 'population';
      break;
    case 'income':
      endpoint = 'income';
      break;
    case 'health':
      endpoint = 'health';
      break;
    case 'education':
      endpoint = 'education';
      break;
    default:
      console.error('Unknown query type');
      return;
  }

  // Attempt to fetch data
  try {
    const response = await fetch(`https://api.ourworldindata.org/v1/indicator/${endpoint}`);
    
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error('Failed to fetch data');
    }

    // Parse and log the data if successful
    const data = await response.json();
    console.log(data);  // Process and display the data

  } catch (error: unknown) {
    // TypeScript requires type assertion for error
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

// Example usage: Query population data
fetchData('population');  // You can replace 'population' with 'income', 'health', etc.
// lib/api-utils.ts

// Example of a named export
export async function fetchPubMedData(query: string) {
  // Implement your logic for fetching PubMed data here
  return { data: `PubMed result for ${query}` };  // Example data
}

// Another example of a named export
export async function fetchOWIDData(query: string) {
  // Implement your logic for fetching OWID data here
  return { data: `OWID result for ${query}` };  // Example data
}
