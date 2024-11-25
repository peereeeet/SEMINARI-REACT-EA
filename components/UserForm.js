// components/UserForm.js

import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = { name, mail, comment, password };

    try {
      await onSubmit(newUser);
      setMessage('Usuario creado con éxito');
      setName('');
      setMail('');
      setComment('');
      setPassword('');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="form-container" >
      <h2-form className="h2-form">Crear Nuevo Usuario</h2-form>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <button type="submit" className='form'>Crear Usuario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserForm;
