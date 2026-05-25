const priorityColors = {
    low: "bg-green-100 text-green-600",
    medium: "bg-yellow-100 text-yellow-600",
    high: "bg-red-100 text-red-600"
}

const statusColors = {
    todo: "bg-gray-100 text-gray-600",
    "in-progress": "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600"
}

const toTitleCase = (str) => {
    return str?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

const toSentenceCase = (str) => {
    if (!str) return ""

    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1)
}


const formatStatus = (status) => {
    if (status === "in-progress") return "In Progress"

    return toTitleCase(status)
}

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border-blue-100 p-4 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">
                    {toTitleCase(task.title)}
                </h3>

                <div className="flex gap-1 shrink-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-xs bg-blue-50  text-blue-500 px-2 py-1 rounded-lg hover:bg-blue-100 transition"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-lg hover:bg-red-100 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-gray-500 text-sm mb-3">
                    {toSentenceCase(task.description)}
                </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
                    {formatStatus(task.status)}
                </span>

                <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                    {toTitleCase(task.priority)}
                </span>

                {
                    task.user?.name && (
                        <span className="text-xs text-gray-400 ml-auto">
                            {task.user.name}
                        </span>
                    )
                }
            </div>
        </div>
    )
}


export default TaskCard