export async function getInfo(selectedCountry, searchQuery) {
    try {
        const response = await fetch('http://192.168.10.50:5000/regcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                selectedCountry, 
                searchQuery 
            }),
        });
  
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        if (!data?.basic_info) {
            throw new Error('Invalid response format from server');
        }
  
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  }
  export default getInfo