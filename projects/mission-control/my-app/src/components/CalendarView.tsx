'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle,
  Calendar as CalendarIcon,
  Repeat
} from 'lucide-react';
import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth,
  endOfMonth,
  eachDayOfInterval, 
  format, 
  addWeeks, 
  subWeeks,
  isSameDay,
  isToday,
  addDays,
  getHours,
  setHours,
  setMinutes
} from 'date-fns';

interface ScheduledTask {
  _id: string;
  title: string;
  description?: string;
  scheduledFor: number;
  recurrence?: 'daily' | 'weekly' | 'hourly' | 'once';
  category: string;
  status: 'scheduled' | 'completed' | 'skipped' | 'failed';
}

const CATEGORY_COLORS: Record<string, string> = {
  heartbeat: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
  cron: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  meeting: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  task: 'bg-green-500/20 border-green-500/30 text-green-400',
  reminder: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);

  useEffect(() => {
    // Sample scheduled tasks
    const now = new Date();
    const sampleTasks: ScheduledTask[] = [
      {
        _id: '1',
        title: 'Morning Brief (8am Bali)',
        description: 'Deliver daily briefing to Lucas',
        scheduledFor: setHours(setMinutes(new Date(), 0), 8).getTime(),
        recurrence: 'daily',
        category: 'cron',
        status: 'scheduled',
      },
      {
        _id: '2',
        title: 'Heartbeat Check',
        description: 'System health monitoring',
        scheduledFor: setHours(setMinutes(addDays(now, 0), 0), 9).getTime(),
        recurrence: 'hourly',
        category: 'heartbeat',
        status: 'scheduled',
      },
      {
        _id: '3',
        title: 'Heartbeat Check',
        scheduledFor: setHours(setMinutes(addDays(now, 0), 0), 10).getTime(),
        recurrence: 'hourly',
        category: 'heartbeat',
        status: 'scheduled',
      },
      {
        _id: '4',
        title: 'Heartbeat Check',
        scheduledFor: setHours(setMinutes(addDays(now, 0), 0), 11).getTime(),
        recurrence: 'hourly',
        category: 'heartbeat',
        status: 'scheduled',
      },
      {
        _id: '5',
        title: 'Nightly Proactive Work',
        description: 'Build systems while Lucas sleeps',
        scheduledFor: setHours(setMinutes(addDays(now, 0), 0), 23).getTime(),
        recurrence: 'daily',
        category: 'cron',
        status: 'scheduled',
      },
      {
        _id: '6',
        title: 'Weekly Review',
        description: 'Review metrics and progress',
        scheduledFor: setHours(setMinutes(addDays(now, 5), 0), 10).getTime(),
        recurrence: 'weekly',
        category: 'task',
        status: 'scheduled',
      },
      {
        _id: '7',
        title: 'Client Call - Blue Sportswear',
        description: 'Monthly strategy review',
        scheduledFor: setHours(setMinutes(addDays(now, 2), 30), 14).getTime(),
        category: 'meeting',
        status: 'scheduled',
      },
    ];
    setTasks(sampleTasks);
  }, []);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.scheduledFor);
      return isSameDay(taskDate, day);
    }).sort((a, b) => a.scheduledFor - b.scheduledFor);
  };

  const getTasksForHour = (day: Date, hour: number) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.scheduledFor);
      return isSameDay(taskDate, day) && getHours(taskDate) === hour;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white/60" />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Today
            </button>
            <button 
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-white">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`
              px-4 py-2 text-sm rounded-lg transition-all
              ${viewMode === 'week' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`
              px-4 py-2 text-sm rounded-lg transition-all
              ${viewMode === 'day' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === 'week' ? (
        <div className="glass-panel overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-white/10">
            <div className="p-4 text-sm text-white/40 border-r border-white/10">Time</div>
            {days.map((day, index) => (
              <div 
                key={day.toISOString()}
                className={`
                  p-4 text-center border-r border-white/10 last:border-r-0
                  ${isToday(day) ? 'bg-cyan-500/10' : ''}
                `}
              >
                <div className={`
                  text-sm font-medium
                  ${isToday(day) ? 'text-cyan-400' : 'text-white/60'}
                `}>
                  {format(day, 'EEE')}
                </div>
                <div className={`
                  text-lg font-semibold mt-1
                  ${isToday(day) ? 'text-white' : 'text-white/80'}
                `}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="max-h-[600px] overflow-y-auto">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b border-white/5 min-h-[80px]">
                <div className="p-2 text-xs text-white/40 border-r border-white/10 text-right">
                  {format(setHours(new Date(), hour), 'h a')}
                </div>
                {days.map(day => {
                  const hourTasks = getTasksForHour(day, hour);
                  return (
                    <div 
                      key={`${day.toISOString()}-${hour}`}
                      className={`
                        p-1 border-r border-white/5 last:border-r-0
                        ${isToday(day) ? 'bg-cyan-500/5' : ''}
                      `}
                    >
                      {hourTasks.map(task => (
                        <div
                          key={task._id}
                          className={`
                            p-2 rounded text-xs mb-1 border cursor-pointer hover:opacity-80 transition-opacity
                            ${CATEGORY_COLORS[task.category] || 'bg-white/10 border-white/20'}
                          `}
                        >
                          <div className="font-medium truncate">{task.title}</div>
                          <div className="flex items-center gap-1 mt-1 opacity-70">
                            <Clock className="w-3 h-3" />
                            {format(new Date(task.scheduledFor), 'h:mm a')}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DayView 
          date={currentDate} 
          tasks={getTasksForDay(currentDate)}
        />
      )}

      {/* Upcoming Tasks Summary */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-cyan-400" />
          Up Next
        </h3>
        <div className="space-y-3">
          {tasks
            .filter(t => t.status === 'scheduled')
            .sort((a, b) => a.scheduledFor - b.scheduledFor)
            .slice(0, 5)
            .map(task => (
              <div 
                key={task._id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
              >
                <div className={`
                  w-2 h-2 rounded-full
                  ${task.status === 'completed' ? 'bg-green-500' : 'bg-cyan-500 animate-pulse'}
                `} />
                <div className="flex-1">
                  <div className="text-white font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-white/50">{task.description}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80">
                    {format(new Date(task.scheduledFor), 'MMM d, h:mm a')}
                  </div>
                  {task.recurrence && task.recurrence !== 'once' && (
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <Repeat className="w-3 h-3" />
                      {task.recurrence}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function DayView({ date, tasks }: { date: Date; tasks: ScheduledTask[] }) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h3>
        <p className="text-white/50">
          {tasks.length} scheduled task{tasks.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto">
        {HOURS.map(hour => {
          const hourTasks = tasks.filter(t => getHours(new Date(t.scheduledFor)) === hour);
          
          return (
            <div key={hour} className="flex border-b border-white/5 min-h-[100px]">
              <div className="w-20 p-4 text-sm text-white/40 border-r border-white/10">
                {format(setHours(new Date(), hour), 'h a')}
              </div>
              <div className="flex-1 p-2">
                {hourTasks.map(task => (
                  <div
                    key={task._id}
                    className={`
                      p-4 rounded-lg mb-2 border
                      ${CATEGORY_COLORS[task.category] || 'bg-white/10 border-white/20'}
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-white">{task.title}</div>
                        {task.description && (
                          <div className="text-sm mt-1 opacity-80">{task.description}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          {format(new Date(task.scheduledFor), 'h:mm a')}
                        </div>
                        {task.recurrence && task.recurrence !== 'once' && (
                          <div className="flex items-center gap-1 text-xs opacity-60 mt-1">
                            <Repeat className="w-3 h-3" />
                            {task.recurrence}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
