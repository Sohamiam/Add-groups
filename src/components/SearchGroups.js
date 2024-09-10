import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchGroups() {
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/groups/search', {
        params: { name: query },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  return (
    <div>
      <h2>Search Groups</h2>
      <input
        type="text"
        placeholder="Search by group name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {groups.map((group) => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchGroups;
