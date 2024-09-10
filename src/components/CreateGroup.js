import { useState } from 'react';
import axios from 'axios';


function CreateGroup() {
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/groups', {
      name,
      members: members.split(','),
    });
    setName('');
    setMembers('');
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Members (comma separated)"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          required
        />
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroup;
