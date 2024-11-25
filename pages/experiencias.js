import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    //Crear experiencia
    try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExperiencia),
        });
  
        if (!response.ok) {
          throw new Error('Error al crear la experiencia');
        }
  
        const data = await response.json();
        setExperiencias([...experiencias, data]); // Actualiza la lista de experiencias
      } catch (err) {
        console.error(err.message);
      }
  };

  const handleDeleteExperience = async (expId) => {
    // Eliminar experiencia
    try {
        const response = await fetch(`http://localhost:3000/api/experiencias/${expId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar la experiencia');
        }
  
        setExperiencias(experiencias.filter(exp => exp._id !== expId)); // Actualiza la lista
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <div className="form-container">
      <h2-form>Gestión de Experiencias</h2-form>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList experiencias={experiencias} onDeleteExperience={handleDeleteExperience} />
          <ExperienciaForm onSubmit={handleExperienciaSubmit} />
        </>
      )}
    </div>
  );
}
