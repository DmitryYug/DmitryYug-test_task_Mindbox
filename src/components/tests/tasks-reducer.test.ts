import {
    AddTaskAC,
    CheckBoxChangeAC,
    ClearCompletedTasksAC,
    RemoveTaskAC,
    tasksReducer,
    TasksType
} from "../state/tasks-reducer";

let startState: TasksType[]

beforeEach(() => {
    startState = [
        {id: '1', title: 'Test task', isDone: true},
        {id: '2', title: 'Try my interface', isDone: false},
        {id: '3', title: 'Do me', isDone: false},
        {id: '4', title: 'mindbox is the best', isDone: false}
    ];
})

test('correct task should be removed', () => {
    const action = RemoveTaskAC('2');
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual([
        {id: '1', title: 'Test task', isDone: true},
        {id: '3', title: 'Do me', isDone: false},
        {id: '4', title: 'mindbox is the best', isDone: false}
    ])
})
test('correct task should be added', () => {
    const action = AddTaskAC('Im a new task');
    const endState = tasksReducer(startState, action)

    expect(endState.length).toBe(5);
    expect(endState[0].id).toBeDefined();
    expect(endState[0].title).toBe('Im a new task');
    expect(endState[0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {
    const action = CheckBoxChangeAC("1", false);
    const endState = tasksReducer(startState, action)
    expect(endState[0].isDone).toBe(false);
});
test('competed tasks deleted', () => {
    const action = ClearCompletedTasksAC();
    const endState = tasksReducer(startState, action)
    expect(endState.map(t => t.isDone === false).length).toBe(3);
});

