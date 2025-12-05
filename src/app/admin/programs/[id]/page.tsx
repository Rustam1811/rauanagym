'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { Program } from '@/types/admin';
import { getProgram, createProgram, updateProgram, deleteProgram } from '@/lib/firebase/admin/programs';
import { getWorkouts } from '@/lib/firebase/admin/workouts';
import AdminCard from '@/components/admin/AdminCard';
import Input from '@/components/admin/Input';
import Select from '@/components/admin/Select';
import Toggle from '@/components/admin/Toggle';
import PrimaryButton from '@/components/admin/PrimaryButton';
import SecondaryButton from '@/components/admin/SecondaryButton';

export default function ProgramEditPage() {
  const paramsPromise = useParams();
  const router = useRouter();
  const [params, setParams] = useState<{ id: string } | null>(null);
  const isNew = params?.id === 'new';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availableWorkouts, setAvailableWorkouts] = useState<Array<{ id: string; title: string }>>([]);

  const [formData, setFormData] = useState<Partial<Program>>({
    title: '',
    slug: '',
    description: '',
    level: 'beginner',
    weeks: 4,
    workoutsPerWeek: 3,
    workoutIds: [],
    tags: [],
    isPublished: false,
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [newTag, setNewTag] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');

  useEffect(() => {
    // First resolve params
    const resolveParams = async () => {
      const resolved = await paramsPromise;
      setParams(resolved as { id: string });
    };
    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    const loadData = async () => {
      // Load available workouts
      const workouts = await getWorkouts();
      setAvailableWorkouts(workouts.map(w => ({ id: w.id, title: w.title })));

      // Load program if editing
      if (!isNew) {
        const program = await getProgram(params.id);
        if (program) {
          setFormData(program);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [params, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params) return;
    setSaving(true);

    try {
      if (isNew) {
        const id = await createProgram(formData as Omit<Program, 'id'>);
        router.push(`/admin/programs/${id}`);
      } else {
        await updateProgram(params.id, formData);
        router.push('/admin/programs');
      }
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Error saving program');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params || !confirm('Are you sure you want to delete this program?')) return;
    
    try {
      await deleteProgram(params.id as string);
      router.push('/admin/programs');
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Error deleting program');
    }
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag]
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  const addWorkout = () => {
    if (selectedWorkout && !formData.workoutIds?.includes(selectedWorkout)) {
      setFormData({
        ...formData,
        workoutIds: [...(formData.workoutIds || []), selectedWorkout]
      });
      setSelectedWorkout('');
    }
  };

  const removeWorkout = (workoutId: string) => {
    setFormData({
      ...formData,
      workoutIds: formData.workoutIds?.filter(id => id !== workoutId) || []
    });
  };

  const moveWorkout = (index: number, direction: 'up' | 'down') => {
    const workouts = [...(formData.workoutIds || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < workouts.length) {
      [workouts[index], workouts[newIndex]] = [workouts[newIndex], workouts[index]];
      setFormData({ ...formData, workoutIds: workouts });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-hj-primary rounded-full animate-spin"></div>
        <p className="ml-4 text-hj-textSoft">Loading program...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/programs">
            <button className="p-2 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all">
              <ArrowLeft className="w-5 h-5 text-hj-textMain" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-hj-textMain">
              {isNew ? 'Create Program' : 'Edit Program'}
            </h1>
            <p className="text-hj-textSoft">
              {isNew ? 'Build a new workout program' : 'Update program details'}
            </p>
          </div>
        </div>
        {!isNew && (
          <button
            onClick={handleDelete}
            className="p-2 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <AdminCard title="Basic Information">
          <div className="space-y-4">
            <Input
              label="Program Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 12-Week Transformation"
              required
            />

            <Input
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., 12-week-transformation"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-hj-textMain">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-hj-textMain placeholder:text-hj-textSoft focus:outline-none focus:ring-2 focus:ring-hj-primary/30 focus:border-hj-primary transition-all duration-200 min-h-[120px]"
                placeholder="Describe the program..."
              />
            </div>

            <Input
              label="Cover Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </AdminCard>

        {/* Program Structure */}
        <AdminCard title="Program Structure">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>

            <Input
              label="Duration (weeks)"
              type="number"
              value={String(formData.weeks || '')}
              onChange={(e) => setFormData({ ...formData, weeks: parseInt(e.target.value) || 0 })}
              required
            />

            <Input
              label="Workouts per Week"
              type="number"
              value={String(formData.workoutsPerWeek || '')}
              onChange={(e) => setFormData({ ...formData, workoutsPerWeek: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
        </AdminCard>

        {/* Workouts */}
        <AdminCard title="Program Workouts">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select
                label="Add Workout"
                value={selectedWorkout}
                onChange={(e) => setSelectedWorkout(e.target.value)}
              >
                <option value="">Select a workout...</option>
                {availableWorkouts
                  .filter(w => !formData.workoutIds?.includes(w.id))
                  .map(workout => (
                    <option key={workout.id} value={workout.id}>
                      {workout.title}
                    </option>
                  ))
                }
              </Select>
              <button
                type="button"
                onClick={addWorkout}
                disabled={!selectedWorkout}
                className="mt-auto px-4 py-3 rounded-2xl bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white font-semibold hover:shadow-hj transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {formData.workoutIds && formData.workoutIds.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-hj-textMain">
                  Selected Workouts ({formData.workoutIds.length})
                </p>
                <div className="space-y-2">
                  {formData.workoutIds.map((workoutId, index) => {
                    const workout = availableWorkouts.find(w => w.id === workoutId);
                    return (
                      <div
                        key={workoutId}
                        className="flex items-center justify-between p-3 rounded-2xl bg-hj-cardSoft border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-hj-textSoft font-semibold text-sm">
                            Week {index + 1}
                          </span>
                          <span className="text-hj-textMain font-medium">
                            {workout?.title || workoutId}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveWorkout(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded-lg text-hj-textSoft hover:text-hj-textMain hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveWorkout(index, 'down')}
                            disabled={index === formData.workoutIds!.length - 1}
                            className="p-1 rounded-lg text-hj-textSoft hover:text-hj-textMain hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeWorkout(workoutId)}
                            className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </AdminCard>

        {/* Tags */}
        <AdminCard title="Tags">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                label="Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g., strength, cardio"
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!newTag}
                className="mt-auto px-4 py-3 rounded-2xl bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white font-semibold hover:shadow-hj transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hj-cardSoft text-hj-textMain text-sm font-medium border border-gray-200"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-hj-textSoft hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </AdminCard>

        {/* Publishing */}
        <AdminCard>
          <div className="p-4 rounded-2xl bg-hj-cardSoft">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-hj-textMain mb-1">Published</p>
                <p className="text-sm text-hj-textSoft">Make this program visible to users</p>
              </div>
              <Toggle
                checked={formData.isPublished || false}
                onChange={(checked) => setFormData({ ...formData, isPublished: checked })}
              />
            </div>
          </div>
        </AdminCard>

        {/* Actions */}
        <div className="flex gap-3">
          <PrimaryButton type="submit" icon={Save} disabled={saving}>
            {saving ? 'Saving...' : 'Save Program'}
          </PrimaryButton>
          <Link href="/admin/programs">
            <SecondaryButton>
              Cancel
            </SecondaryButton>
          </Link>
        </div>
      </form>
    </div>
  );
}
