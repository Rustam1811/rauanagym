import { BarChart3, Users, Dumbbell, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getWorkouts } from '@/lib/firebase/admin/workouts';
import { getPrograms } from '@/lib/firebase/admin/programs';

export const dynamic = 'force-dynamic';

const stats = [
  { icon: Users, label: 'Total Users', value: '2,543', change: '+12.5%', color: 'from-blue-500 to-cyan-500' },
  { icon: Dumbbell, label: 'Active Workouts', value: '127', change: '+8.2%', color: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, label: 'Programs', value: '45', change: '+3.1%', color: 'from-orange-500 to-red-500' },
  { icon: TrendingUp, label: 'Completion Rate', value: '87%', change: '+5.3%', color: 'from-green-500 to-emerald-500' },
];

const quickActions = [
  { label: 'Create New Workout', href: '/admin/workouts/new', icon: Dumbbell },
  { label: 'Add Program', href: '/admin/programs/new', icon: BarChart3 },
  { label: 'Manage Users', href: '/admin/users', icon: Users },
  { label: 'View Analytics', href: '/admin/analytics', icon: TrendingUp },
];

export default async function AdminDashboard() {
  const [workouts, programs] = await Promise.all([
    getWorkouts(),
    getPrograms()
  ]);

  const recentActivity = [
    { text: 'New user registration', time: '2 min ago' },
    { text: `Workout "${workouts[0]?.title || 'N/A'}" completed by @user123`, time: '5 min ago' },
    { text: `Program "${programs[0]?.title || 'N/A'}" updated`, time: '12 min ago' },
    { text: 'New clan created: Warriors', time: '23 min ago' }
  ];

  return (
    <div className="space-y-4 lg:space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-hj-textMain mb-1 lg:mb-2">Dashboard</h1>
          <p className="text-sm lg:text-base text-hj-textSoft">Welcome back! Here&apos;s what&apos;s happening with your fitness platform.</p>
        </div>
      </div>

      {/* Stats Grid - Mobile: 2 cols, Desktop: 4 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative group overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-3 lg:p-6 hover:shadow-hj-strong transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 lg:mb-4 shadow-hj`}>
                  <Icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                
                <p className="text-hj-textSoft text-xs lg:text-sm mb-1 font-medium">{stat.label}</p>
                <div className="flex items-end justify-between gap-1">
                  <h3 className="text-xl lg:text-3xl font-bold text-hj-textMain">{stat.value}</h3>
                  <span className="text-green-600 text-xs lg:text-sm font-semibold whitespace-nowrap">{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Quick Actions */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-4 lg:p-6 shadow-hj">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-hj-textMain">Quick Actions</h2>
            <Plus className="w-5 h-5 text-hj-textSoft" />
          </div>
          <div className="space-y-2 lg:space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-center justify-between w-full px-3 lg:px-4 py-2 lg:py-3 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 text-hj-textMain text-left text-sm lg:text-base transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-hj-textSoft group-hover:text-hj-primary transition-colors" />
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-hj-textSoft group-hover:text-hj-primary group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-4 lg:p-6 shadow-hj">
          <h2 className="text-lg lg:text-xl font-bold text-hj-textMain mb-3 lg:mb-4">Recent Activity</h2>
          <div className="space-y-2 lg:space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-2xl bg-hj-cardSoft border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft mt-1 lg:mt-2 flex-shrink-0 shadow-hj" />
                <div className="flex-1 min-w-0">
                  <p className="text-hj-textMain text-xs lg:text-sm font-medium">{activity.text}</p>
                  <p className="text-hj-textSoft text-xs mt-0.5 lg:mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Latest Workouts */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-4 lg:p-6 shadow-hj">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-hj-textMain">Latest Workouts</h2>
            <Link href="/admin/workouts" className="text-sm text-hj-primary hover:text-hj-primarySoft transition-colors font-semibold">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {workouts.slice(0, 3).map((workout) => (
              <Link
                key={workout.id}
                href={`/admin/workouts/${workout.id}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all group hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-hj-textMain text-sm font-semibold truncate">{workout.title}</p>
                  <p className="text-hj-textSoft text-xs">{workout.category} • {workout.durationMinutes} min</p>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  workout.isPublished 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-200 text-hj-textSoft'
                }`}>
                  {workout.isPublished ? 'Published' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Programs */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 p-4 lg:p-6 shadow-hj">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-hj-textMain">Latest Programs</h2>
            <Link href="/admin/programs" className="text-sm text-hj-primary hover:text-hj-primarySoft transition-colors font-semibold">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {programs.slice(0, 3).map((program) => (
              <Link
                key={program.id}
                href={`/admin/programs/${program.id}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all group hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-hj-textMain text-sm font-semibold truncate">{program.title}</p>
                  <p className="text-hj-textSoft text-xs">{program.level} • {program.durationWeeks || Math.ceil(program.durationDays / 7)} weeks</p>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  program.isPublished || program.status === 'active'
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-200 text-hj-textSoft'
                }`}>
                  {program.isPublished || program.status === 'active' ? 'Published' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
