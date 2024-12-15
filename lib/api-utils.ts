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
