import { useEffect, useState } from 'react';

export default function ExperienciaList({ experiencias = [], onDeleteExperience, onEditExperience }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Experiencias</h2>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id}>
            <p><strong>Descripción:</strong> {exp.description}</p>
            <p><strong>Dueño:</strong> {exp.owner}</p>
            <p><strong>Participantes:</strong> {exp.participants.join(', ')}</p>
            <button onClick={() => onEditExperience(exp)}>Editar</button>
            <button onClick={() => onDeleteExperience(exp._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
