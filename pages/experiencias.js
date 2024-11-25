import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const URL = "http://localhost:3000/api/experiencias"
  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  const handleExperienciaSubmit = async (newExperiencia) => {
    try {
      const method = experienceToEdit ? 'PUT' : 'POST';
      const endpoint = experienceToEdit ? `${URL}/${experienceToEdit._id}` : URL;

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperiencia),
      });

      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();
      if (experienceToEdit) {
        setExperiencias(prevExperiencias => prevExperiencias.map(exp => (exp._id === data._id ? data : exp)));
      } else {
        setExperiencias(prevExperiencias => [...prevExperiencias, data]);
      }

      setExperienceToEdit(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`${URL}/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error');
      }
      setExperiencias(prevExperiencias => prevExperiencias.filter(exp => exp._id !== expId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperience = (experience) => {
    setExperienceToEdit(experience);
  };

  return (
    <div className="form-container">
      <h2-form>Gestión de Experiencias</h2-form>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList experiencias={experiencias} onDeleteExperience={handleDeleteExperience} onEditExperience={handleEditExperience} />
          <ExperienciaForm onSubmit={handleExperienciaSubmit} />
        </>
      )}
    </div>
  );
}
