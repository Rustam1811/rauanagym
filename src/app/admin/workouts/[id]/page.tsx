'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { getWorkoutById, createWorkout, updateWorkout } from '@/lib/firebase/admin/workouts';
import { WorkoutCategory, WorkoutDifficulty } from '@/types/admin';
import AdminCard from '@/components/admin/AdminCard';
import Input from '@/components/admin/Input';
import Select from '@/components/admin/Select';
import Toggle from '@/components/admin/Toggle';
import GradientButton from '@/components/admin/GradientButton';
import Toast from '@/components/admin/Toast';

const categoryOptions: { value: WorkoutCategory; label: string }[] = [
  { value: 'strength', label: 'Strength' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'mobility', label: 'Mobility' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'other', label: 'Other' },
];

const difficultyOptions: { value: WorkoutDifficulty; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

interface FormData {
  title: string;
  slug: string;
  category: WorkoutCategory;
  difficulty: WorkoutDifficulty;
  durationMinutes: number;
  calories: number;
  xp: number;
  tags: string;
  coverImageUrl: string;
  isRecommended: boolean;
  isPublished: boolean;
}

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    category: 'strength',
    difficulty: 'beginner',
    durationMinutes: 30,
    calories: 200,
    xp: 100,
    tags: '',
    coverImageUrl: '',
    isRecommended: false,
    isPublished: false,
  });

  const loadWorkout = useCallback(async () => {
    try {
      const workout = await getWorkoutById(params.id);
      if (workout) {
        setFormData({
          title: workout.title,
          slug: workout.slug,
          category: workout.category,
          difficulty: workout.difficulty,
          durationMinutes: workout.durationMinutes,
          calories: workout.calories,
          xp: workout.xp,
          tags: workout.tags.join(', '),
          coverImageUrl: workout.coverImageUrl,
          isRecommended: workout.isRecommended,
          isPublished: workout.isPublished,
        });
      } else {
        setToast({ message: 'Workout not found', type: 'error' });
        setTimeout(() => router.push('/admin/workouts'), 2000);
      }
    } catch {
      setToast({ message: 'Failed to load workout', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (!isNew) {
      loadWorkout();
    }
  }, [isNew, loadWorkout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return;
    }
    if (!formData.slug.trim()) {
      setToast({ message: 'Slug is required', type: 'error' });
      return;
    }

    setSaving(true);
    
    try {
      const workoutData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        durationMinutes: formData.durationMinutes,
        calories: formData.calories,
        xp: formData.xp,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        coverImageUrl: formData.coverImageUrl.trim(),
        isRecommended: formData.isRecommended,
        isPublished: formData.isPublished,
      };

      if (isNew) {
        await createWorkout(workoutData);
        setToast({ message: 'Workout created successfully', type: 'success' });
      } else {
        await updateWorkout(params.id, workoutData);
        setToast({ message: 'Workout updated successfully', type: 'success' });
      }

      setTimeout(() => router.push('/admin/workouts'), 1500);
    } catch {
      setToast({ message: 'Failed to save workout', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && isNew) {
      const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-hj-textSoft">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/workouts"
          className="p-2 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-hj-textSoft" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-hj-textMain mb-2">
            {isNew ? 'Create Workout' : 'Edit Workout'}
          </h1>
          <p className="text-hj-textSoft">
            {isNew ? 'Add a new workout to the library' : 'Update workout details'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <AdminCard>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                required
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value as WorkoutCategory)}
              />
              <Select
                label="Difficulty"
                options={difficultyOptions}
                value={formData.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value as WorkoutDifficulty)}
              />
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Duration (minutes)"
                type="number"
                value={formData.durationMinutes.toString()}
                onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value) || 0)}
                required
              />
              <Input
                label="Calories"
                type="number"
                value={formData.calories.toString()}
                onChange={(e) => handleChange('calories', parseInt(e.target.value) || 0)}
                required
              />
              <Input
                label="XP"
                type="number"
                value={formData.xp.toString()}
                onChange={(e) => handleChange('xp', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            {/* Tags & Cover */}
            <div className="space-y-6">
              <Input
                label="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="strength, upper-body, push"
              />
              <Input
                label="Cover Image URL"
                value={formData.coverImageUrl}
                onChange={(e) => handleChange('coverImageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-hj-cardSoft border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-hj-textMain font-semibold">Recommended</p>
                  <p className="text-hj-textSoft text-sm">Show in recommended section</p>
                </div>
                <Toggle
                  checked={formData.isRecommended}
                  onChange={(checked) => handleChange('isRecommended', checked)}
                />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-hj-textMain font-semibold">Published</p>
                  <p className="text-hj-textSoft text-sm">Make visible to users</p>
                </div>
                <Toggle
                  checked={formData.isPublished}
                  onChange={(checked) => handleChange('isPublished', checked)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <GradientButton type="submit" disabled={saving}>
                <Save className="w-5 h-5 mr-2" />
                {saving ? 'Saving...' : isNew ? 'Create Workout' : 'Update Workout'}
              </GradientButton>
              <Link
                href="/admin/workouts"
                className="px-6 py-3 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 text-hj-textMain font-semibold transition-all"
              >
                Cancel
              </Link>
            </div>
          </div>
        </AdminCard>
      </form>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </div>
  );
}
