import { useState, useEffect } from "react"

const TaskForm = ({ onSubmit, initial = {}, onCancel }) => {
    const [form, setForm] = useState({
        title: initial.title || "",
        description: initial.description || "",
        status: initial.status || "todo",
        priority: initial.priority || "medium"
    })

    useEffect(() => {
        if(!initial || !initial._id) return
        setForm({
            title: initial.title || "",
            description: initial.description || "",
            status: initial.status || "todo",
            priority: initial.priority || "medium"
        })
    }, [initial?._id])

    const handleChange = (e) => {
        let value = e.target.value

        if (e.target.name === "title") {
            value = value.replace(/\b\w/g, (c) => c.toUpperCase())
        }

        setForm({ ...form, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formatted = {
            ...form,
            title: form.title.trim(),
            description: form.description.trim()
        }

        onSubmit(formatted)
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Task title"
                required
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                rows={3}
                className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
                />

            <div className="flex gap-3">
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="flex-1 border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="flex-1 border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex gap-2">
                <button 
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                    >
                    {initial.title ? "Update Task" : "Create Task"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-blue-300 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}


export default TaskForm