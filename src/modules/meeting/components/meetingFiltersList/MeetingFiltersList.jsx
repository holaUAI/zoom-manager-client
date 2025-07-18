import { useState } from "react";
import { useGroupedLastMeetings } from "../../hook/useGroupedLastMeetings";
import { CalendarDays, Clock, Video, User, Search, Calendar, Users } from "lucide-react";
import { LoadingScreen } from "../../../shared/screens/loading/LoadingScreen";
import { format, isValid } from "date-fns";
import { MetricCard } from "../metricCard/MetricCard";
import MeetingDetailsModal from "../../../dashboard/components/todaysClasses/MeetingDetailModal";


// ✅ Utilidad local para evitar errores por fechas inválidas
const safeFormat = (dateStr, pattern = "dd MMM yyyy - HH:mm") => {
  try {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, pattern) : "Fecha inválida";
  } catch {
    return "Fecha inválida";
  }
};

const TABS = [
  { key: "started", label: "En curso" },
  { key: "finished", label: "Finalizado" },
  { key: "pending", label: "Próximo" },
  { key: "not_open", label: "No aperturadas" }
];

const MeetingList = ({ limit = 2000 }) => {
  const { data = {}, isLoading } = useGroupedLastMeetings(limit);
  const [selectedTab, setSelectedTab] = useState("finished");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);

  const meetings = data[selectedTab] ?? [];

  const filteredMeetings = meetings.filter((meeting) =>
    meeting.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (id) => {
    setSelectedMeetingId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeetingId(null);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      started: { label: "En curso", class: "bg-green-500" },
      finished: { label: "Finalizada", class: "bg-gray-500" },
      pending: { label: "Próximo", class: "bg-yellow-500" },
      not_open: { label: "No aperturadas", class: "bg-red-500" },
    };
    const s = statusMap[status] || { label: "Desconocido", class: "bg-gray-300" };
    return (
      <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${s.class}`}>
        {s.label}
      </span>
    );
  };

  const getTotalMeetings = () =>
    Object.values(data).reduce((acc, arr) => acc + (arr?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="text-center mb-6 space-y-1">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Lista de Reuniones
        </h1>
        <p className="text-sm text-gray-500">Gestiona y monitorea todas tus reuniones</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 max-w-5xl mx-auto">
        <MetricCard label="Total Reuniones" icon={<Calendar size={20} />} value={getTotalMeetings()} color="purple" />
        <MetricCard label="En Curso" icon={<Users size={20} />} value={data.started?.length || 0} color="green" />
        <MetricCard label="Próximas" icon={<Clock size={20} />} value={data.pending?.length || 0} color="yellow" />
        <MetricCard label="Sin Iniciar" icon={<Clock size={20} />} value={data.not_open?.length || 0} color="red" />
      </div>

      <div className="max-w-2xl mx-auto flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar reunión..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${selectedTab === tab.key
              ? "bg-purple-600 text-white shadow"
              : "bg-white text-gray-800 border hover:bg-gray-50"
              }`}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : filteredMeetings.length === 0 ? (
        <p className="text-center text-gray-400">No hay reuniones que coincidan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeetings.map((meeting, index) => (
            <div
              key={`${meeting.meeting_id}-${index}`}
              onClick={() => openModal(meeting.meeting_id)}
              className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg border border-gray-100 backdrop-blur-sm transition-transform transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{meeting.topic}</h3>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <User size={16} />
                  <span>{meeting.host_email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} />
                  <span>{meeting.duration} min</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CalendarDays size={16} />
                  <span>{safeFormat(meeting.start_time)}</span>
                </div>

                {meeting.delay && (
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full shadow-sm">
                    {meeting.delay_min} minutos tarde
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <MeetingDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        meetingId={selectedMeetingId}
      />
    </div>
  );
};

export default MeetingList;
