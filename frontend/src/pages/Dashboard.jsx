import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import TaskCard from "../components/TaskCard.jsx"
import TaskForm from "../components/TaskForm.jsx"
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskServices.js"


const Dashboard = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) navigate("/")
  }, [user, loading])

  useEffect(() => {
    if (user) fetchTasks()
  }, [user])

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data.tasks)
    } catch (err) {
      setError("Failed to fetch tasks")
    } finally {
      setFetching(false)
    }
  }

  const handleCreate = async (data) => {
    try {
      const res = await createTask(data)
      // setTasks((prev) => [...prev, res.data.task])
      await fetchTasks()
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task")
    }
  }

  const handleUpdate = async (data) => {
    try {
      await updateTask(editTask._id, data)
      setEditTask(null)
      fetchTasks()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task")
    }
  }

  const handleDelete = async (id) => {
    // if (!window.confirm("Delete this task?"))
    //   return
    try {
      await deleteTask(id)
      fetchTasks()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task")
    }
  }

  if (loading || fetching) {
    return (
      <div className="h-screen overflow-hidden bg-blue-50 flex items-center justify-center">
        <p className="text-blue-400 font-medium animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden bg-blue-100 flex flex-col py-4 md:py-6">
      <Navbar />
      <div className="flex flex-1 items-center px-4 py-6 justify-center">
        <div className="bg-white rounded-2xl  shadow-sm border border-blue-300 w-full max-w-2xl flex flex-col h-[580px] max-h-[76vh]">

          {/* fixed header */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.role === "admin" ? "All Tasks" : "My Tasks"}</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {tasks.length} tasks total
              </p>
            </div>
            
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditTask(null)
            }}
            className="bg-blue-500 text-white w-9 h-9 rounded-full font-bold hover:bg-blue-600 transition text-lg flex items-center justify-center"
          >
            {showForm ? "x" : "+"}
          </button>

          </div>

          {/* Scrollable Content */}

          <div className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {showForm && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl transition-all duration-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h3>
                <TaskForm
                  onSubmit={handleCreate}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          {
            tasks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">No Tasks yet - create one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {
                  tasks.map((task) => (
                    <div key={task._id}>
                      <TaskCard
                        task={task}
                        onEdit={(t) => {
                          setEditTask({...t})
                          setShowForm(false)
                        }}
                        onDelete={handleDelete}
                      />

                      {
                        editTask?._id === task._id && (
                          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                            onClick={() => setEditTask(null)}
                          >
                            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Task</h3>
                              <TaskForm
                                initial={editTask}
                                onSubmit={handleUpdate}
                                onCancel={() => setEditTask(null)}
                              />
                            </div>
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard