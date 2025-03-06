import { Component } from 'react';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
    maxId = 100;

    state = {
        todosArr: [
            this.createTodoItem('Drink Coffee', 1, 1),
            this.createTodoItem('Drink Coffee2', 1, 1),
            this.createTodoItem('Drink 333', 1, 1),
        ],
        filterPosition: 0,
    };

    fliterHandle = (position) => {
        this.setState({
            filterPosition: position,
        });
    };

    createTodoItem(label, min, sec) {
        return {
            label: label,
            createdDate: new Date(),
            complited: false,
            editing: false,
            id: this.maxId++,
            min: min,
            sec: sec,
        };
    }

    addItem = (text, min, sec) => {
        if (text !== '') {
            this.setState(({ todosArr }) => {
                const newItem = this.createTodoItem(text, min, sec);
                const newTodosArr = [...todosArr, newItem];

                return {
                    todosArr: newTodosArr,
                };
            });
        }
    };

    deleteItem = (id) => {
        sessionStorage.removeItem(`timer-${id}`);
        this.setState(({ todosArr }) => {
            const idx = todosArr.findIndex((el) => el.id === id);
            const before = todosArr.slice(0, idx);
            const after = todosArr.slice(idx + 1);

            return {
                todosArr: [...before, ...after],
            };
        });
    };

    onEditLabel = (text, id) => {
        this.setState(({ todosArr }) => {
            const idx = todosArr.findIndex((el) => el.id === id);

            const oldItem = todosArr[idx];
            const newItem = { ...oldItem, label: text };

            return {
                todosArr: [...todosArr.slice(0, idx), newItem, ...todosArr.slice(idx + 1)],
            };
        });
    };

    onEditing = (id) => {
        this.setState(({ todosArr }) => {
            return {
                todosArr: this.toggleProperty(todosArr, id, 'editing'),
            };
        });
    };

    cleareCompleted = () => {
        const newArr = this.state.todosArr.filter((el) => el.complited);
        newArr.map((el) => {
            this.deleteItem(el.id);
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    onToggleDone = (id) => {
        this.setState(({ todosArr }) => {
            return {
                todosArr: this.toggleProperty(todosArr, id, 'complited'),
            };
        });
    };

    render() {
        return (
            <section className="todoapp">
                <Header onAdded={this.addItem} />
                <section className="main">
                    <TaskList
                        onEditLabel={this.onEditLabel}
                        onEditing={this.onEditing}
                        todosArr={this.state.todosArr}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                        filterPos={this.state.filterPosition}
                    />
                    <Footer
                        todosArr={this.state.todosArr}
                        fliterHandle={this.fliterHandle}
                        filterPos={this.state.filterPosition}
                        cleareCompleted={this.cleareCompleted}
                    />
                </section>
            </section>
        );
    }
}
