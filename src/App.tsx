import React, { useState } from 'react'
import Swal from 'sweetalert2'
import deleteImg from './assets/delete.png'
import { v4 as uuidv4 } from 'uuid';

interface ITask {
    id: string,
    date: string,
    name: string,
    description: string
}

const App = () => {
    const [taskName, setTaskName] = useState<string>("")
    const [tasks, setTasks] = useState<ITask[]>([])
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            title: taskName,
            input: "textarea",
            showCancelButton: true,
            confirmButtonText: "Add task"
        }).then((result) => {
            if (result.isConfirmed) {
                let currentDate = new Date()
                const [dia, mes, anio] = currentDate.toLocaleDateString().split('/');
                tasks.push({
                    id: uuidv4(),
                    date: `${anio}-${mes}-${dia}`, 
                    name: taskName,
                    description: result.value
                })
                setTasks(tasks)
                localStorage.setItem("tasks", JSON.stringify(tasks))
                setTaskName("")
            }
        })
    }

    const deleteElement = (taskId: string) => {
        console.log(tasks)
        setTasks(tasks.filter(task => task.id !== taskId))
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    
    return <main className='flex flex-col justify-center items-center w-screen h-screen'>
        <h1 className='text-lg font-bold'>To Do List</h1>
        <section className='flex flex-col gap-5'>
            <form onSubmit={handleSubmit} className="flex flex-row gap-4">
                <article className='flex flex-row items-center gap-4'>
                    <label className='text font-bold' htmlFor='task'>Task</label>
                    <input id='task' className='p-2' required type='text' value={taskName} onChange={e => setTaskName(e.target.value)} />
                </article>
                <button className='bg-[#3B7080] p-2 rounded-sm text-white' type="submit">Add</button>
            </form>

            {tasks.length > 0 && <section className="flex flex-col gap-4">
                {tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((task, index) => (
                    <article key={index} className='flex flex-col bg-[#ADE25D] p-2 rounded-lg divide-y gap-2'>
                        <div className='flex flex-row justify-between'>
                            <h3>{task.name}</h3>
                            <span>{task.date}</span>
                            <button onClick={() => deleteElement(task.id)}><img src={deleteImg} className='w-5 h-auto' alt="delete button" /></button>
                        </div>
                        <p>{task.description}</p>
                    </article>
                ))}
            </section>}
        </section>
    </main>
}

export default App
