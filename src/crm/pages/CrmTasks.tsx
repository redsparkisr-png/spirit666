import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import type { CrmTask } from "../types";
import { TASK_TYPES } from "../types";

const CrmTasks = () => {
  const [tasks, setTasks] = useState<CrmTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"today" | "overdue" | "tomorrow" | "week" | "all">("today");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await supabase
      .from("crm_tasks")
      .select("*")
      .neq("status", "completed")
      .order("due_date", { ascending: true })
      .limit(200);
    if (data) setTasks(data as CrmTask[]);
    setLoading(false);
  };

  const completeTask = async (taskId: string) => {
    await supabase.from("crm_tasks").update({ status: "completed", completed_at: new Date().toISOString() }).eq("id", taskId);
    loadTasks();
  };

  const filtered = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekStr = weekEnd.toISOString().slice(0, 10);

    switch (filter) {
      case "today": return tasks.filter((t) => t.due_date.slice(0, 10) === todayStr);
      case "overdue": return tasks.filter((t) => t.due_date.slice(0, 10) < todayStr);
      case "tomorrow": return tasks.filter((t) => t.due_date.slice(0, 10) === tomorrowStr);
      case "week": return tasks.filter((t) => t.due_date.slice(0, 10) <= weekStr);
      default: return tasks;
    }
  }, [tasks, filter]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const overdueCount = tasks.filter((t) => t.due_date.slice(0, 10) < new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 space-y-4">
      <h1 className="text-xl font-bold text-white">משימות</h1>

      <div className="flex gap-2 flex-wrap">
        {([
          { id: "today", label: "היום" },
          { id: "overdue", label: `באיחור (${overdueCount})` },
          { id: "tomorrow", label: "מחר" },
          { id: "week", label: "השבוע" },
          { id: "all", label: "הכל" },
        ] as const).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f.id ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((task) => {
          const isOverdue = task.due_date.slice(0, 10) < new Date().toISOString().slice(0, 10);
          const typeInfo = TASK_TYPES.find((t) => t.id === task.action_type);

          return (
            <div key={task.id} className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 flex items-start gap-3">
              <button onClick={() => completeTask(task.id)} className="p-1 rounded-full hover:bg-white/10 text-gray-500 hover:text-green-400 transition-colors mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{typeInfo?.icon || "📋"}</span>
                  <span className="text-sm font-medium text-white">{typeInfo?.label || task.action_type}</span>
                  {isOverdue && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                </div>
                {task.notes && <p className="text-xs text-gray-400 mb-1">{task.notes}</p>}
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className={isOverdue ? "text-red-400" : ""}>
                    {new Date(task.due_date).toLocaleDateString("he-IL")}
                    {task.due_time && ` ${task.due_time}`}
                  </span>
                </div>
              </div>
              {task.lead_id && (
                <Link to={`/crm/leads/${task.lead_id}`} className="text-xs text-blue-400 underline flex-shrink-0">
                  צפה בליד
                </Link>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              {filter === "today" ? "אין משימות להיום 🎉" : "אין משימות"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrmTasks;
