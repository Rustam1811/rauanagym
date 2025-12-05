'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getSettings, updateSettings } from '@/lib/firebase/admin/settings';
import { AppSettings } from '@/types/admin';
import AdminCard from '@/components/admin/AdminCard';
import Input from '@/components/admin/Input';
import Toggle from '@/components/admin/Toggle';
import PrimaryButton from '@/components/admin/PrimaryButton';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSettings();
      setSettings(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    await updateSettings(settings);
    setSaving(false);
    alert('Settings saved successfully!');
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-hj-textMain mb-1">App Settings</h1>
          <p className="text-hj-textSoft">Configure application-wide settings</p>
        </div>
        <PrimaryButton 
          icon={Save}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </PrimaryButton>
      </div>

      {/* Feature Toggles */}
      <AdminCard title="Feature Toggles">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textMain font-semibold mb-1">Arena Battles</p>
              <p className="text-hj-textSoft text-sm">Enable/disable the arena battles feature</p>
            </div>
            <Toggle
              checked={settings.featureToggles.enableArena}
              onChange={(checked) => setSettings({
                ...settings,
                featureToggles: { ...settings.featureToggles, enableArena: checked }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textMain font-semibold mb-1">Workout Programs</p>
              <p className="text-hj-textSoft text-sm">Enable/disable workout programs</p>
            </div>
            <Toggle
              checked={settings.featureToggles.enablePrograms}
              onChange={(checked) => setSettings({
                ...settings,
                featureToggles: { ...settings.featureToggles, enablePrograms: checked }
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textMain font-semibold mb-1">Premium Features</p>
              <p className="text-hj-textSoft text-sm">Enable/disable premium subscription features</p>
            </div>
            <Toggle
              checked={settings.featureToggles.enablePremium}
              onChange={(checked) => setSettings({
                ...settings,
                featureToggles: { ...settings.featureToggles, enablePremium: checked }
              })}
            />
          </div>
        </div>
      </AdminCard>

      {/* Gamification Settings */}
      <AdminCard title="Gamification">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="XP per Workout"
            type="number"
            value={String(settings.defaultXPPerWorkout)}
            onChange={(e) => setSettings({
              ...settings,
              defaultXPPerWorkout: Number(e.target.value)
            })}
          />

          <Input
            label="Calories per Minute"
            type="number"
            value={String(settings.defaultCaloriesPerMinute)}
            onChange={(e) => setSettings({
              ...settings,
              defaultCaloriesPerMinute: Number(e.target.value)
            })}
          />
        </div>
      </AdminCard>

      {/* App Info */}
      <AdminCard title="System Information">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-200">
            <span className="text-hj-textSoft font-medium">Document ID</span>
            <span className="text-hj-textMain font-mono font-semibold">{settings.id}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-hj-textSoft font-medium">Last Updated</span>
            <span className="text-hj-textMain font-semibold">{new Date(settings.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
