import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const URL = "http://localhost:3000/api/user";
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSubmit = async (newUser) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      const data = await response.json();
      setUsers([...users, data]); // Actualiza la lista de usuarios
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      setUsers(users.filter((user) => user._id !== userId)); // Actualiza la lista
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (user) => {
    // Si el usuario ya está seleccionado, se deselecciona
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user); // Si no, se selecciona el nuevo usuario
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Usuarios</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <UserList users={users} onDelete={handleDelete} onViewDetails={handleViewDetails} />
          <div className="content">
            <div className="form-section">
              <UserForm onSubmit={handleUserSubmit} />
            </div>

            {/* Mostrar detalles del usuario seleccionado */}
            {selectedUser && (
              <div className="details-section">
                <h3>Detalles del Usuario</h3>
                <p><strong>Nombre:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.mail}</p>
                <p><strong>Comentario:</strong> {selectedUser.comment}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}


