import { useState } from 'react';
import Navbar from '../components/Navbar';
import { user } from '../data/mockData';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskUpdates: true,
    projectUpdates: false,
    weeklyDigest: true
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="page-container">
      <Navbar 
        title="Settings" 
        subtitle="Manage your account and preferences" 
      />
      
      <div className="page-content">
        <div className="settings-container">
          {/* Profile Settings */}
          <div className="settings-section">
            <h2 className="settings-title">Profile Information</h2>
            <form onSubmit={handleSaveProfile} className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleProfileChange}
                />
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="settings-section">
            <h2 className="settings-title">Change Password</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <button type="button" className="save-btn">
                Update Password
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="settings-section">
            <h2 className="settings-title">Notification Preferences</h2>
            <div className="settings-toggles">
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Email Notifications</h4>
                  <p>Receive email notifications for important updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationToggle('emailNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Task Updates</h4>
                  <p>Get notified when tasks are updated or completed</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.taskUpdates}
                    onChange={() => handleNotificationToggle('taskUpdates')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Project Updates</h4>
                  <p>Receive updates about project milestones</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.projectUpdates}
                    onChange={() => handleNotificationToggle('projectUpdates')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Weekly Digest</h4>
                  <p>Get a weekly summary of your projects and tasks</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={() => handleNotificationToggle('weeklyDigest')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-section">
            <h2 className="settings-title">Appearance</h2>
            <div className="settings-toggles">
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Dark Mode</h4>
                  <p>Switch to dark theme (Coming Soon)</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" disabled />
                  <span className="toggle-slider disabled"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
