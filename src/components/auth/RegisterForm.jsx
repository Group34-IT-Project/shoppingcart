import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';

const RegisterForm = ({ onSwitchToRoleSelection }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'customer' // Default to customer
  });
  const [error, setError] = useState('');
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = register(formData);
      if (result) {
        // Registration successful, show role selection
        setShowRoleSelection(true);
        if (onSwitchToRoleSelection) {
          onSwitchToRoleSelection(result);
        }
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (showRoleSelection) {
    return (
      <div className="role-selection-prompt">
        <h3>Account Created Successfully! 🎉</h3>
        <p>Now let's set up your account type.</p>
        <button
          onClick={() => onSwitchToRoleSelection && onSwitchToRoleSelection()}
          className="continue-btn"
        >
          Continue to Role Selection
        </button>
      </div>
    );
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-submit-btn">
          Create Account
        </button>
      </form>
    </>
  );
};

export default RegisterForm;