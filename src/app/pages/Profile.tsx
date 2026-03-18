// src/app/pages/Profile.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  User, Mail, Phone, MapPin, Calendar, Camera,
  Save, Lock, Bell, Moon, Globe 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "(11) 99999-9999",
    address: "123 Main St, New York, NY 10001",
    birthDate: "1990-01-01",
  });

  const handleSave = () => {
    updateUser({ name: formData.name, email: formData.email });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-foreground">Profile Settings</h1>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8"
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-destructive flex items-center justify-center text-white text-5xl font-black">
              {user?.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-card">
              <Camera size={16} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground mt-1 capitalize">{user?.plan} plan</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Phone Number</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-foreground mb-2">Address</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSave}
            className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </motion.button>
        )}
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-primary" />
              <div>
                <p className="font-bold text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">Receive transaction alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-primary" />
              <div>
                <p className="font-bold text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle theme</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-primary" />
              <div>
                <p className="font-bold text-foreground">Language</p>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </div>
            <button className="text-primary font-bold">Change</button>
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Security</h2>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Enable for extra security</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}