// src/app/pages/Settings.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, Lock, Eye, EyeOff, CreditCard, Shield,
  Moon, Globe, DollarSign, LogOut, Trash2 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-foreground">Settings</h1>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">Transaction Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified for every transaction</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">Security Alerts</p>
              <p className="text-sm text-muted-foreground">Login and security notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Privacy & Security</h2>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra layer of security</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Eye size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Privacy Settings</p>
                <p className="text-sm text-muted-foreground">Manage your data preferences</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>
        </div>
      </motion.div>

      {/* Card Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Card Settings</h2>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Manage Cards</p>
                <p className="text-sm text-muted-foreground">View or block your cards</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">Spending Limits</p>
                <p className="text-sm text-muted-foreground">Set daily or monthly limits</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Account Actions</h2>
        
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <div className="text-left">
                <p className="font-bold">Log Out</p>
                <p className="text-sm text-muted-foreground">Sign out from all devices</p>
              </div>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={20} />
              <div className="text-left">
                <p className="font-bold">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently remove your account</p>
              </div>
            </div>
            <span>→</span>
          </button>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-foreground mb-4">Delete Account?</h3>
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 bg-accent text-foreground rounded-xl font-bold hover:bg-accent/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex-1 px-6 py-3 bg-destructive text-white rounded-xl font-bold hover:bg-destructive/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}