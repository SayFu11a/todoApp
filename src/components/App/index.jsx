import { Component } from "react";

import Header from "../Header"
import TaskList from "../TaskList"
import Footer from '../Footer'

import './App.css'

export default class App extends Component {

    state = {
        todosArr: [
            { label: 'Drink Coffee',  time: 'created 17 seconds ago', id: 1 },
            { label: 'Drink Coffee2', time: 'created 37 seconds ago', id: 2 },
            { label: 'Drink 333', time: 'created 57 seconds ago', id: 3 },
        ]
    }

    deleteItem = (id) => {
        this.setState(({todosArr}) => {
            const idx = todosArr.findIndex(el => el.id === id)
            const before = todosArr.slice(0, idx)
            const after = todosArr.slice(idx + 1)

            return {
                todosArr: [...before, ...after]
            }
        })
    }

    render () {
        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList 
                        todosArr={ this.state.todosArr }
                        onDeleted={ this.deleteItem }/>
                    <Footer />
                </section>
            </section>
        )
    }
}
