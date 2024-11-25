import { useState, useEffect } from 'react';

export default function ExperienciaForm({ onSubmit }) {
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user`);
        const data = await response.json();
        setUsers(data);
        setLoadingUsers(false);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (experienceToEdit) {
      setDescription(experienceToEdit.description || '');
      setOwner(experienceToEdit.owner || '');
      setParticipants(experienceToEdit.participants || []);
    }
  }, [experienceToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description && owner) {
      const newExperiencia = {
        description,
        owner,
        participants,
      };
      onSubmit(newExperiencia);
    } else {
      alert('Debes completar todos los campos');
    }
  };

  if (loadingUsers) return <p>Cargando usuarios...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2-form>Lista de Experiencias</h2-form>
      <div>
        <label>Descripción experiencia:</label>
        <input
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <label>Seleccionar dueño:</label>
        <select value={owner} onChange={(e) => setOwner(e.target.value)}>
          <option value="">--Selecciona un usuario--</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Seleccionar participantes:</label>
        <select multiple value={participants} onChange={(e) => {
          const selectedParticipants = Array.from(e.target.selectedOptions, option => option.value);
          setParticipants(selectedParticipants);
        }}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{experienceToEdit ? 'Actualizar Experiencia' : 'Crear Experiencia'}</button>
    </form>
  );
}
