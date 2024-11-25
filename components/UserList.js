import React from 'react';

const UserList = ({ users, onDelete, onViewDetails }) => {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li className="user-item" key={user._id}>
            {user.name}
            <div className="button-group"> 
              <button className="button-small" onClick={() => onViewDetails(user)}>Ver Detalles</button>
              <button className="button-small" onClick={() => onDelete(user._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;





